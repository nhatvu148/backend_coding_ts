import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  BaseEntity,
  PrimaryColumn,
} from "typeorm";
import { Player } from "./Player";

@Entity("sport")
export class Sport extends BaseEntity {
  @PrimaryColumn()
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
