import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { Category } from 'src/types/notes';

export class EditTodoDto {
  @MinLength(3, {
    message: 'name is too short',
  })
  @MaxLength(63, {
    message: 'name is too long',
  })
  @IsString()
  name: string;

  @MinLength(3, {
    message: 'content is too short',
  })
  @MaxLength(255, {
    message: 'content is too long',
  })
  @IsString()
  content: string;

  @IsEnum(Category)
  category: Category;

  @IsOptional()
  @IsBoolean()
  isArchived?: boolean;
}
