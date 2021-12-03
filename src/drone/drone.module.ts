import { DroneService } from './drone.service';
import { DroneController } from './drone.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneRepository } from './drone.repository';

@Module({
  imports: [TypeOrmModule.forFeature([DroneRepository])],
  controllers: [DroneController],
  providers: [DroneService],
})
export class DroneModule {}
