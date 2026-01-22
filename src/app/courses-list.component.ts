import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Course {
  id: number;
  name: string;
  instructor: string;
  duration: string;
  level: string;
  price: string;
}

@Component({
  selector: 'app-courses-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './courses-list.component.html',
  styleUrl: './courses-list.component.scss'
})
export class CoursesListComponent {
  protected readonly courses = signal<Course[]>([
    { id: 1, name: 'Angular Fundamentals', instructor: 'João Silva', duration: '40h', level: 'Iniciante', price: 'R$ 299,00' },
    { id: 2, name: 'TypeScript Avançado', instructor: 'Maria Santos', duration: '30h', level: 'Avançado', price: 'R$ 349,00' },
    { id: 3, name: 'React para Iniciantes', instructor: 'Pedro Oliveira', duration: '35h', level: 'Iniciante', price: 'R$ 279,00' },
    { id: 4, name: 'Node.js e Express', instructor: 'Ana Costa', duration: '45h', level: 'Intermediário', price: 'R$ 399,00' },
    { id: 5, name: 'MongoDB Essencial', instructor: 'Carlos Mendes', duration: '25h', level: 'Intermediário', price: 'R$ 259,00' },
    { id: 6, name: 'Vue.js Completo', instructor: 'Fernanda Lima', duration: '38h', level: 'Iniciante', price: 'R$ 289,00' },
    { id: 7, name: 'Docker e Kubernetes', instructor: 'Roberto Alves', duration: '50h', level: 'Avançado', price: 'R$ 449,00' },
    { id: 8, name: 'Python para Data Science', instructor: 'Juliana Rocha', duration: '55h', level: 'Intermediário', price: 'R$ 399,00' },
    { id: 9, name: 'DevOps na Prática', instructor: 'Marcos Ferreira', duration: '60h', level: 'Avançado', price: 'R$ 499,00' },
    { id: 10, name: 'Git e GitHub', instructor: 'Beatriz Souza', duration: '20h', level: 'Iniciante', price: 'R$ 199,00' }
  ]);
}
