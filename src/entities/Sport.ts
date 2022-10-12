import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
} from "typeorm";
import { Base } from "./utils/Base";
import { Player } from "./Player";

@Entity("sport")
export class Sport extends Base {
  @Column({
    nullable: false,
  })
  name: string;

  @ManyToMany((type) => Player, {
    cascade: true,
  })
  players: Player[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
