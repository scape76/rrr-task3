import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Put,
  Delete,
} from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateTodoDto, EditTodoDto } from './dto';

@Controller('notes')
export class NotesController {
  constructor(private notesService: NotesService) {}

  @Post('')
  createNote(@Body() dto: CreateTodoDto) {
    return this.notesService.create(dto);
  }

  @Delete('/:id')
  deleteNote(@Param('id') id: string) {
    return this.notesService.delete(id);
  }

  @Get()
  getAllNotes() {
    return this.notesService.getAll();
  }

  @Get('/stats')
  getNotesData() {
    console.log("here")
    return this.notesService.getData();
  }

  @Get('/:id')
  getNote(@Param('id') id: string) {
    return this.notesService.getOne(id);
  }

  @Patch('/:id')
  editNote(@Param('id') id: string, @Body() dto: EditTodoDto) {
    return this.notesService.edit(id, dto);
  }

}
