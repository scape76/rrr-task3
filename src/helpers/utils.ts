import { Category, Note } from 'src/types/notes';

export const getCreatedTimeToString = (date: Date): string => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
};

export function getNotesByCategory(category: Category, notes: Note[]) {
  return notes.filter((note) => note.category === category);
}

export function countArchivedNotes(notes: Note[]) {
  return notes.reduce(
    (count, note) => (note.isArchived ? count + 1 : count),
    0,
  );
}

export function getDataByCategory(
  category: Category,
  notes: Note[],
): { total: number; archived: number; active: number } {
  const categoryNotes = getNotesByCategory(category, notes);
  const archivedNotes = countArchivedNotes(categoryNotes);
  const activeNotes = categoryNotes.length - archivedNotes;

  return {
    total: categoryNotes.length,
    archived: archivedNotes,
    active: activeNotes,
  };
}
