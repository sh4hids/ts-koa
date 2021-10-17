import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Put,
  Delete,
  Ctx,
} from "routing-controllers";
import {Service} from 'typedi';
import {DeepPartial} from 'typeorm';

import {CtxWithDb} from '../interfaces'
import { UserService } from "../services";
import {User} from '../entities/User'

@Controller("/users")
@Service()
export class UsersController {

  constructor(private readonly userService: UserService) {

  }

  @Post()
  create(@Body() user: DeepPartial<User>) {
    return this.userService.create(user);
  }

  @Get("/:id")
  getById(@Param("id") id: number) {
    return this.userService.getById(id);
  }

  @Get()
  getAll(@Ctx() ctx: CtxWithDb) {
    return this.userService.getAll();
  }

  @Put("/:id")
  update(@Param("id") id: number, @Body() user: DeepPartial<User>) {
    return this.userService.update(id, user);
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    return this.userService.delete(id);
  }
}
