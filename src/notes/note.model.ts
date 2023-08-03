import {
  Column,
  Model,
  Table,
  PrimaryKey,
  DataType,
} from 'sequelize-typescript';
import { v4 as uuidv4 } from 'uuid';

enum Category {
  IDEA = 'idea',
  THOUGHT = 'thought',
  TASK = 'task',
}

@Table
export class Note extends Model {
  @PrimaryKey
  @Column({ defaultValue: uuidv4() })
  id: string;

  @Column
  name: string;

  @Column
  content: string;

  @Column({
    type: DataType.ENUM(...Object.values(Category)),
  })
  category: Category;

  @Column({ defaultValue: new Date() })
  createdAt: Date;

  @Column({ defaultValue: false })
  isArchived: boolean;
}
