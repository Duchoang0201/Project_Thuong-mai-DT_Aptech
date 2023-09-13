import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface Session {
    user: {
      /** The user's postal address. */
      _id: string;
      imageUrl: string;
      firstName: string;
      lastName: string;
      id: number;
      userName: string;
      phoneNumber: string;
      name: string;
      email: string;
      address: string;
      zip: string;
      role: string;
      token: string;
      refreshToken: string;
    };
    userInfo: {
      _id: string;
      accessToken: string;
      refreshToken: string;
    };
  }
}

declare module "axios" {
  export interface AxiosInstance {
    get<T = any, R = AxiosResponse<T>>(
      url: string,
      config?: AxiosRequestConfig
    ): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(
      url: string,
      data?: any,
      config?: AxiosRequestConfig
    ): Promise<R>;
    // Add other methods you use here, like 'put', 'delete', etc.
  }
}
