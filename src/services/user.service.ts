import {Service} from 'typedi'
import {Connection} from 'typeorm';

import {User} from '../entities/User';
import {BaseService} from './base.service'

@Service()
export class UserService extends BaseService<User> {

  constructor(db: Connection) {
    super(db.getRepository(User))
  }
}