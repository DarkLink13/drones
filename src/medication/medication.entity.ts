import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
