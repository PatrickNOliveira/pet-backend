import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IResponsePadrao } from '../types/ResponsePadrao';
import { DefaultMessages } from '../types/DefaultMessages';
import { Brackets } from 'typeorm/query-builder/Brackets';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';

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
}
