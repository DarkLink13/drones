import {
  IsNumber,
  IsNotEmpty,
  IsString,
  Length,
  IsEnum,
  Max,
  Min,
} from 'class-validator';
import { droneModel, droneStatus } from '../drone.entity';

export class CreateDroneDto {
  @IsString()
  @Length(1, 100)
  serialNumber: string;

  @IsEnum(droneModel)
  model: droneModel;

  @IsNumber()
  @Min(0)
  @Max(500)
  weightLimit: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  batteryCapacity: number;

  @IsEnum(droneStatus)
  state: droneStatus;
}
