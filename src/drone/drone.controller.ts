import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import ICommonQuery from 'src/types/common.query.interface';
import { Drone } from './drone.entity';
import { DroneService } from './drone.service';
import { CreateDroneDto } from './dto/create-drone.dto';

@Controller('drone')
export class DroneController {
  constructor(private readonly droneService: DroneService) {}

  @Post()
  async create(@Body() createDroneDto: CreateDroneDto) {
    return this.droneService.create(createDroneDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const response = this.droneService.getAll(req.query as ICommonQuery<Drone>);
    if (!response) {
      throw new NotFoundException('Not found');
    }
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = this.droneService.getById(id);
    if (!response) {
      throw new NotFoundException(`Not found: ${id}`);
    }
    return response;
  }
}
