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
import {Service} from 'typedi'

import {CtxWithDb} from '../interfaces'
import { UserService } from "../services";

@Controller("/users")
@Service()
export class UsersController {

  constructor(private readonly userService: UserService) {

  }

  @Post()
  create(@Body() user: any) {
    return {
      ...user,
    };
  }

  @Get("/:id")
  getById(@Param("id") id: number) {
    return {
      id,
      name: "john",
    };
  }

  @Get()
  getAll(@Ctx() ctx: CtxWithDb) {
    return this.userService.getAll()
  }

  @Put("/:id")
  update(@Param("id") id: number) {
    return {
      id,
      name: "Doe",
    };
  }

  @Delete("/:id")
  remove(@Param("id") id: number) {
    return {
      message: `User with id ${id} deleted`,
    };
  }
}
