import { defineStore } from "pinia";
import products from "../products.json";

interface Product {
  id: number;
  name: string;
  status: string;
  date_created: string;
  price: number;
  category: string;
  stock: number;
  brand: string;
  rating: number;
}

interface DataState {
  products: Product[];
  filters: {
    categories: string[];
    brands: string[];
    minPrice: number | null;
    maxPrice: number | null;
    status: string | null;
    minRating: number | null;
  };
}

export const useDataStore = defineStore("data", {
  state: (): DataState => ({
    products: [...products],
    filters: {
      categories: [],
      brands:[],
      minPrice: null,
      maxPrice: null,
      status: null,
      minRating: null,
    },
  }),
  getters: {
    filteredProducts(state): Product[] {
      return state.products.filter((product) => {
        const categoryMatch = state.filters.categories.length === 0 || state.filters.categories.includes(product.category);

        const brandMatch = state.filters.brands.length === 0 || state.filters.brands.includes(product.brand);

        const priceMatch = (!state.filters.minPrice || product.price >= state.filters.minPrice) && (!state.filters.maxPrice || product.price <= state.filters.maxPrice);

        const statusMatch = !state.filters.status || product.status === state.filters.status;

        const ratingMatch = !state.filters.minRating || product.rating >= state.filters.minRating;
        return categoryMatch && brandMatch && priceMatch && statusMatch && ratingMatch;
      });
    },
    getAllCategories(state) {
        return new Set(state.products.map(product => product.category))
    },
    getAllBrands(state) {
        return new Set(state.products.map(product => product.brand))
    }
  },
  actions: {
    updateCategoryFilter(categories: string[]) {
      this.filters.categories = categories;
    },
  },
});
