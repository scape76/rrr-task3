import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  AutoIncrement,
} from 'sequelize-typescript';
import { Category } from 'src/types/notes';

@Table({ tableName: 'notes' })
export class Note extends Model {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  content: string;

  @Column({ type: DataType.ENUM(...Object.values(Category)), allowNull: false })
  category: Category;

  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  isArchived: boolean;
}
