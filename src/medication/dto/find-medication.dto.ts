import { IsNumber, Matches, IsUrl } from 'class-validator';

export class FindMedicationDto {
  @Matches(/[a-zA-Z0-9-_]*/)
  name: string;

  @IsNumber()
  weight: number;

  @Matches(/[A-Z0-9_]*/)
  code: string;

  @IsUrl()
  image: string;
}
