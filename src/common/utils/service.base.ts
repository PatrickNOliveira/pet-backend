import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ServiceBase<T> {
  constructor(private repository: Repository<T>) {}

  async getAll(): Promise<any> {
    return await this.repository.find();
  }
}
