import { create } from "zustand";

import axios from "axios";

import { devtools } from "zustand/middleware";
import { persist, createJSONStorage } from "zustand/middleware";
import { API_URL } from "@/contants/URLS";

import { useSession } from "next-auth/react";
import { asyncMessage } from "./Functionmessage";
import { message } from "antd";
import { axiosClient } from "@/libraries/axiosConfig";

export const useCartStore = create(
  devtools(
    persist(
      (set: any, get: any) => ({
        customerId: "",
        cartId: "",
        items: [],
        itemsCheckout: [],
        getDataServer: async (cart: any, customerId: any) => {
          return set(
            {
              items: cart?.products || [],
              customerId: customerId,
              cartId: cart?._id,
            },
            false,
            {
              type: "carts/getCartServer",
            }
          );
        },
        add: async ({ product }: any) => {
          const cartId = get().cartId;
          const items = get().items;
          const { messWating } = asyncMessage("Thêm sản phẩm");
          // Thêm trường productId để đưa lên cart
          for (let i = 0; i < items.length; i++) {
            items[i].product.productId = items[i].product._id;
          }
          // Cái này có thể không cần xử lý vì bên button {add to cart} đều xử lý r
          const found = items?.find(
            (x: any) => x?.product?._id === product?._id
          );
          if (found) {
            found.quantity += 1;
            await axiosClient.patch(`/carts/${cartId}`, {
              products: items,
            });
            messWating();
            message.success("Thêm 1 sản phẩm thành công");
          } else {
            items?.push({ product, quantity: 1 });
            await axiosClient.patch(`/carts/${cartId}`, {
              products: items,
            });
            messWating();
            message.success("Thêm sản phẩm vào giỏ thành công");
          }

          return set({ items: [...items] }, false, { type: "carts/addToCart" });
        },

        remove: async (id: any) => {
          const { messWating } = asyncMessage("Xóa sản phẩm khỏi giỏ hàng");

          const items = get().items;
          const cartId = get().cartId;

          const newItems = items.filter((x: any) => x.product._id !== id);
          const result = await axiosClient.patch(`/carts/${cartId}`, {
            products: newItems,
          });
          messWating();
          message.success("Xóa sản phẩm khỏi giỏ hàng thành công");
          return set({ items: [...newItems] }, false, {
            type: "carts/removeFromCart",
          });
        },

        increase: async (id: any) => {
          const { messWating } = asyncMessage("Thêm 1 sản phẩm");

          const items = get().items;
          const cartId = get().cartId;
          for (let i = 0; i < items.length; i++) {
            items[i].product.productId = items[i].product._id;
          }
          const found = items.find((x: any) => x.product._id === id);
          if (found) {
            found.quantity += 1;

            await axiosClient.patch(`/carts/${cartId}`, {
              products: items,
            });
            messWating();
            message.success("Thêm 1 sản phẩm thành công");

            return set({ items: [...items] }, false, {
              type: "carts/increase",
            });
          }
          return null; // handle the case when item is not found
        },

        decrease: async (id: any) => {
          const { messWating } = asyncMessage("Giảm 1 sản phẩm");

          const items = get().items;
          const itemsCheckout = get().itemsCheckout;
          const cartId = get().cartId;
          for (let i = 0; i < items.length; i++) {
            items[i].product.productId = items[i].product._id;
          }
          const found = items.find((x: any) => x.product._id === id);
          if (found) {
            if (found.quantity === 1) {
              const newItems = items.filter(
                (x: any) => x.product._id !== found.product._id
              );
              const newItemsCheckout = itemsCheckout.filter(
                (x: any) => x.product._id !== found.product._id
              );
              const result = await axiosClient.patch(`/carts/${cartId}`, {
                products: newItems,
              });
              messWating();
              message.success("Xóa sản phẩm khỏi giỏ hàng thành công");
              return set(
                { items: [...newItems], itemsCheckout: [...newItemsCheckout] },
                false,
                {
                  type: "carts/decrease",
                }
              );
            } else {
              found.quantity--;
              const result = await axiosClient.patch(`/carts/${cartId}`, {
                products: items,
              });
              messWating();

              message.success("Giảm 1 sản phẩm khỏi giỏ hàng thành công");

              return set({ items: [...items] }, false, {
                type: "carts/decrease",
              });
            }
          }
          return null; // handle the case when item is not found
        },
        addCheck: async (item: any) => {
          const itemsCheckout = get().itemsCheckout;
          const found = itemsCheckout.find(
            (x: any) => x.product.productId === item.product.productId
          );
          if (found) {
            itemsCheckout;
          } else {
            itemsCheckout.push(item);
          }
          return set({ itemsCheckout: [...itemsCheckout] }, false, {
            type: "cartsCheckout/add",
          });
        },
        removeCheck: async (_id: any) => {
          const itemsCheckout = get().itemsCheckout;
          const newData = itemsCheckout.filter(
            (x: any) => x.product.productId !== _id
          );
          return set({ itemsCheckout: [...newData] }, false, {
            type: "cartsCheckout/remove",
          });
        },
        selectAllCheck: async (list: any) => {
          let items = get().items;
          let itemsCheckout = get().itemsCheckout;
          itemsCheckout = items;

          return set({ itemsCheckout: [...itemsCheckout] }, false, {
            type: "cartsCheckout/add",
          });
        },
        removeAllCheck: async (_id: any) => {
          return set({ itemsCheckout: [] }, false, {
            type: "cartsCheckout/remove",
          });
        },
      }),

      {
        name: "count_Cart", // unique name
        storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
      }
    )
  )
);
