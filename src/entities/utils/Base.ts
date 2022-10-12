import { Entity, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity()
export class Base extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}
