import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Base } from "./utils/Base";
import { Sport } from "./Sport";

@Entity("player")
export class Player extends Base {
  @Column({
    nullable: false,
  })
  email: string;

  @ManyToMany((type) => Sport, {
    cascade: true,
  })
  @JoinTable({
    name: "players_sports",
    joinColumn: {
      name: "player",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "sport",
      referencedColumnName: "id",
    },
  })
  sports: Sport[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
