import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import {Exclude} from 'class-transformer'
import { IsDefined, IsEmail, IsEmpty, IsString, MaxLength, MinLength, IsOptional} from 'class-validator'


import { SharedProps } from "./SharedProps";
import { Post } from "./Post";
import { IsDateStringCustom } from "./customValidators";

enum UserType {
  user = "user",
  admin = "admin",
}

@Entity({ name: "users" })
export class User extends SharedProps {
  @PrimaryGeneratedColumn()
  @IsEmpty({always: true, message: 'Id not required!'})
  id!: number;

  @Column({ name: "first_name", nullable: false })
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  firstName!: string;

  @Column({ name: "last_name", nullable: false })
  @IsDefined()
  @IsString()
  @MinLength(2)
  @MaxLength(30)
  lastName!: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  @IsDefined()
  email!: string;
  
  @Exclude()
  @Column({ nullable: false })
  @IsEmpty({always: true, message: 'Salt not required!'})
  salt!: string;
  
  @Exclude()
  @Column({ nullable: false})
  @IsDefined()
  @IsString()
  @MinLength(6)
  password!: string;

  @Column({ name: "dob", nullable: true, type: "date" })
  @IsOptional()
  @IsDateStringCustom()
  dateOfBirth?: Date;

  @Column({ name: "role", default: UserType.user })
  @IsEmpty({always: true, message: 'Role not required!'})
  role!: UserType;

  @OneToMany(() => Post, (post: Post) => post.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  posts?: Post[];
}
