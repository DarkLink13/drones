import { MedicationModule } from './medication/medication.module';
import { DroneModule } from './drone/drone.module';
import { ConfigService } from '../config/config.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { Configuration } from '../config/config.keys';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [MedicationModule, DroneModule, ConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  static port: number | string;

  constructor(private readonly _configService: ConfigService) {
    AppModule.port = this._configService.get(Configuration.PORT);
  }
}
