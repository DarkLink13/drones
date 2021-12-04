import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMedicationDto } from 'src/medication/dto/create-medication.dto';
import { Medication } from 'src/medication/medication.entity';
import { MedicationRepository } from 'src/medication/medication.repository';
import ICommonQuery from 'src/types/common.query.interface';
import { fromCommonToFindQuery } from 'src/utils/fromCommonToFindQuery';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Drone } from './drone.entity';
import { DroneRepository } from './drone.repository';
import { CreateDroneDto } from './dto/create-drone.dto';
import { FindDroneDto } from './dto/find-drone.dto';
import { LoadDroneDto } from './dto/load-drone.dto';

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(DroneRepository)
    private readonly _droneRepository: DroneRepository,
    @InjectRepository(MedicationRepository)
    private readonly _medicationRepository: MedicationRepository,
  ) {}
  async getById(id: number): Promise<FindDroneDto> {
    if (!id) throw new BadRequestException('id must be sent');
    const drone: Drone = await this._droneRepository.findOne(id);
    if (!drone) throw new NotFoundException('Not found');
    return drone as FindDroneDto;
  }

  async getAll(query: ICommonQuery<Drone>): Promise<FindDroneDto[]> {
    const drones: Drone[] = await this._droneRepository.find({
      loadEagerRelations: true,
      ...fromCommonToFindQuery(query),
    });

    return drones as FindDroneDto[];
  }

  async create(body: CreateDroneDto): Promise<Drone> {
    const newDrone = await this._droneRepository.save(body);
    return newDrone;
  }

  async load({ drone, medications }: LoadDroneDto): Promise<Drone> {
    if (!drone) throw new BadRequestException('id must be sent');
    const _drone = await this._droneRepository.findOne(drone);
    if (!_drone) throw new NotFoundException('Not found');
    const _medications = new Array<Medication>();

    let newWeight = _drone.medications.reduce(
      (sum, medication) => sum + parseInt(medication.weight.toString()),
      0,
    );
    for (const medication of medications) {
      if (newWeight + medication.weight >= _drone.weightLimit)
        throw new BadRequestException(
          'The drone is being loaded with more weight that it can carry',
        );
      newWeight += medication.weight;
      const newMedication = await this._medicationRepository.create(
        medication as CreateMedicationDto,
      );
      _medications.push(newMedication);
    }

    _drone.medications = [..._drone.medications, ..._medications];

    const results = await this._droneRepository.save(_drone);
    return results;
  }

  async update(id: number, body: Drone): Promise<UpdateResult> {
    if (!id) throw new BadRequestException('id must be sent');
    const exist = await this._droneRepository.findOne(id);
    if (!exist) throw new NotFoundException('Not found');
    const drone = await this._droneRepository.update(id, body);
    return drone;
  }

  async updateDrones(body: Drone[]): Promise<UpdateResult[]> {
    const responses: UpdateResult[] = [];
    body.forEach(async (drone) => {
      if (!drone.id) throw new BadRequestException('id must be sent');
      const _drone = await this._droneRepository.update(drone.id, drone);
      responses.push(_drone);
    });
    return responses;
  }

  async delete(id: number): Promise<DeleteResult> {
    if (!id) throw new BadRequestException('id must be sent');
    const exist = await this._droneRepository.findOne(id);
    if (!exist) new NotFoundException();

    const deleted: DeleteResult = await this._droneRepository.delete(id);
    return deleted;
  }
  async deleteMany(ids: number[]): Promise<DeleteResult> {
    if (!ids.length) throw new BadRequestException('"ids" param required');

    const existDrones: Drone[] = await this._droneRepository.findByIds(ids);
    if (!existDrones.length) throw new NotFoundException('Not found');

    const deleted: DeleteResult = await this._droneRepository.delete(ids);
    return deleted;
  }
}
