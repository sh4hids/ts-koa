import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { SharedProps } from "./SharedProps";
import { User } from "./User";

@Entity({ name: "posts" })
export class Post extends SharedProps {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column({ type: "text" })
  body!: string;

  @Column({ name: "user_id", nullable: false })
  userId!: number;

  @ManyToOne(() => User, (user: User) => user.posts)
  @JoinColumn({ name: "user_id" })
  user!: User;
}
