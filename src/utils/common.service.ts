import ICommonQuery from './../types/common.query.interface';
import { BadRequestException, NotFoundException } from '@nestjs/common';

import {
  DeleteResult,
  UpdateResult,
  Repository,
  BaseEntity,
  FindManyOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

interface IExcelProperties {
  [key: string]: string | { name: string; action: (payload: any) => any };
}

export class CommonService<T extends BaseEntity, R extends Repository<T>> {
  excelProperties: IExcelProperties;
  public readonly entityName: string;
  constructor(private readonly _commonRepository: R) {
    this.entityName = this._commonRepository.metadata.name;
  }

  private biuldFindManyOptions(query: ICommonQuery<T>): FindManyOptions<T> {
    return {
      loadEagerRelations: true,
      where: query?.where,
      take: query?.limit,
      skip: query?.offset,
      order: query?.order,
    };
  }

  private buildExcelRows(entities: T[]) {
    return entities.map((entity) => {
      const row: { [key: string]: any } = {};

      for (const x in this.excelProperties) {
        if (typeof this.excelProperties[x] === 'string') {
          row[this.excelProperties[x].toString()] = entity[x];
        } else {
          const name: string = this.excelProperties[x]['name'];
          row[name] = this.excelProperties[x]['action'](entity[x]);
        }
      }
      return row;
    });
  }

  async get(id: number): Promise<T> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const entity: T = await this._commonRepository.findOne(id);

    if (!entity) {
      throw new NotFoundException(
        `there not ${this.entityName} matching with the id.`,
      );
    }

    return entity;
  }

  async getAll(query: ICommonQuery<T>): Promise<T[]> {
    const options = this.biuldFindManyOptions(query);
    const entity: T[] = await this._commonRepository.find(options);
    return entity;
  }

  async update(
    id: number,
    newValues: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const exist = await this._commonRepository.findOne(id);
    if (!exist) {
      throw new NotFoundException(
        `there not ${this.entityName} matching with the query.`,
      );
    }

    const updated: UpdateResult = await this._commonRepository.update(
      id,
      newValues,
    );
    return updated;
  }

  async delete(id: number): Promise<DeleteResult> {
    const exist = await this._commonRepository.findOne(id);

    if (!exist) {
      throw new NotFoundException(
        `there not ${this.entityName} matching with the query.`,
      );
    }

    const deleted: DeleteResult = await this._commonRepository.delete(id);
    return deleted;
  }

  async deleteMany(ids: number[]): Promise<DeleteResult> {
    if (!ids || !ids.length) {
      throw new BadRequestException('Parámetro "ids" requerido');
    }

    const entities: T[] = await this._commonRepository.findByIds(ids);
    if (!entities.length) {
      throw new NotFoundException(
        `theres not ${this.entityName}s matching with the query.`,
      );
    }

    const deleted: DeleteResult = await this._commonRepository.delete(ids);

    return deleted;
  }
}
