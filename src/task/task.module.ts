/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DroneRepository } from 'src/drone/drone.repository';
import { TasksService } from './task.service';

@Module({
  imports: [TypeOrmModule.forFeature([DroneRepository])],
  controllers: [],
  providers: [TasksService],
})
export class TaskModule {}
