import { IsNumberString, Matches } from 'class-validator';

export class CreateMedicationDto {
  @Matches(/^[a-zA-Z0-9-_]+$/)
  name: string;

  @IsNumberString()
  weight: number;

  @Matches(/^[A-Z0-9_]+$/)
  code: string;
}
