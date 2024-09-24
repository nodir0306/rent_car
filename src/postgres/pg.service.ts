import {
    ConflictException,
    Injectable,
    OnModuleDestroy,
    OnModuleInit,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  import { Client } from 'pg';
  
  @Injectable()
  export class PgService implements OnModuleInit, OnModuleDestroy {
    #_client: Client;
  
    constructor(private readonly config: ConfigService) {
      this.#_client = new Client({
        host: config.get<string>('database.host'),
        port: config.get<number>('database.port'),
        user: config.get<string>('database.user'),
        password: config.get<string>('database.password'),
        database: config.get<string>('database.database_name'),
      });
    }
  
    async fetchData(query: string, ...params: any[]): Promise<any> {
      try {
        const { rows } = await this.#_client.query(query, params);
        return rows;
      } catch (error) {
        throw new ConflictException('DB error');
      }
    }
  
    async onModuleInit() {
      await this.#_client.connect();
    }
  
    async onModuleDestroy() {
      await this.#_client.end();
    }
  }
  