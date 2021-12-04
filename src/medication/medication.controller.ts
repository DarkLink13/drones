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
import { Medication } from './medication.entity';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  async create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationService.create(createMedicationDto);
  }

  @Get()
  async findAll(@Req() req: Request) {
    const response = this.medicationService.getAll(
      req.query as ICommonQuery<Medication>,
    );
    if (!response) {
      throw new NotFoundException('Not found');
    }
    return response;
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const response = this.medicationService.getById(id);
    if (!response) {
      throw new NotFoundException(`Not found: ${id}`);
    }
    return response;
  }
}
