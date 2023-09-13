import { create } from "zustand";

import axios from "axios";

import router from "next/router";
import useAxiosAuth from "@/libraries/axiosAuth";
import { axiosAuth } from "@/libraries/axiosConfig";

export const PropsSearch = create((set) => {
  return {
    dataSearch: [],
    productSearch: async (data: any) => {
      try {
        const search = await axiosAuth.get(
          `/products?productName=${data}&isActive=true`
        );
        set({ dataSearch: search.data?.results });
      } catch {
        console.log("err");
      }
    },
    searchCategory: async (data: any) => {
      try {
        const search = await axiosAuth.get(
          `/products?categoryId=${data}&isActive=true`
        );
        router.push(`/searchpage`);

        set({ dataSearch: search.data?.results });
      } catch {
        console.log("err");
      }
    },
  };
});
