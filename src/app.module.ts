import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from './notes/note.model';
import { NotesModule } from './notes/notes.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './helpers/httpExceptionsFilter.filter';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Note],
      autoLoadModels: true,
    }),
    NotesModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
