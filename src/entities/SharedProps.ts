import { UpdateDateColumn, CreateDateColumn } from "typeorm";

export class SharedProps {
  @CreateDateColumn({
    default: () => "CURRENT_TIMESTAMP(6)",
    type: "timestamp",
    name: "created_at",
  })
  createdAt!: Date;

  @UpdateDateColumn({
    default: () => "CURRENT_TIMESTAMP(6)",
    type: "timestamp",
    name: "updated_at",
  })
  updatedAt!: Date;
}
