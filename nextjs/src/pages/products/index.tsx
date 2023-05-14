import axios from "axios";
import React from "react";
import { useState } from "react";

type Props = {
  products: any;
};
const API_URL = "http://localhost:9000/products";
function index({ products }: Props) {
  console.log(products);
  return (
    <>
      <div>
        {products?.results?.map((product: any) => {
          return (
            <>
              <h4 key={product._id}>{product.name}</h4>;
            </>
          );
        })}
      </div>
    </>
  );
}

export default index;

export async function getStaticProps() {
  const products = await axios.get(API_URL).then((response) => {
    return response.data;
  });
  return {
    props: {
      products,
    },
  };
}
