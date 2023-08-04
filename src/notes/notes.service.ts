import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto, EditTodoDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { getDataByCategory } from 'src/helpers/utils';
import { Note } from './note.model';
import { Category } from 'src/types/notes';


@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private noteModel: typeof Note) {}

  create(dto: CreateTodoDto) {
    return this.noteModel.create({ ...dto });
  }

  edit(id: string, dto: EditTodoDto) {
    return this.noteModel.update({ ...dto }, { where: { id } });
  }

  getAll(): Promise<Note[]> {
    return this.noteModel.findAll({});
  }

  getOne(id: string): Promise<Note> {
    return this.noteModel.findOne({
      where: {
        id,
      },
    });
  }

  delete(id: string) {
    return this.noteModel.destroy({ where: { id } });
  }

  async getData() {
    // TODO: rewrite logic using queries
    const notes = await this.getAll();

    const ideaData = getDataByCategory(Category.IDEA, notes);
    const thoughtData = getDataByCategory(Category.THOUGHT, notes);
    const taskData = getDataByCategory(Category.TASK, notes);

    return {
      idea: {
        ...ideaData,
      },
      thought: {
        ...thoughtData,
      },
      task: {
        ...taskData,
      },
    };
  }
}
