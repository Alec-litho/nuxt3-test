<script setup lang="ts">
const dataStore = useDataStore();

const resetFilters = () => {
  dataStore.filters = {
    categories: [],
    brands: [],
    minPrice: null,
    maxPrice: null,
    status: null,
    minRating: null,
  };

};
</script>

<template>
  <div class="filters-container">
    <div class="filters-body">
      <div class="filter-group">
        <label>Категории:</label>
        <select v-model="dataStore.filters.categories"  class="filter-select">
          <option v-for="category in dataStore.getAllCategories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Бренды:</label>
        <select v-model="dataStore.filters.brands"  class="filter-select">
          <option v-for="brand in dataStore.getAllBrands" :key="brand" :value="brand">
            {{ brand }}
          </option>
        </select>
      </div>

      <div class="filter-group">
        <label>Цена:</label>
        <div class="price-range">
          <input type="number" v-model="dataStore.filters.minPrice" placeholder="Мин" class="price-input" />
          <span>-</span>
          <input type="number" v-model="dataStore.filters.maxPrice" placeholder="Макс" class="price-input" />
        </div>
      </div>

      <div class="filter-group">
        <label>Статус:</label>
        <select v-model="dataStore.filters.status" class="filter-select">
          <option :value="null">Все</option>
          <option value="active">Активные</option>
          <option value="inactive">Неактивные</option>
        </select>
      </div>

      <div class="filter-group">
        <label>Рейтинг от:</label>
        <input type="number" min="0" max="5" step="0.1" v-model="dataStore.filters.minRating" class="rating-input" />
      </div>
    </div>
    <div class="filters-control">
      <button @click="resetFilters" class="reset-button">Сбросить фильтры</button>
    </div>
  </div>
</template>

<style lang="scss">
.filters-container {
     width: 100%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  .filters-body {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 20px;

    .filter-group {
        width: 25%;
        height: 70px;

      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      label {
        font-weight: 600;
        color: $primary-color;
      }
      input {
        width: 100%;
      }
    }

    .filter-select {
        width: 100%;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: white;

      option {
        padding: 0.3rem;
      }
    }

    .price-range {
        width: 100%;
      display: flex;
      gap: 0.5rem;
      align-items: center;

      .price-input {
        width: 80px;
        padding: 0.5rem;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }

    .rating-input {
      width: 100px;
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .reset-button {
      align-self: flex-end;
      background: #dc3545;
      color: white;
      border: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover {
        background: darken(#dc3545, 10%);
      }
    }
  }
}

@media (max-width: 768px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
}
</style>
