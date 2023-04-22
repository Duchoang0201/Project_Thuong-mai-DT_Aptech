import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import axios from "axios";

interface isLogin {
  email: string;
  password: string;
}
export const useAuthStore = create(
  devtools(
    persist(
      (set, get) => ({
        auth: null,
        login: async ({ email, password }: isLogin) => {
          try {
            const response = await axios.post(
              "http://localhost:9000/employees/login",
              {
                email: email,
                password: password,
              }
            );
            set({ auth: response.data }, false, { type: "auth/login-success" });
          } catch (err) {
            set({ auth: null }, false, { type: "auth/login-error" });
            throw new Error("Login failed");
          }
        },
        logout: () => {
          // AXIOS: Call 1 api login => user
          return set({ auth: null }, false, { type: "auth/logout-success" });
        },
      }),
      {
        name: "onlineshop-storage", // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
