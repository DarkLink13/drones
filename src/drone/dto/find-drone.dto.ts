import {
  IsInt,
  IsString,
  Length,
  IsEnum,
  Min,
  Max,
  IsNumber,
} from 'class-validator';
import { droneModel, droneStatus } from '../drone.entity';

export class FindDroneDto {
  @IsInt()
  readonly id: number;

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
