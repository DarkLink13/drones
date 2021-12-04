import { Drone } from 'src/drone/drone.entity';
import {
  BaseEntity,
  Column,
  Entity,
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

  @ManyToMany(() => Drone, (drone) => drone.medications)
  drones: Drone[];
}
