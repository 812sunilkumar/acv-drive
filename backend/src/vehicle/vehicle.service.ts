import { Injectable, BadRequestException } from '@nestjs/common';
import { VehicleRepository } from './vehicle.repository';
import { IVehicle } from './interfaces/vehicle.interface';

@Injectable()
export class VehicleService {
  constructor(private repo: VehicleRepository) {}

  async listByTypeAndLocation(type: string, location: string): Promise<IVehicle[]> {
    return this.repo.find({ type: type.toLowerCase(), location: location.toLowerCase() });
  }

  /**
   * Returns unique vehicle types for a location
   * Removes duplicate vehicle models and returns only one representative per type
   */
  async listByLocation(location: string): Promise<IVehicle[]> {
    if (!location) {
      throw new BadRequestException('location query param is required');
    }
    
    const vehicles = await this.repo.find({ location: location.toLowerCase() });
    
    // Group by type and return only the first vehicle of each type
    const uniqueVehiclesByType = new Map<string, IVehicle>();
    
    for (const vehicle of vehicles) {
      if (!uniqueVehiclesByType.has(vehicle.type)) {
        uniqueVehiclesByType.set(vehicle.type, vehicle);
      }
    }
    
    return Array.from(uniqueVehiclesByType.values());
  }

  async findAllLocations(): Promise<string[]> {
    const vehicles = await this.repo.find({}, {_id: 0, location: 1});
    return [...new Set(vehicles.map(v => v.location))].sort();
  }


  async findById(id: string): Promise<IVehicle | null> {
    return this.repo.findById(id);
  }
}
