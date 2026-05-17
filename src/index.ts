// TODO: Import readline untuk membaca input dari command line

import * as readline from 'readline';

// TODO: Import fungsi-fungsi dari todoService

import { TodoService } from './todoService';

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)

const todoService = new TodoService();
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:
// 1. Add new todo
// 2. Mark todo as complete
// 3. Delete todo
// 4. List all todos
// 5. Search todos
// 6. Exit

function showMenu(): void {
  console.log('\n=== To-Do App ===');
  console.log('1. Lihat To-Do');
  console.log('2. Tambah To-Do');
  console.log('3. Selesaikan To-Do');
  console.log('4. Hapus To-Do');
  console.log('5. Cari To-Do');
  console.log('6. Keluar');
  rl.question('Pilih menu (1-6): ', handleMenuInput);
}

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input

function handleMenuInput(input: string): void {
  switch (input.trim()) {
    case '1':
      console.log('\n--- Daftar To-Do ---');
      todoService.listTodos();
      showMenu();
      break;

    case '2':
      rl.question('\nMasukkan tugas baru: ', (task) => {
        if (!task.trim()) {
          console.log('[Error] Deskripsi tugas tidak boleh kosong!');
        } else {
          todoService.addTodo(task.trim());
        }
        showMenu();
      });
      break;

    case '3':
      console.log('\n--- Daftar Tugas yang Tersedia ---');
      todoService.listTodos();
      rl.question('\nMasukkan Nomor Urut To-Do yang selesai: ', (numStr) => {
        const targetIndex = parseInt(numStr.trim()) - 1; 
        if (isNaN(targetIndex)) {
          console.log('[Error] Input harus berupa angka nomor urut!');
        } else {
          const isSuccess = todoService.completeTodoByIndex(targetIndex);
          if (isSuccess) {
            console.log('To-Do berhasil diperbarui menjadi selesai!');
          } else {
            console.log('[Error] Nomor urut To-Do tidak ditemukan.');
          }
        }
        showMenu();
      });
      break;

    case '4':
      console.log('\n--- Daftar Tugas yang Tersedia ---');
      todoService.listTodos();
      rl.question('\nMasukkan Nomor Urut To-Do yang ingin dihapus: ', (numStr) => {
        const targetIndex = parseInt(numStr.trim()) - 1; 
        if (isNaN(targetIndex)) {
          console.log('[Error] Input harus berupa angka nomor urut!');
          showMenu();
        } else {
          const todo = todoService.getTodoByIndex(targetIndex);

          if (!todo) {
            console.log('[Error] Nomor urut To-Do tidak ditemukan.');
            showMenu();
          } else {
            rl.question(`Apakah yakin ingin menghapus "${todo.task}"? (y/n): `, (confirm) => {
              const answer = confirm.trim().toLowerCase();
              
              if (answer === 'y' || answer === 'yes') {
                const isSuccess = todoService.deleteTodoByIndex(targetIndex);
                if (isSuccess) {
                  console.log('To-Do berhasil dihapus dari daftar!');
                } else {
                  console.log('[Error] Gagal menghapus To-Do.');
                }
              } else {
                console.log('Penghapusan dibatalkan.');
              }
              showMenu();
            });
          }
        }
      });
      break;

    case '5':
      rl.question('\nMasukkan kata kunci pencarian: ', (keyword) => {
        if (!keyword.trim()) {
          console.log('[Error] Kata kunci tidak boleh kosong!');
        } else {
          todoService.searchTodos(keyword.trim());
        }
        showMenu();
      });
      break;

    case '6':
      console.log(
        '\nTerima kasih telah menggunakan aplikasi ini. Sampai jumpa!'
      );
      rl.close();
      break;

    default:
      console.log('[Error] Pilihan menu tidak valid. Pilih angka 1 sampai 6.');
      showMenu();
      break;
  }
}

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop

// TODO: Jalankan fungsi main

console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');

showMenu();
