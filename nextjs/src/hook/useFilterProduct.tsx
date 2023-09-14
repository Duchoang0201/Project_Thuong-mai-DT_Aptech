import { create } from "zustand";

import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { message } from "antd";

export const useFilterProduct = create(
  devtools(
    persist(
      (set: any, get: any) => {
        return {
          valueFilter: [],
          filterValue: [],
          initialValue: [],
          getMutipleFillter: async (data: any) => {
            const valueFilter = get().valueFilter;
            const newData = { ...valueFilter, ...data };

            console.log(`🚀🚀🚀!..newData`, newData);
            set({ valueFilter: newData }, false, {
              type: "data-from-server",
            });
          },
          setValueFilterNull: async () => {
            set({ valueFilter: [] }, false, {
              type: "data-from-server",
            });
          },
          getDataProduct: async (data: any) => {
            console.log(`🚀🚀🚀!..data`, typeof data);
            set({ filterValue: data, initialValue: data }, false, {
              type: "data-from-server",
            });
          },
          filter: async () => {
            const valueFilter = get().valueFilter;
            const initialValue = get().initialValue;

            console.log(`🚀🚀🚀!..valueFilter`, valueFilter);

            try {
              let newData = [...initialValue];

              // Check if valueFilter.categoryId exists
              if (valueFilter.categoryId) {
                newData = newData.filter(
                  (item: any) => item.categoryId === valueFilter.categoryId
                );
              }

              // Check if valueFilter.supplierId exists
              if (valueFilter.supplierId) {
                newData = newData.filter(
                  (item: any) => item.supplierId === valueFilter.supplierId
                );
              }

              set({ filterValue: newData }, false, {
                type: "data-from-server",
              });
            } catch (error) {
              set({ filterValue: initialValue }, false, {
                type: "data-from-server",
              });
            }
          },
        };
      },
      {
        name: "filterProduct",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
