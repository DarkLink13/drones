import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MedicationService } from './medication.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('medication')
export class MedicationController {
  constructor(private readonly medicationService: MedicationService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/',
      }),
    }),
  )
  async create(
    @UploadedFile() image: Express.Multer.File,
    @Body() createMedicationDto: CreateMedicationDto,
  ) {
    (createMedicationDto as any).image = image.path;
    return this.medicationService.create(createMedicationDto);
  }
}
