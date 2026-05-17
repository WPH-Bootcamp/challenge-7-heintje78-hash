// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

import { Todo } from './types';

// TODO: Import fungsi storage untuk baca/tulis file

import { readTodos, writeTodos } from './storage';

// Import fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

import { formatDate } from './utils';

export class TodoService {
  private todos: Todo[];

  constructor() {
    this.todos = readTodos();
  }

// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

addTodo(task: string): void {
    const newTodo: Todo = {
      id: Date.now().toString(),
      task,
      isCompleted: false,
    };
    this.todos.push(newTodo);
    writeTodos(this.todos);
    console.log(`\nBerhasil menambahkan: "${task}"`);
  }

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

completeTodoByIndex(index: number): boolean {
    if (index >= 0 && index < this.todos.length) {
      this.todos[index].isCompleted = true;
      writeTodos(this.todos);
      return true;
    }
    return false;
  }

// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

getTodoByIndex(index: number): Todo | undefined {
    if (index >= 0 && index < this.todos.length) {
      return this.todos[index];
    }
    return undefined;
  }

deleteTodoByIndex(index: number): boolean {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
      writeTodos(this.todos);
      return true;
    }
    return false;
  }

// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih
 

listTodos(): void {
    if (this.todos.length === 0) {
      console.log('Belum ada data To-Do. Silakan tambahkan tugas baru!');
      return;
    }

    this.todos.forEach((todo, index) => {
      const status = todo.isCompleted ? '[DONE]  ' : '[ACTIVE]';
      const timeInfo = formatDate(todo.id);
      
      console.log(`${status} ${index + 1}. ${todo.task} (${timeInfo})`);
    });
  }

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword

searchTodos(keyword: string): void {
    const matches = this.todos
      .map((todo, originalIndex) => ({ todo, originalIndex }))
      .filter((item) => 
        item.todo.task.toLowerCase().includes(keyword.toLowerCase())
      );

    if (matches.length === 0) {
      console.log(`\nTidak ada To-Do yang cocok dengan kata kunci: "${keyword}"`);
      return;
    }

    console.log(`\nHasil pencarian untuk kata kunci "${keyword}":`);
    matches.forEach((item) => {
      const status = item.todo.isCompleted ? '[DONE]  ' : '[ACTIVE]';
      const timeInfo = formatDate(item.todo.id);

      console.log(`${status} ${item.originalIndex + 1}. ${item.todo.task} (${timeInfo})`);
    });
  }
}
