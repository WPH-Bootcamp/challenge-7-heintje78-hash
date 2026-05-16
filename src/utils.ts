// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

import { Todo } from './types';

export function isTodo(obj: unknown): obj is Todo {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const candidate = obj as Record<string, unknown>;

  return (
    typeof candidate.id === 'string' &&
    typeof candidate.task === 'string' &&
    typeof candidate.isCompleted === 'boolean'
  );
}

export function isTodoArray(obj: unknown): obj is Todo[] {
  return Array.isArray(obj) && obj.every(isTodo);
}