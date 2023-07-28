export type Note = {
  id: string;
  category: Category;
  content: string;
  createdAt: Date;
  name: string;
  isArchived: boolean;
};

export enum Category {
  IDEA = 'idea',
  THOUGHT = 'thought',
  TASK = 'task',
}
