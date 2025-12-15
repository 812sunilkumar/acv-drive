import { Controller, Get, Query } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleRepository } from './vehicle.repository';

@Controller('vehicles')
export class VehicleController {
  constructor(
    private service: VehicleService,
    private vehicleRepo: VehicleRepository,
  ) {}
  
  @Get('locations')
  async getLocations() {
    return { locations: await this.service.findAllLocations() };
  }

  @Get()
  async list(@Query('location') location: string) {
    return this.service.listByLocation(location);
  }
}
