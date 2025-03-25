<script setup lang="ts">
const email = ref("");
const password = ref("");
const error = ref(false);
const authStore = useAuthStore();

const handleLogin = () => {
  if (authStore.login(email.value, password.value)) {
    return navigateTo("/account");
  }
  error.value = true;
};
</script>

<template>
  <div class="login-container">
    <form @submit.prevent="handleLogin" class="form">
      <h1>Авторизация</h1>
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Пароль</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Войти</button>
      <div v-if="error" class="error-message">Неверные данные авторизации</div>
    </form>
  </div>
</template>

<style lang="scss">
.login-container {

  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  .form {
    display: flex;
  flex-direction: column;
  gap: 20px;
    .form-group {
      display: flex;
      flex-direction: column;
    }
    .error-message {
      color: #dc3545;
      margin-top: 1rem;
    }

    button {
      background: $primary-color;
      color: white;
      padding: 0.5rem 1rem;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  }
}
</style>
