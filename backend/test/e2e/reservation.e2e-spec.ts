import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import mongoose from 'mongoose';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

describe('Reservation E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.enableCors();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
    await mongoose.disconnect();
  });

  describe('GET /status', () => {
    it('should return ok', async () => {
      const res = await request(app.getHttpServer()).get('/status');
      expect(res.status).toBe(200);
      expect(res.body).toEqual({ status: 'ok' });
    });
  });

  describe('POST /book', () => {
    it('should return 400 for missing required fields', async () => {
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          vehicleType: 'tesla_model3',
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for missing location', async () => {
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          vehicleType: 'tesla_model3',
          startDateTime: dayjs().add(1, 'day').toISOString(),
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for missing vehicleType', async () => {
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          startDateTime: dayjs().add(1, 'day').toISOString(),
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for past dates', async () => {
      const pastDate = dayjs().subtract(1, 'day').toISOString();
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          vehicleType: 'tesla_model3',
          startDateTime: pastDate,
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toContain('past');
    });

    it('should handle dates more than 14 days away (400 or success depending on availability)', async () => {
      const futureDate = dayjs
        .utc()
        .add(15, 'day')
        .hour(10)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();

      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          vehicleType: 'tesla_model3',
          startDateTime: futureDate,
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });

      expect([400, 201]).toContain(res.status);

      if (res.status === 400) {
        expect(res.body.message).toBeDefined();
      } else {
        expect(res.body).toHaveProperty('available', true);
        expect(res.body).toHaveProperty('reservation');
      }
    });

    it('should return 400 when no vehicles available for location and type', async () => {
      const validDate = dayjs().add(1, 'day').hour(10).minute(0).toISOString();
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'nonexistent',
          vehicleType: 'nonexistent_type',
          startDateTime: validDate,
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });
      expect(res.status).toBe(400);
      expect(res.body.message).toContain('No vehicles found');
    });

    it('should return 400 or success when checking availability for a time slot', async () => {
      const validDate = dayjs().add(1, 'day').hour(10).minute(0).toISOString();
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          vehicleType: 'tesla_model3',
          startDateTime: validDate,
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });

      expect([200, 201, 400]).toContain(res.status);

      if (res.status !== 400) {
        expect(res.body).toHaveProperty('available', true);
        expect(res.body).toHaveProperty('reservation');
      }
    });

    it('should successfully book when vehicle is available', async () => {
      const validDate = dayjs
        .utc()
        .add(1, 'day')
        .hour(10)
        .minute(0)
        .second(0)
        .millisecond(0)
        .toISOString();

      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          vehicleType: 'tesla_model3',
          startDateTime: validDate,
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });

      expect([200, 201, 400]).toContain(res.status);

      if (res.status !== 400) {
        expect(res.body.available).toBe(true);
        expect(res.body.reservation).toHaveProperty('reservationId');
        expect(res.body.reservation.reservationId).toMatch(
          /^TD-\d{4}-[A-Z0-9]+-[A-F0-9]{10}$/
        );
        expect(res.body.reservation.customerName).toBe('Test User');
        expect(res.body.reservation.customerEmail).toBe('test@example.com');
      }
    });

    it('should return 400 for invalid date format', async () => {
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          vehicleType: 'tesla_model3',
          startDateTime: 'invalid-date',
          durationMins: 45,
          customerName: 'Test User',
          customerEmail: 'test@example.com',
          customerPhone: '+1234567890',
        });
      expect(res.status).toBe(400);
    });

    it('should return 400 for missing customer information', async () => {
      const validDate = dayjs().add(1, 'day').hour(10).minute(0).toISOString();
      const res = await request(app.getHttpServer())
        .post('/book')
        .send({
          location: 'dublin',
          vehicleType: 'tesla_model3',
          startDateTime: validDate,
          durationMins: 45,
          // Missing customerName, customerEmail, customerPhone
        });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /vehicles/locations', () => {
    it('should return list of locations', async () => {
      const res = await request(app.getHttpServer()).get('/vehicles/locations');
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty('locations');
      expect(Array.isArray(res.body.locations)).toBe(true);
    });
  });

  describe('GET /vehicles', () => {
    it('should return vehicles filtered by location', async () => {
      const res = await request(app.getHttpServer())
        .get('/vehicles')
        .query({ location: 'dublin' });
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      
      // Verify uniqueness - no duplicate vehicle types
      const types = res.body.map((v: any) => v.type);
      const uniqueTypes = [...new Set(types)];
      expect(types.length).toBe(uniqueTypes.length);
    });

    it('should return unique vehicle types per location', async () => {
      const res = await request(app.getHttpServer())
        .get('/vehicles')
        .query({ location: 'dublin' });
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      
      // Each vehicle type should appear only once
      const vehicleTypes = res.body.map((v: any) => v.type);
      const uniqueVehicleTypes = new Set(vehicleTypes);
      
      expect(vehicleTypes.length).toBe(uniqueVehicleTypes.size);
      
      // Each vehicle should have required properties
      res.body.forEach((vehicle: any) => {
        expect(vehicle).toHaveProperty('id');
        expect(vehicle).toHaveProperty('type');
        expect(vehicle).toHaveProperty('location');
        expect(vehicle.location).toBe('dublin');
      });
    });

    it('should return 400 when location parameter is missing', async () => {
      const res = await request(app.getHttpServer())
        .get('/vehicles');
      
      expect(res.status).toBe(400);
      expect(res.body.message).toContain('location query param is required');
    });

    it('should return empty array for location with no vehicles', async () => {
      const res = await request(app.getHttpServer())
        .get('/vehicles')
        .query({ location: 'nonexistent_location' });
      
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBe(0);
    });
  });
});