import { Configuration } from './../config/config.keys';
import { ConfigService } from './../config/config.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../config/config.module';
import { ConnectionOptions } from 'typeorm';
export const databaseProvider = [
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        ssl: false,
        type: 'postgres',
        host: config.get(Configuration.DB_CONNECTION),
        username: config.get(Configuration.DB_USER),
        password: config.get(Configuration.DB_PASS),
        entities: [__dirname + '.\\..\\**\\*.entity{.ts,.js}'],
        migrations: [__dirname + '.\\migrations\\*{.ts,.js}'],
        cli: {
          migrationsDir: '.\\migrations\\',
        },
      } as ConnectionOptions;
    },
  }),
];
