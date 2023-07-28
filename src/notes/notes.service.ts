import { Injectable } from '@nestjs/common';
import { CreateTodoDto, EditTodoDto } from './dto';
import { v4 as uuidv4 } from 'uuid';
import { Category, Note } from 'src/types/notes';
import {
  countArchivedNotes,
  getNotesByCategory,
  getDataByCategory,
} from 'src/helpers/utils';

let notes: Note[] = [
  {
    id: uuidv4(),
    category: Category.TASK,
    content: 'tomatoes, bread 3/9/2021',
    createdAt: new Date(),
    name: 'Shopping list',
    isArchived: false,
  },
  {
    id: uuidv4(),
    category: Category.THOUGHT,
    content: 'build a house 21/01/2022',
    createdAt: new Date(),
    name: 'idk',
    isArchived: false,
  },
  {
    id: uuidv4(),
    category: Category.THOUGHT,
    content: 'build a house 23/09/2022 24/10/2022',
    createdAt: new Date(),
    name: 'idk',
    isArchived: false,
  },
  {
    id: uuidv4(),
    category: Category.IDEA,
    content: 'plant a tree',
    createdAt: new Date(),
    name: '3',
    isArchived: false,
  },
  {
    id: uuidv4(),
    category: Category.THOUGHT,
    content: 'build a house 09/23/2022 10/24/2022',
    createdAt: new Date(),
    name: 'idk',
    isArchived: false,
  },
  {
    id: uuidv4(),
    category: Category.THOUGHT,
    content: 'build a house',
    createdAt: new Date(),
    name: 'idk',
    isArchived: true,
  },
  {
    id: uuidv4(),
    category: Category.IDEA,
    content: 'run',
    createdAt: new Date(),
    name: 'idk',
    isArchived: true,
  },
];

@Injectable()
export class NotesService {
  create(dto: CreateTodoDto) {
    notes = [
      { id: uuidv4(), isArchived: false, createdAt: new Date(), ...dto },
      ...notes,
    ];
    return notes;
  }

  edit(id: string, dto: EditTodoDto) {
    notes = notes.map((note) => {
      return note.id === id ? { ...note, ...dto } : note;
    });
    return notes;
  }

  getAll() {
    return notes.map((note) => note);
  }

  getOne(id: string) {
    return notes.find((note) => note.id === id);
  }

  delete(id: string) {
    notes = notes.filter((note) => note.id !== id);
    return notes;
  }

  getData() {
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
