import { MedicationService } from './medication.service';
import { MedicationController } from './medication.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MedicationRepository } from './medication.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationRepository])],
  controllers: [MedicationController],
  providers: [MedicationService],
})
export class MedicationModule {}
