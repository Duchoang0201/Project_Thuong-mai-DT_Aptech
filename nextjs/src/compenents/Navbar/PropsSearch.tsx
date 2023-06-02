import axios from "axios";
import { create } from "zustand";

const URL_ENV = process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:9000";
export const PropsSearch = create((set) => {
  return {
    dataSearch: [],
    search: async (data: any) => {
      try {
        const search = await axios.get(
          `${URL_ENV}/products?productName=${data}&isActive=true`
        );
        set({ dataSearch: search.data?.results });
      } catch {
        console.log("err");
      }
    },
  };
});
