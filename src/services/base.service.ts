import {Repository, DeepPartial} from 'typeorm'

export class BaseService<T> {
  readonly repo: Repository<T>;
  constructor(repo: Repository<T>) {
    this.repo = repo;
  }

  async getAll(): Promise<Array<Partial<T>>> {
    return this.repo.find()
  }
  
  async getById(id: number): Promise<T> {
    return this.repo.findOneOrFail(id)
  }

  async update(id: number, body: DeepPartial<T>): Promise<T>{
    await this.repo.update(id, body);
    return this.getById(id);
  }

  async delete(id: number): Promise<T> {
    return this.delete(id)
  }
}