import React from "react";
import axios from "axios";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
type Props = {
  product: any;
};

export default function ProductDetails({ product }: Props) {
  return (
    <>
      <div className="container ">
        <div className="d-flex flex-lg-row bg-primary flex-column m-5">
          <div>
            {product?.images?.map((items: any) => {
              return (
                <>
                  <Image
                    src={`http://localhost:9000/${items}`}
                    alt="Description of the image"
                    width={100}
                    height={200}
                  ></Image>
                </>
              );
            })}
          </div>
          <div className="p-2 bd-highlight  " style={{ background: "#c7c0c0" }}>
            <Image
              src={`http://localhost:9000/${product.imageUrl}`}
              alt="Description of the image"
              width={400}
              height={400}
            ></Image>
          </div>
          <div className="p-3 bd-highlight ">
            <h3 className="fs-5">{product.name}</h3>

            <div className="d-flex justify-content-between">
              <p>
                Mã: <span className="fs-6">{product.categoryId}</span>
              </p>
              <p>... đã bán</p>
            </div>

            <div>
              <span className="fs-4">{product.price}đ</span>
            </div>

            <div></div>
            <div>
              <b>{product.active === true ? "Còn hàng" : "Hết hàng"}</b>
            </div>
            <div className="mt-2 border border-dark border-1 rounded-3 w-75 h-25">
              <div className="border-bottom border-dark border-0 w-100 h-25 rounded-0 ">
                <p>Khuyến mãi</p>

                <ul>
                  <li>Giảm giá cho sản phẩm lên đến {product.discount}%</li>
                  <li>Áp dụng cho mọi địa điểm trên toàn quốc</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div></div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  // Call an external API endpoint to get posts
  const products = await axios
    .get("http://localhost:9000/products")
    .then((response) => {
      return response.data;
    });

  console.log(products);
  // Get the paths we want to prerender based on posts
  // In production environments, prerender all pages
  // (slower builds, but faster initial page load)
  const paths = products?.results?.map((items: any) => ({
    params: { id: `${items._id}` },
  }));

  // { fallback: false } means other routes should 404
  console.log("listpaths:", paths);
  return { paths, fallback: false };
}

// This also gets called at build time
export async function getStaticProps({ params }: any) {
  // params contains the post `id`.
  // If the route is like /posts/1, then params.id is 1
  const product = await axios
    .get(`http://localhost:9000/products/${params.id}`)
    .then((response) => {
      return response.data;
    });

  // Pass post data to the page via props
  return { props: { product: product } };
}
