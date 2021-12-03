import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum droneModel {
  LIGHT = 'Lightweight',
  MIDDLE = 'Middleweight',
  CRUISER = 'Cruiserweight',
  HEAVY = 'Heavyweight',
}

export enum droneStatus {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  RETURNING = 'RETURNING',
}

@Entity('drones')
export class Drone extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'varchar', length: 100 })
  serialNumber: string;

  @Column({
    type: 'enum',
    enum: droneModel,
    default: 'Lightweight',
    nullable: false,
  })
  model: droneModel;

  @Column({ type: 'decimal' })
  weightLimit: number;

  @Column({ type: 'decimal' })
  batteryCapacity: number;

  @Column({ type: 'enum', enum: droneStatus, default: 'IDLE', nullable: false })
  state: droneStatus;
}
