'use client';
import React from 'react';
import { Vehicle } from '../lib/types';

interface VehicleInfoProps {
  vehicle: Vehicle;
}

export default function VehicleInfo({ vehicle }: VehicleInfoProps) {
  // Debug: Log vehicle data to see what we're receiving
  if (!vehicle) {
    return null;
  }
  
  console.log('VehicleInfo - vehicle data:', vehicle);
  console.log('VehicleInfo - batteryPack:', vehicle.batteryPack);
  console.log('VehicleInfo - electricMotorPower:', vehicle.electricMotorPower);
  
  const specifications = [
    {
      label: 'Battery Pack',
      value: vehicle.batteryPack,
      icon: '🔋',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
    },
    {
      label: 'Electric Motor Power',
      value: vehicle.electricMotorPower,
      icon: '⚡',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
    },
    {
      label: 'Charger Option',
      value: vehicle.chargerOption,
      icon: '🔌',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
    },
    {
      label: 'Acceleration',
      value: vehicle.acceleration,
      icon: '⚙️',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
    },
  ].filter(spec => spec.value && spec.value.trim() !== ''); // Only show specifications that have values

  // Always show the component, even if no specs (show availability info)
  const hasSpecs = specifications.length > 0;

  return (
    <div className="mb-6 p-5 bg-indigo-50 border-2 border-indigo-200 rounded-lg">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">🚗</span>
        <h3 className="text-lg font-bold text-gray-900">Vehicle Specifications</h3>
      </div>
      {hasSpecs ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${spec.bgColor} ${spec.borderColor}`}
            >
              <div className="flex items-center gap-3">
                <span className={`text-2xl ${spec.color}`}>{spec.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-gray-700 mb-1">{spec.label}</div>
                  <div className={`text-base font-bold ${spec.color}`}>{spec.value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-4 bg-gray-50 border-2 border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            Vehicle specifications are not available for this model. Please contact us for more details.
          </p>
        </div>
      )}
      <div className="mt-4 pt-4 border-t border-indigo-200">
        <div className="text-sm text-gray-600">
          <p className="font-medium text-gray-800 mb-2">Availability:</p>
          <div className="space-y-1">
            <p>
              <span className="font-medium">Available Days:</span>{' '}
              <span className="text-gray-700">{vehicle.availableDays?.join(', ').toUpperCase() || 'N/A'}</span>
            </p>
            <p>
              <span className="font-medium">Available Time Window:</span>{' '}
              <span className="text-gray-700">{vehicle.availableFromTime || 'N/A'} - {vehicle.availableToTime || 'N/A'}</span>
              <span className="text-gray-500 text-xs ml-1">(subject to availability)</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
