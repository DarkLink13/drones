import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { DroneRepository } from 'src/drone/drone.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(DroneRepository)
    private readonly _droneRepository: DroneRepository,
  ) {}

  private readonly logger = new Logger(TasksService.name);
  @Cron('1 * * * * *')
  async handleCron() {
    const results = await this._droneRepository.find();
    this.logger.log('----EXCECUTING PERIODIC TASK FOR DRONE STATUS----');
    for (const result of results) {
      this.logger.verbose(
        `Drone #${result.id}, Serial Number: ${result.serialNumber}, battery: ${result.batteryCapacity}`,
      );
    }
  }
}
