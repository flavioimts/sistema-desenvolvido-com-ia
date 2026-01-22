import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ShirtProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  image: string;
  popularity: number;
}

@Component({
  selector: 'app-shop-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop-list.component.html',
  styleUrls: ['./shop-list.component.scss']
})
export class ShopListComponent {
  searchTerm = signal('');
  sortBy = signal<'name' | 'price' | 'popularity'>('name');
  sortDirection = signal<'asc' | 'desc'>('asc');
  selectedSize = signal<string>('all');
  selectedColor = signal<string>('all');
  selectedPriceRange = signal<string>('all');

  products = signal<ShirtProduct[]>([
    {
      id: 1,
      name: 'Camisa Básica Preta',
      description: 'Camisa 100% algodão, ideal para o dia a dia',
      price: 49.90,
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto', 'Branco'],
      image: 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Camisa+Preta',
      popularity: 95
    },
    {
      id: 2,
      name: 'Camisa Polo Azul',
      description: 'Polo elegante com acabamento premium',
      price: 89.90,
      sizes: ['P', 'M', 'G'],
      colors: ['Azul', 'Cinza'],
      image: 'https://via.placeholder.com/300x400/0066CC/FFFFFF?text=Polo+Azul',
      popularity: 88
    },
    {
      id: 3,
      name: 'Camisa Estampada Floral',
      description: 'Estampa moderna e descontraída',
      price: 69.90,
      sizes: ['M', 'G', 'GG'],
      colors: ['Rosa', 'Verde', 'Azul'],
      image: 'https://via.placeholder.com/300x400/FF69B4/FFFFFF?text=Floral',
      popularity: 75
    },
    {
      id: 4,
      name: 'Camisa Social Branca',
      description: 'Camisa social de alta qualidade',
      price: 129.90,
      sizes: ['P', 'M', 'G', 'GG', 'XG'],
      colors: ['Branco', 'Azul Claro'],
      image: 'https://via.placeholder.com/300x400/FFFFFF/000000?text=Social+Branca',
      popularity: 92
    },
    {
      id: 5,
      name: 'Camisa Listrada Marinheiro',
      description: 'Estilo náutico clássico',
      price: 59.90,
      sizes: ['P', 'M', 'G'],
      colors: ['Azul/Branco', 'Vermelho/Branco'],
      image: 'https://via.placeholder.com/300x400/000080/FFFFFF?text=Listrada',
      popularity: 70
    },
    {
      id: 6,
      name: 'Camisa Oversized Cinza',
      description: 'Modelagem moderna e confortável',
      price: 79.90,
      sizes: ['M', 'G', 'GG'],
      colors: ['Cinza', 'Preto', 'Bege'],
      image: 'https://via.placeholder.com/300x400/808080/FFFFFF?text=Oversized',
      popularity: 82
    },
    {
      id: 7,
      name: 'Camisa Vintage Rock',
      description: 'Estampa de banda com efeito envelhecido',
      price: 99.90,
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Preto', 'Cinza Escuro'],
      image: 'https://via.placeholder.com/300x400/2C2C2C/FFFFFF?text=Vintage+Rock',
      popularity: 85
    },
    {
      id: 8,
      name: 'Camisa Tie-Dye Colorida',
      description: 'Cores vibrantes em padrão tie-dye',
      price: 54.90,
      sizes: ['M', 'G', 'GG'],
      colors: ['Multicolor'],
      image: 'https://via.placeholder.com/300x400/FF1493/FFFFFF?text=Tie-Dye',
      popularity: 68
    },
    {
      id: 9,
      name: 'Camisa Henley Vinho',
      description: 'Modelo henley com botões',
      price: 74.90,
      sizes: ['P', 'M', 'G', 'GG'],
      colors: ['Vinho', 'Verde Musgo', 'Azul Marinho'],
      image: 'https://via.placeholder.com/300x400/800020/FFFFFF?text=Henley',
      popularity: 78
    },
    {
      id: 10,
      name: 'Camisa Longline Preta',
      description: 'Comprimento alongado, estilo urbano',
      price: 84.90,
      sizes: ['M', 'G', 'GG'],
      colors: ['Preto', 'Branco', 'Cinza'],
      image: 'https://via.placeholder.com/300x400/000000/FFFFFF?text=Longline',
      popularity: 80
    },
    {
      id: 11,
      name: 'Camisa Gola Redonda Básica',
      description: 'Essencial no guarda-roupa',
      price: 39.90,
      sizes: ['P', 'M', 'G', 'GG', 'XG'],
      colors: ['Branco', 'Preto', 'Cinza', 'Azul', 'Verde'],
      image: 'https://via.placeholder.com/300x400/4169E1/FFFFFF?text=Basica',
      popularity: 98
    },
    {
      id: 12,
      name: 'Camisa Premium Linho',
      description: 'Linho natural, ideal para o verão',
      price: 149.90,
      sizes: ['M', 'G', 'GG'],
      colors: ['Bege', 'Branco', 'Azul Claro'],
      image: 'https://via.placeholder.com/300x400/F5DEB3/000000?text=Linho+Premium',
      popularity: 72
    }
  ]);

