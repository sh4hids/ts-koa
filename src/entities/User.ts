import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { SharedProps } from "./SharedProps";
import { Post } from "./Post";

enum UserType {
  user = "user",
  admin = "admin",
}

@Entity({ name: "users" })
export class User extends SharedProps {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ name: "first_name", nullable: false })
  firstName!: string;

  @Column({ name: "last_name", nullable: false })
  lastName!: string;

  @Column({ unique: true, nullable: false })
  email!: string;

  @Column({ name: "dob", nullable: true, type: "date" })
  dateOfBirth?: Date;

  @Column({ name: "role", default: UserType.user })
  role!: UserType;

  @OneToMany(() => Post, (post: Post) => post.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  posts?: Post[];
}
