import * as fs from 'fs';
import * as path from 'path';
import { Todo } from './types';
import { isTodoArray } from './utils';

// TODO: Definisikan path file untuk menyimpan data To-Do

const DATA_DIR = path.join(__dirname, '../data');
const FILE_PATH = path.join(DATA_DIR, 'todos.json');

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

export function readTodos(): Todo[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
      return [];
    }

    const data = fs.readFileSync(FILE_PATH, 'utf-8');
    const parsed = JSON.parse(data);

    if (isTodoArray(parsed)) {
      return parsed;
    } else {
      console.log('\n[Warning] Format data JSON tidak valid. Mengosongkan daftar.');
      return [];
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`\n[Error] Gagal membaca data: ${message}`);
    return [];
  }
}

// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)

export function writeTodos(todos: Todo[]): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(FILE_PATH, JSON.stringify(todos, null, 2), 'utf-8');
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error(`\n[Error] Gagal menyimpan data: ${message}`);
  }
}