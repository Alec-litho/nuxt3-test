<script setup lang="ts">
const authStore = useAuthStore()
const dataStore = useDataStore()

const selectedCategories = ref<string[]>([])

onMounted(() => {
  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})

const handleLogout = () => {
  authStore.logout()
  navigateTo('/login')
}
</script>

<template>
  <div class="account-container">
    <header>
      <h1>Личный кабинет</h1>
      <button @click="handleLogout">Выход</button>
    </header>

    <div class="filters">
        <FiltersComponent/>

    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>Название</th>
          <th>Статус</th>
          <th>Дата создания</th>
          <th>Цена</th>
          <th>Бренд</th>
          <th>Рейтинг</th>
          <th>Кол-во</th>
          <th>Дата создания</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in dataStore.filteredProducts" :key="product.id">
          <td>{{ product.name }}</td>
          <td :class="product.status">{{ product.status }}</td>
          <td>{{ product.date_created }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.brand }}</td>
          <td>{{ product.rating }}</td>
          <td>{{ product.stock }}</td>
          <td>{{ product.category }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss">
.account-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
  }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    
    th, td {
      padding: 1rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    tr:hover {
      background-color: #f5f5f5;
    }

    .active {
      color: green;
    }

    .inactive {
      color: #dc3545;
    }
  }

  .filters {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;

    .filter-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style>