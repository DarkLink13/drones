import { IsInt } from 'class-validator';
import { CreateMedicationDto } from 'src/medication/dto/create-medication.dto';

export class LoadDroneDto {
  @IsInt()
  drone: number;
  medications: CreateMedicationDto[];
}
