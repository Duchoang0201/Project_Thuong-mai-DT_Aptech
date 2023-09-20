import { message } from "antd";

export const asyncMessage = (valueWating: string) => {
  const messWating = message.loading(valueWating, 0);

  return {
    messWating: messWating,
  };
};
