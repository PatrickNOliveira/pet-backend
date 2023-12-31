import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { IResponsePadrao } from '../types/ResponsePadrao';
import { DefaultMessages } from '../types/DefaultMessages';
import { Brackets } from 'typeorm/query-builder/Brackets';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { EntityFieldsNames } from 'typeorm/common/EntityFieldsNames';
import { ObjectID } from 'typeorm/driver/mongodb/typings';
import { FindConditions } from 'typeorm/find-options/FindConditions';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class ServiceBase<T> {
  constructor(protected repository: Repository<T>) {}

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

  async store(
    body: Partial<T>,
    validateUnique?: boolean,
    validateUniqueValues?: {
      value: any;
      columnName: string;
    }[],
    validateRelationship?: boolean,
    validateRelationshipValues?: {
      value: any;
      service: any;
    }[],
  ): Promise<IResponsePadrao<T>> {
    if (validateRelationship) {
      for (const item of validateRelationshipValues) {
        const response = await item.service.exists(item.value);
        if (!response) {
          throw new HttpException(
            {
              error: true,
              message: [
                `Nenhum id com o valor ${item.value} encontrado, portanto, não foi possível realizar o relacionamento`,
              ],
              data: null,
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }
    }
    if (validateUnique) {
      for (const item of validateUniqueValues) {
        await this.validateUnique({
          value: item?.value,
          columnName: item?.columnName,
        });
      }
    }
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

  async show(id: string, include?: string[]): Promise<IResponsePadrao<T>> {
    await this.validateExists(id);
    const data = await this.repository.findOne({
      where: { id },
      relations: include ?? [],
    });
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
    validateUnique?: boolean;
    validateUniqueValues?: {
      value: any;
      columnName: string;
    }[];
  }): Promise<IResponsePadrao<T>> {
    const { validateUnique, validateUniqueValues } = input;
    if (validateUnique) {
      for (const item of validateUniqueValues) {
        await this.validateUnique({
          value: item?.value,
          columnName: item?.columnName,
          updating: true,
        });
      }
    }
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

  protected async validateUnique(input: {
    value: any;
    columnName: string;
    updating?: boolean;
    condition?:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectID
      | ObjectID[]
      | FindConditions<T>;
  }) {
    if (input.updating) {
      const original = await this.repository.findOne(input.condition as any);
      const response = await this.repository.findOne({
        where: { [input.columnName]: input.value },
      });
      if (response && (response as any).id != (original as any).id) {
        throw new HttpException(
          {
            error: true,
            message: [`${input.columnName} já está sendo utilizado`],
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    } else {
      const response = await this.repository.findOne({
        where: { [input.columnName]: input.value },
      });
      if (response) {
        throw new HttpException(
          {
            error: true,
            message: [`${input.columnName} já está sendo utilizado`],
            data: null,
          },
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async exists(id: string): Promise<boolean> {
    const data = await this.repository.findOne({ where: { id } });
    return !!data;
  }
}
