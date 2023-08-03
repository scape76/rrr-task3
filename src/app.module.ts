import { ConfigurableModuleBuilder, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { NotesController } from './notes/notes.controller';
import { NotesService } from './notes/notes.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [NotesController],
  providers: [NotesService],
})
export class AppModule {}
