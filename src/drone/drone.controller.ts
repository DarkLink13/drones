import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import ICommonQuery from 'src/types/common.query.interface';
import { MoreThan, Not } from 'typeorm';
import { Drone } from './drone.entity';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';
import { LoadDroneDto } from './dto/load-drone.dto';

@Controller('drone')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @Post()
  async create(@Body() createDroneDto: CreateDroneDto) {
    return this.droneService.create(createDroneDto);
  }

  @Post('load')
  async load(@Body() loadDroneDto: LoadDroneDto) {
    return this.droneService.load(loadDroneDto);
  }

  @Get('available')
  async findLoaded() {
    const response = this.droneService.getAll({
      where: { batteryCapacity: MoreThan(25), state: Not('LOADING') },
    } as ICommonQuery<Drone>);
    if (!response) {
      throw new NotFoundException('Not available');
    }
    return response;
  }

  @Get(':id/:item')
  async findBattery(@Param('id') id: number, @Param('item') item: string) {
    if (!['batteryCapacity', 'medications'].includes(item))
      throw new NotFoundException('Not a valid URL');
    const response = await this.droneService.getById(id);
    if (!response) {
      throw new NotFoundException(`Not found: ${id}`);
    }
    const results = response[item];
    return { [item]: results };
  }
}
