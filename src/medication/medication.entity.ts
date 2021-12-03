import { Drone } from '../drone/drone.entity';
import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('medications')
export class Medication extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;

  @Column({ type: 'decimal' })
  weight: number;

  @Column()
  code: string;

  @Column()
  image: string;
}
