import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IResponsePadrao } from '../types/ResponsePadrao';
import { DefaultMessages } from '../types/DefaultMessages';
import { Brackets } from 'typeorm/query-builder/Brackets';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { v4 as uuid } from 'uuid';

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
    const data = await this.repository.findOne({ where: { id } });
    if (data) {
      return {
        error: false,
        message: [DefaultMessages.QUERY_SUCCESS],
        data,
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
}
