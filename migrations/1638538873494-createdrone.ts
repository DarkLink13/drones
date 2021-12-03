import {MigrationInterface, QueryRunner} from "typeorm";

export class createdrone1638538873494 implements MigrationInterface {
    name = 'createdrone1638538873494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "drones" ("id" SERIAL NOT NULL, CONSTRAINT "PK_3137fc855d37186eeccd193569f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "drones"`);
    }

}
