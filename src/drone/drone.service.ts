import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ICommonQuery from 'src/types/common.query.interface';
import { fromCommonToFindQuery } from 'src/utils/fromCommonToFindQuery';
import { DeleteResult, UpdateResult } from 'typeorm';
import { Drone } from './drone.entity';
import { DroneRepository } from './drone.repository';
import { FindDroneDto } from './dto/find.drone.dto';

@Injectable()
export class DroneService {
  constructor(
    @InjectRepository(DroneRepository)
    private readonly _droneRepository: DroneRepository,
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

  async create(body: Drone): Promise<Drone> {
    const newDrone = await this._droneRepository.save(body);
    return newDrone;
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
