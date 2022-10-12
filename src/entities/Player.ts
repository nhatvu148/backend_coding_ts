import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";
import { Sport } from "./Sport";

@Entity("player")
export class Player extends BaseEntity {
  @PrimaryColumn()
  email: string;

  @ManyToMany((type) => Sport, {
    cascade: true,
  })
  @JoinTable({
    name: "players_sports",
    joinColumn: {
      name: "player",
      referencedColumnName: "email",
    },
    inverseJoinColumn: {
      name: "sport",
      referencedColumnName: "name",
    },
  })
  sports: Sport[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
