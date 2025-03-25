import { defineStore } from "pinia";

interface AuthState {
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    isAuthenticated: false,
  }),

  actions: {
    initializeAuth() {
      const authCookie = useCookie("authToken");
      this.isAuthenticated = !!authCookie.value;
    },

    login(email: string, password: string): boolean {
      if (email === "admin@example.com" && password === "admin123") {
        const authCookie = useCookie("authToken", {
          maxAge: 60 * 60 * 24, // 1 день
          secure: true,
          sameSite: "strict",
        });

        authCookie.value = "authenticated";
        this.isAuthenticated = true;
        return true;
      }
      return false;
    },

    logout() {
      const authCookie = useCookie("authToken");
      authCookie.value = null;
      this.isAuthenticated = false;
    },
  },
});
