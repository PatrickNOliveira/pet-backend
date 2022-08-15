import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IResponsePadrao } from '../types/ResponsePadrao';
import { DefaultMessages } from '../types/DefaultMessages';
import { Brackets } from 'typeorm/query-builder/Brackets';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { v4 as uuid } from 'uuid';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ServiceBase<T> {
  constructor(private repository: Repository<T>) {}

  async getAll(input?: {
    where?:
      | Brackets
      | string
      | ((qb) => string)
      | ObjectLiteral
      | ObjectLiteral[];
    include?: string[];
    order?: {
      [P in EntityFieldsNames<T>]?: 'ASC' | 'DESC' | 1 | -1;
    };
    take?: number;
    page?: number;
  }): Promise<IResponsePadrao<T[]>> {
    const skipValue = input?.page === 1 ? 0 : input?.take * (input?.page - 1);
    const skip = input?.page ? skipValue : undefined;
    const data = await this.repository.find({
      where: input?.where ?? {},
      relations: input?.include ?? [],
      order: input?.order ?? undefined,
      take: input?.take || undefined,
      skip,
    });
    return {
      error: false,
      message: [DefaultMessages.QUERY_SUCCESS],
      data,
    };
  }

  async store(body: Partial<T>): Promise<IResponsePadrao<T>> {
    (body as any).id = uuid();
    await this.repository.insert(body as T);
    const data = await this.repository.findOne({
      where: { id: (body as any).id },
    });
    return {
      error: false,
      message: [DefaultMessages.CREATED],
      data,
    };
  }

  async show(id: string): Promise<IResponsePadrao<T>> {
    await this.validateExists(id);
    const data = await this.repository.findOne({ where: { id } });
    return {
      error: false,
      message: [DefaultMessages.QUERY_SUCCESS],
      data,
    };
  }

  async destroy(
    condition:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>,
  ): Promise<IResponsePadrao<T>> {
    const result = await this.repository.delete(condition);
    if (result.affected > 0) {
      return {
        error: false,
        message: [DefaultMessages.DELETED],
        data: null,
      };
    }
    throw new HttpException(
      {
        error: true,
        message: [DefaultMessages.DATA_NOT_FOUND],
        data: null,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  async update(input: {
    condition:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>;
    body: QueryDeepPartialEntity<T>;
  }): Promise<IResponsePadrao<T>> {
    const result = await this.repository.update(input.condition, input.body);
    if (result.affected > 0) {
      const data = await this.repository.findOne({
        where: input.condition as any,
      });
      return {
        error: false,
        message: [DefaultMessages.UPDATED],
        data: data,
      };
    }
    throw new HttpException(
      {
        error: true,
        message: [DefaultMessages.DATA_NOT_FOUND],
        data: null,
      },
      HttpStatus.NOT_FOUND,
    );
  }

  protected async validateExists(id: string): Promise<void> {
    const data = await this.repository.findOne({ where: { id } });
    if (!data) {
      throw new HttpException(
        {
          error: true,
          message: [DefaultMessages.DATA_NOT_FOUND],
          data: null,
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
