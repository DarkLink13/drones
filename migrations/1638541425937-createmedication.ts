import {MigrationInterface, QueryRunner} from "typeorm";

export class createmedication1638541425937 implements MigrationInterface {
    name = 'createmedication1638541425937'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "medications" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "weight" numeric NOT NULL, "code" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_cdee49fe7cd79db13340150d356" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "serialNumber" character varying(100) NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."drones_model_enum" AS ENUM('Lightweight', 'Middleweight', 'Cruiserweight', 'Heavyweight')`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "model" "public"."drones_model_enum" NOT NULL DEFAULT 'Lightweight'`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "weightLimit" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "batteryCapacity" numeric NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."drones_state_enum" AS ENUM('IDLE', 'LOADING', 'LOADED', 'DELIVERING', 'DELIVERED', 'RETURNING')`);
        await queryRunner.query(`ALTER TABLE "drones" ADD "state" "public"."drones_state_enum" NOT NULL DEFAULT 'IDLE'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "state"`);
        await queryRunner.query(`DROP TYPE "public"."drones_state_enum"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "batteryCapacity"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "weightLimit"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "model"`);
        await queryRunner.query(`DROP TYPE "public"."drones_model_enum"`);
        await queryRunner.query(`ALTER TABLE "drones" DROP COLUMN "serialNumber"`);
        await queryRunner.query(`DROP TABLE "medications"`);
    }

}
