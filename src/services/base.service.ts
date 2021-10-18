import { Repository, DeepPartial, ObjectLiteral } from "typeorm";

export class BaseService<T> {
  readonly repo: Repository<T>;
  constructor(repo: Repository<T>) {
    this.repo = repo;
  }

  async create(
    data: DeepPartial<T>,
    generatedEntity?: DeepPartial<T>
  ): Promise<T> {
    const entity: DeepPartial<T> = generatedEntity || this.getInstance(data);
    return await this.repo.save(entity);
  }

  getInstance(data: DeepPartial<T>): DeepPartial<T> {
    return this.repo.create(data);
  }

  async getAll(): Promise<Array<Partial<T>>> {
    return this.repo.find();
  }

  async getById(id: number | undefined, where?: ObjectLiteral): Promise<T> {
    if (where) {
      return this.repo.findOneOrFail(id, { where });
    } else {
      return this.repo.findOneOrFail(id);
    }
  }

  async update(id: number, body: DeepPartial<T>): Promise<T> {
    await this.repo.update(id, body);
    return this.getById(id);
  }

  async delete(id: number): Promise<T> {
    return this.delete(id);
  }
}
