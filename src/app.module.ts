import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Note } from './notes/note.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: Number(process.env.PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Note],
    }),
  ],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
