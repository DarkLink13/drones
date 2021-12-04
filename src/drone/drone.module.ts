import { DroneService } from './drone.service';
import { DroneController } from './drone.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneRepository } from './drone.repository';
import { MedicationRepository } from 'src/medication/medication.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DroneRepository, MedicationRepository])],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}
