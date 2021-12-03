import {MigrationInterface, QueryRunner} from "typeorm";

export class createdronesmedications1638554886541 implements MigrationInterface {
    name = 'createdronesmedications1638554886541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "drones" ("id" SERIAL NOT NULL, CONSTRAINT "PK_3137fc855d37186eeccd193569f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "medications" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "weight" numeric NOT NULL, "code" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_cdee49fe7cd79db13340150d356" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "drones_medications_medications" ("dronesId" integer NOT NULL, "medicationsId" integer NOT NULL, CONSTRAINT "PK_f5aa76e73f0bc79f3a571f09653" PRIMARY KEY ("dronesId", "medicationsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_4729047cb796f55be8858560c4" ON "drones_medications_medications" ("dronesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_67e039256ca18e45d0b33cc944" ON "drones_medications_medications" ("medicationsId") `);
        await queryRunner.query(`ALTER TABLE "drones" ADD "serialNumber" character varying(100) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "model" "public"."drones_model_enum" NOT NULL DEFAULT 'Lightweight'`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "weightLimit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "batteryCapacity" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "state" "public"."drones_state_enum" NOT NULL DEFAULT 'IDLE'`);
        await queryRunner.query(`ALTER TABLE "drones_medications_medications" ADD CONSTRAINT "FK_4729047cb796f55be8858560c48" FOREIGN KEY ("dronesId") REFERENCES "drones"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "drones_medications_medications" ADD CONSTRAINT "FK_67e039256ca18e45d0b33cc944d" FOREIGN KEY ("medicationsId") REFERENCES "medications"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drones_medications_medications" DROP CONSTRAINT "FK_67e039256ca18e45d0b33cc944d"`);
        await queryRunner.query(`ALTER TABLE "drones_medications_medications" DROP CONSTRAINT "FK_4729047cb796f55be8858560c48"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "state"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "batteryCapacity"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "weightLimit"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "model"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "serialNumber"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67e039256ca18e45d0b33cc944"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4729047cb796f55be8858560c4"`);
        await queryRunner.query(`DROP TABLE "drones_medications_medications"`);
        await queryRunner.query(`DROP TABLE "medications"`);
        await queryRunner.query(`DROP TABLE "drones"`);
    }

}
