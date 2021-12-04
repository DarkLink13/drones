import { EntityRepository, Repository } from 'typeorm';
import { Medication } from './medication.entity';

@EntityRepository(Medication)
export class MedicationRepository extends Repository<Medication> {}
