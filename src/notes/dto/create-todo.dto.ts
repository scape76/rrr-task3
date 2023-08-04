import {
  IsString,
  MinLength,
  MaxLength,
  IsEnum,
  IsOptional,
  IsNotEmpty,
  IsBoolean,
} from 'class-validator';
import { Category } from 'src/types/notes';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'name is too short',
  })
  @MaxLength(63, {
    message: 'name is too long',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3, {
    message: 'content is too short',
  })
  @MaxLength(255, {
    message: 'content is too long',
  })
  content: string;

  @IsEnum(Category)
  @IsNotEmpty()
  category: Category;

  @IsBoolean()
  @IsOptional()
  isArchived: boolean;
}
