import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Student {
  id: number;
  name: string;
  age: number;
  photo: string;
}

@Component({
  selector: 'app-students-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './students-list.component.html',
  styleUrl: './students-list.component.scss'
})
export class StudentsListComponent {
  protected readonly allStudents = signal<Student[]>([
    { id: 1, name: 'Ana Silva', age: 18, photo: 'https://i.pravatar.cc/150?img=1' },
    { id: 2, name: 'Bruno Costa', age: 20, photo: 'https://i.pravatar.cc/150?img=2' },
    { id: 3, name: 'Carlos Mendes', age: 19, photo: 'https://i.pravatar.cc/150?img=3' },
    { id: 4, name: 'Diana Santos', age: 21, photo: 'https://i.pravatar.cc/150?img=4' },
    { id: 5, name: 'Eduardo Lima', age: 17, photo: 'https://i.pravatar.cc/150?img=5' },
    { id: 6, name: 'Fernanda Oliveira', age: 22, photo: 'https://i.pravatar.cc/150?img=6' },
    { id: 7, name: 'Gabriel Rocha', age: 18, photo: 'https://i.pravatar.cc/150?img=7' },
    { id: 8, name: 'Helena Alves', age: 20, photo: 'https://i.pravatar.cc/150?img=8' },
    { id: 9, name: 'Igor Ferreira', age: 19, photo: 'https://i.pravatar.cc/150?img=9' },
    { id: 10, name: 'Juliana Souza', age: 21, photo: 'https://i.pravatar.cc/150?img=10' },
    { id: 11, name: 'Kleber Martins', age: 18, photo: 'https://i.pravatar.cc/150?img=11' },
    { id: 12, name: 'Larissa Ribeiro', age: 22, photo: 'https://i.pravatar.cc/150?img=12' }
  ]);

  protected searchTerm = signal<string>('');
  protected sortBy = signal<'name' | 'age'>('name');
  protected sortDirection = signal<'asc' | 'desc'>('asc');

  protected readonly students = computed(() => {
    let result = [...this.allStudents()];

    // Filtrar por termo de pesquisa
    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      result = result.filter(student =>
        student.name.toLowerCase().includes(term)
      );
    }

    // Ordenar
    const sortBy = this.sortBy();
    const direction = this.sortDirection();

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else {
        comparison = a.age - b.age;
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return result;
  });

  protected onSearchChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  protected sortByName(): void {
    if (this.sortBy() === 'name') {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set('name');
      this.sortDirection.set('asc');
    }
  }

  protected sortByAge(): void {
    if (this.sortBy() === 'age') {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set('age');
      this.sortDirection.set('asc');
    }
  }

  protected getSortIcon(field: 'name' | 'age'): string {
    if (this.sortBy() !== field) return '⇅';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }
}
