import { join } from 'path';
import { existsSync, readFileSync } from 'fs';
import { parse } from 'dotenv';
export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  constructor() {
    const isDevelopmentEnv = process.env.NODE_ENV !== 'production';
    if (isDevelopmentEnv) {
      const envFilePath = join(__dirname, '../../.env');
      const existPath = existsSync(envFilePath);
      if (!existPath) {
        console.log('.env file does not exist');
        process.exit(0);
      }
      const envFileText = readFileSync(envFilePath);
      this.envConfig = parse(envFileText);
    } else {
      this.envConfig = {
        PORT: process.env.PORT,
        DB_PORT: process.env.DB_PORT,
        DB_USER: process.env.DB_USER,
        DB_NAME: process.env.DB_NAME,
        DB_CONNECTION: process.env.DB_CONNECTION,
        DB_PASS: process.env.DB_PASS,
      };
    }
  }
  get(key: string): string {
    return this.envConfig[key];
  }
}
