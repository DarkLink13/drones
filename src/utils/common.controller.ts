import { CommonService } from './common.service';
import ICommonQuery from './../types/common.query.interface';
import {
  Delete,
  Get,
  Patch,
  Param,
  ParseIntPipe,
  Body,
  Query,
  Res,
} from '@nestjs/common';
import { BaseEntity, DeleteResult, UpdateResult, Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { Response } from 'express';

/**
 * @classdesc This class is a common controller that contains the most common methods of all controllers like get, getAll, update, delete, deleteMany.
 * @class To extends of this class you must pass three generics: <BaseEntity, Repository, Service>
 * @constructor The constructor need the instance of the service used in the controller.
 */
export class CommonController<
  T extends BaseEntity,
  R extends Repository<T>,
  S extends CommonService<T, R>,
> {
  constructor(private readonly _commonService: S) {}

  @Get()
  async getAll(@Query() query: ICommonQuery<T>): Promise<T[]> {
    const entities: T[] = await this._commonService.getAll(query);
    return entities;
  }

  @Get(':id')
  async get(@Param('id', ParseIntPipe) id: number): Promise<T> {
    const entity: T = await this._commonService.get(id);
    return entity;
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const updated: UpdateResult = await this._commonService.update(id, body);
    return updated;
  }

  @Delete()
  async deleteMany(@Body() { ids }: { ids: number[] }): Promise<DeleteResult> {
    const deleted: DeleteResult = await this._commonService.deleteMany(ids);
    return deleted;
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteResult> {
    const deleted: DeleteResult = await this._commonService.delete(id);
    return deleted;
  }
}
