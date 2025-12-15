import { Controller, Get, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleRepository } from './vehicle.repository';

@Controller('vehicles')
export class VehicleController {
  constructor(
    private service: VehicleService,
    private vehicleRepo: VehicleRepository,
  ) {}
  // this api is being called
  @Get('locations')
  async getLocations() {
    return { locations: await this.service.findAllLocations() };
  }

  @Get()
  async list(@Query('type') type: string, @Query('location') location: string) {
    if (type && location) {
      return this.service.listByTypeAndLocation(type, location);
    }
    if (location) {
      return this.service.listByLocation(location);
    }
    // Return all vehicles if no filters
    return this.vehicleRepo.find();
  }
}