  availableSizes = computed(() => {
    const sizesSet = new Set<string>();
    this.products().forEach(product => {
      product.sizes.forEach(size => sizesSet.add(size));
    });
    return Array.from(sizesSet).sort();
  });

  availableColors = computed(() => {
    const colorsSet = new Set<string>();
    this.products().forEach(product => {
      product.colors.forEach(color => colorsSet.add(color));
    });
    return Array.from(colorsSet).sort();
  });

  filteredAndSortedProducts = computed(() => {
    let result = this.products();

    // Filtro por busca
    const search = this.searchTerm().toLowerCase();
    if (search) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
      );
    }

    // Filtro por tamanho
    if (this.selectedSize() !== 'all') {
      result = result.filter(product =>
        product.sizes.includes(this.selectedSize())
      );
    }

    // Filtro por cor
    if (this.selectedColor() !== 'all') {
      result = result.filter(product =>
        product.colors.some(color => color.includes(this.selectedColor()))
      );
    }

    // Filtro por faixa de preço
    const priceRange = this.selectedPriceRange();
    if (priceRange !== 'all') {
      result = result.filter(product => {
        if (priceRange === 'low') return product.price < 60;
        if (priceRange === 'medium') return product.price >= 60 && product.price < 100;
        if (priceRange === 'high') return product.price >= 100;
        return true;
      });
    }

    // Ordenação
    const sortBy = this.sortBy();
    const direction = this.sortDirection();

    result = [...result].sort((a, b) => {
      let comparison = 0;

      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'popularity') {
        comparison = a.popularity - b.popularity;
      }

      return direction === 'asc' ? comparison : -comparison;
    });

    return result;
  });

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }

  onSortChange(sortBy: 'name' | 'price' | 'popularity') {
    if (this.sortBy() === sortBy) {
      // Toggle direction se já estiver ordenando por este campo
      this.sortDirection.set(this.sortDirection() === 'asc' ? 'desc' : 'asc');
    } else {
      this.sortBy.set(sortBy);
      this.sortDirection.set('asc');
    }
  }

  onSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedSize.set(target.value);
  }

  onColorChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedColor.set(target.value);
  }

  onPriceRangeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedPriceRange.set(target.value);
  }

  clearFilters() {
    this.searchTerm.set('');
    this.selectedSize.set('all');
    this.selectedColor.set('all');
    this.selectedPriceRange.set('all');
    this.sortBy.set('name');
    this.sortDirection.set('asc');
  }

  getSortIcon(sortType: 'name' | 'price' | 'popularity'): string {
    if (this.sortBy() !== sortType) return '⇅';
    return this.sortDirection() === 'asc' ? '↑' : '↓';
  }
}
