import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ICommonQuery from 'src/types/common.query.interface';
import { fromCommonToFindQuery } from 'src/utils/fromCommonToFindQuery';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Medication } from './medication.entity';
import { MedicationRepository } from './medication.repository';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { FindMedicationDto } from './dto/find-medication.dto';

@Injectable()
export class MedicationService {
  constructor(
    @InjectRepository(MedicationRepository)
    private readonly _medicationRepository: MedicationRepository,
  ) {}
  async getById(id: number): Promise<FindMedicationDto> {
    if (!id) throw new BadRequestException('id must be sent');
    const medication: Medication = await this._medicationRepository.findOne(id);
    if (!medication) throw new NotFoundException('Not found');
    return medication as FindMedicationDto;
  }

  async getAll(query: ICommonQuery<Medication>): Promise<FindMedicationDto[]> {
    const medications: Medication[] = await this._medicationRepository.find({
      loadEagerRelations: true,
      ...fromCommonToFindQuery(query),
    });

    return medications as FindMedicationDto[];
  }

  async create(body: CreateMedicationDto): Promise<Medication> {
    const newMedication = await this._medicationRepository.save(body);
    return newMedication;
  }

  async update(id: number, body: Medication): Promise<UpdateResult> {
    if (!id) throw new BadRequestException('id must be sent');
    const exist = await this._medicationRepository.findOne(id);
    if (!exist) throw new NotFoundException('Not found');
    const medication = await this._medicationRepository.update(id, body);
    return medication;
  }

  async updateMedications(body: Medication[]): Promise<UpdateResult[]> {
    const responses: UpdateResult[] = [];
    body.forEach(async (medication) => {
      if (!medication.id) throw new BadRequestException('id must be sent');
      const _medication = await this._medicationRepository.update(
        medication.id,
        medication,
      );
      responses.push(_medication);
    });
    return responses;
  }

  async delete(id: number): Promise<DeleteResult> {
    if (!id) throw new BadRequestException('id must be sent');
    const exist = await this._medicationRepository.findOne(id);
    if (!exist) new NotFoundException();

    const deleted: DeleteResult = await this._medicationRepository.delete(id);
    return deleted;
  }
  async deleteMany(ids: number[]): Promise<DeleteResult> {
    if (!ids.length) throw new BadRequestException('"ids" param required');

    const existMedications: Medication[] =
      await this._medicationRepository.findByIds(ids);
    if (!existMedications.length) throw new NotFoundException('Not found');

    const deleted: DeleteResult = await this._medicationRepository.delete(ids);
    return deleted;
  }
}
