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
import {hash, genSalt} from 'bcryptjs'

import {CtxWithDb} from '../interfaces'
import { UserService } from "../services";
import {User} from '../entities/User'
import { validate, ValidationError } from "class-validator";

@Controller("/users")
@Service()
export class UsersController {

  constructor(private readonly userService: UserService) {

  }

  @Post()
  async create(@Body() user: DeepPartial<User>) {
    const instance: DeepPartial<User> = this.userService.getInstance(user);
    const validationResult: ValidationError[] = await validate(instance);

    if(validationResult.length > 0) {
      throw validationResult;
    }

    instance.salt = await genSalt();
    instance.password = await hash(instance.password as string, instance.salt)
    return this.userService.create(user, instance);
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
