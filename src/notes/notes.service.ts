import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateTodoDto, EditTodoDto } from './dto';
import { Note } from './note.model';
import { Category } from 'src/types/notes';
import { NoteNotFoundException } from './exceptions/noteNotFound.exception';

@Injectable()
export class NotesService {
  constructor(@InjectModel(Note) private noteModel: typeof Note) {}

  create(dto: CreateTodoDto) {
    return this.noteModel.create({ ...dto });
  }

  async edit(id: string, dto: EditTodoDto) {
    const note = await this.getOne(id);

    if (!note) {
      throw new NoteNotFoundException(id);
    }

    return note.update({ ...dto });
  }

  getAll(): Promise<Note[]> {
    return this.noteModel.findAll({
      order: [['createdAt', 'DESC']],
    });
  }

  getOne(id: string): Promise<Note> {
    return this.noteModel.findOne({
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const note = await this.getOne(id);

    if (!note) {
      throw new NoteNotFoundException(id);
    }

    return note.destroy();
  }

  async getData() {
    const categories = Object.values(Category);
    const categoryStats = {};

    for (const category of categories) {
      const stats = await this.noteModel.findAll({
        attributes: [
          [
            this.noteModel.sequelize.fn(
              'SUM',
              this.noteModel.sequelize.literal(
                `CASE WHEN "category" = '${category}' AND "isArchived" = true THEN 1 ELSE 0 END`,
              ),
            ),
            'archived',
          ],
          [
            this.noteModel.sequelize.fn(
              'SUM',
              this.noteModel.sequelize.literal(
                `CASE WHEN "category" = '${category}' AND "isArchived" = false THEN 1 ELSE 0 END`,
              ),
            ),
            'active',
          ],
        ],
        raw: true,
      });

      categoryStats[category] = {
        archived: stats[0]['archived'] || 0,
        active: stats[0]['active'] || 0,
      };
    }

    return categoryStats;
  }
}
