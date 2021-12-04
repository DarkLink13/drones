import {
  IsNumber,
  IsString,
  Length,
  IsEnum,
  Max,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';

import { Drone, droneModel, droneStatus } from '../drone.entity';

@ValidatorConstraint({ name: 'lowLevelBattery', async: false })
export class LowLevelBattery implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    return !(text === 'LOADING' && (<Drone>args.object).batteryCapacity < 25);
  }

  defaultMessage() {
    return 'The drone has been set state "LOADING" and the battery is below 25%';
  }
}

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
  @Validate(LowLevelBattery)
  state: droneStatus;
}
