import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto, EditTodoDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { Category } from 'src/types/notes';
import { getDataByCategory } from 'src/helpers/utils';
import { Note } from './note.model';

// let notes: Note[] = [
//   {
//     id: uuidv4(),
//     category: Category.TASK,
//     content: 'tomatoes, bread 3/9/2021',
//     createdAt: new Date(),
//     name: 'Shopping list',
//     isArchived: false,
//   },
//   {
//     id: uuidv4(),
//     category: Category.THOUGHT,
//     content: 'build a house 21/01/2022',
//     createdAt: new Date(),
//     name: 'idk',
//     isArchived: false,
//   },
//   {
//     id: uuidv4(),
//     category: Category.THOUGHT,
//     content: 'build a house 23/09/2022 24/10/2022',
//     createdAt: new Date(),
//     name: 'idk',
//     isArchived: false,
//   },
//   {
//     id: uuidv4(),
//     category: Category.IDEA,
//     content: 'plant a tree',
//     createdAt: new Date(),
//     name: '3',
//     isArchived: false,
//   },
//   {
//     id: uuidv4(),
//     category: Category.THOUGHT,
//     content: 'build a house 09/23/2022 10/24/2022',
//     createdAt: new Date(),
//     name: 'idk',
//     isArchived: false,
//   },
//   {
//     id: uuidv4(),
//     category: Category.THOUGHT,
//     content: 'build a house',
//     createdAt: new Date(),
//     name: 'idk',
//     isArchived: true,
//   },
//   {
//     id: uuidv4(),
//     category: Category.IDEA,
//     content: 'run',
//     createdAt: new Date(),
//     name: 'idk',
//     isArchived: true,
//   },
// ];

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
