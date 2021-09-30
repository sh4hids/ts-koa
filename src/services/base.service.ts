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
}