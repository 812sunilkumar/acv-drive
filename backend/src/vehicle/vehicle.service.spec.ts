import { Test, TestingModule } from '@nestjs/testing';
import { VehicleService } from './vehicle.service';
import { VehicleRepository } from './vehicle.repository';

describe('VehicleService', () => {
  let service: VehicleService;
  let vehicleRepo: jest.Mocked<VehicleRepository>;

  const mockVehicleRepo = {
    find: jest.fn(),
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: VehicleRepository,
          useValue: mockVehicleRepo,
        },
      ],
    }).compile();

    service = module.get<VehicleService>(VehicleService);
    vehicleRepo = module.get(VehicleRepository);

    jest.clearAllMocks();
  });

  describe('listByTypeAndLocation', () => {
    it('should return vehicles filtered by type and location', async () => {
      const mockVehicles = [
        { id: 'v1', type: 'tesla_model3', location: 'dublin' },
        { id: 'v2', type: 'tesla_model3', location: 'dublin' },
      ];

      vehicleRepo.find.mockResolvedValue(mockVehicles as any);

      const result = await service.listByTypeAndLocation('tesla_model3', 'dublin');

      expect(result).toEqual(mockVehicles);
      expect(vehicleRepo.find).toHaveBeenCalledWith({
        type: 'tesla_model3',
        location: 'dublin',
      });
    });

    it('should handle case-insensitive type and location', async () => {
      const mockVehicles = [{ id: 'v1', type: 'tesla_model3', location: 'dublin' }];
      vehicleRepo.find.mockResolvedValue(mockVehicles as any);

      await service.listByTypeAndLocation('TESLA_MODEL3', 'DUBLIN');

      expect(vehicleRepo.find).toHaveBeenCalledWith({
        type: 'tesla_model3',
        location: 'dublin',
      });
    });
  });

  describe('listByLocation', () => {
    it('should return unique vehicles filtered by location (one per type)', async () => {
      const mockVehicles = [
        { id: 'v1', type: 'tesla_model3', location: 'dublin', batteryPack: '60 kWh' },
        { id: 'v2', type: 'tesla_model3', location: 'dublin', batteryPack: '60 kWh' },
        { id: 'v3', type: 'tesla_modelx', location: 'dublin', batteryPack: '100 kWh' },
        { id: 'v4', type: 'bmw_i4', location: 'dublin', batteryPack: '83.9 kWh' },
      ];

      vehicleRepo.find.mockResolvedValue(mockVehicles as any);

      const result = await service.listByLocation('dublin');

      // Should return only 3 vehicles (one of each type)
      expect(result).toHaveLength(3);
      expect(result.map(v => v.type)).toEqual(['tesla_model3', 'tesla_modelx', 'bmw_i4']);
      
      // Should return the first occurrence of each type
      expect(result[0].id).toBe('v1');
      expect(result[1].id).toBe('v3');
      expect(result[2].id).toBe('v4');
    });

    it('should handle single vehicle per type', async () => {
      const mockVehicles = [
        { id: 'v1', type: 'tesla_model3', location: 'dublin' },
        { id: 'v2', type: 'tesla_modelx', location: 'dublin' },
      ];

      vehicleRepo.find.mockResolvedValue(mockVehicles as any);

      const result = await service.listByLocation('dublin');

      expect(result).toEqual(mockVehicles);
      expect(vehicleRepo.find).toHaveBeenCalledWith({
        location: 'dublin',
      });
    });

    it('should throw error when location is missing', async () => {
      await expect(service.listByLocation('')).rejects.toThrow('location query param is required');
    });
  });

  describe('findAllLocations', () => {
    it('should return unique sorted locations', async () => {
      const mockVehicles = [
        { location: 'cork' },
        { location: 'dublin' },
        { location: 'cork' },
        { location: 'galway' },
      ];

      vehicleRepo.find.mockResolvedValue(mockVehicles as any);

      const result = await service.findAllLocations();

      expect(result).toEqual(['cork', 'dublin', 'galway']);
    });

    it('should return empty array when no vehicles exist', async () => {
      vehicleRepo.find.mockResolvedValue([]);

      const result = await service.findAllLocations();

      expect(result).toEqual([]);
    });
  });

  describe('findById', () => {
    it('should return vehicle by id', async () => {
      const mockVehicle = { id: 'v1', type: 'tesla_model3', location: 'dublin' };
      vehicleRepo.findById.mockResolvedValue(mockVehicle as any);

      const result = await service.findById('v1');

      expect(result).toEqual(mockVehicle);
      expect(vehicleRepo.findById).toHaveBeenCalledWith('v1');
    });

    it('should return null when vehicle not found', async () => {
      vehicleRepo.findById.mockResolvedValue(null);

      const result = await service.findById('invalid');

      expect(result).toBeNull();
    });
  });
});
