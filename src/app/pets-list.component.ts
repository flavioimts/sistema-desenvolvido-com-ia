import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Pet {
  id: number;
  name: string;
  breed: string;
  color: string;
  size: string;
  age: number;
  photo: string;
}

@Component({
  selector: 'app-pets-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pets-list.component.html',
  styleUrl: './pets-list.component.scss'
})
export class PetsListComponent {
  protected readonly allPets = signal<Pet[]>([
    { id: 1, name: 'Rex', breed: 'Labrador', color: 'Amarelo', size: 'Grande', age: 3, photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=300&h=300&fit=crop' },
    { id: 2, name: 'Mia', breed: 'Siamês', color: 'Bege', size: 'Pequeno', age: 2, photo: 'https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=300&h=300&fit=crop' },
    { id: 3, name: 'Thor', breed: 'Pastor Alemão', color: 'Preto e Marrom', size: 'Grande', age: 4, photo: 'https://images.unsplash.com/photo-1568572933382-74d440642117?w=300&h=300&fit=crop' },
    { id: 4, name: 'Luna', breed: 'Persa', color: 'Branco', size: 'Pequeno', age: 1, photo: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&h=300&fit=crop' },
    { id: 5, name: 'Max', breed: 'Golden Retriever', color: 'Dourado', size: 'Grande', age: 5, photo: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300&h=300&fit=crop' },
    { id: 6, name: 'Bella', breed: 'Beagle', color: 'Tricolor', size: 'Médio', age: 2, photo: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=300&h=300&fit=crop' },
    { id: 7, name: 'Simba', breed: 'Maine Coon', color: 'Laranja', size: 'Médio', age: 3, photo: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop' },
    { id: 8, name: 'Nina', breed: 'Poodle', color: 'Branco', size: 'Pequeno', age: 4, photo: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=300&h=300&fit=crop' },
    { id: 9, name: 'Zeus', breed: 'Rottweiler', color: 'Preto', size: 'Grande', age: 6, photo: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=300&h=300&fit=crop' },
    { id: 10, name: 'Mel', breed: 'Shih Tzu', color: 'Marrom e Branco', size: 'Pequeno', age: 3, photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=300&fit=crop' },
    { id: 11, name: 'Bidu', breed: 'Vira-lata', color: 'Caramelo', size: 'Médio', age: 2, photo: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=300&h=300&fit=crop' },
    { id: 12, name: 'Mimi', breed: 'Angorá', color: 'Cinza', size: 'Pequeno', age: 1, photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=300&h=300&fit=crop' }
  ]);

  protected searchTerm = signal<string>('');
  protected sortBy = signal<'name' | 'age' | 'breed'>('name');
  protected sortDirection = signal<'asc' | 'desc'>('asc');

  protected readonly pets = computed(() => {
    let result = [...this.allPets()];

    const term = this.searchTerm().toLowerCase().trim();
    if (term) {
      result = result.filter(pet =>
        pet.name.toLowerCase().includes(term) ||
        pet.breed.toLowerCase().includes(term)
      );
    }

    const sortBy = this.sortBy();
    const direction = this.sortDirection();

    result.sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'breed') {
        comparison = a.breed.localeCompare(b.breed);
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

  protected sortByBreed(): void {
    if (this.sortBy() === 'breed') {
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set('breed');
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

  protected getSortIcon(field: 'name' | 'age' | 'breed'): string {
    if (this.sortBy() !== field) return '⇅';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }
}
