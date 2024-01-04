import React, { useEffect, useState } from "react";
import useGetAllCarts from "../hooks/useGetAllCarts";

const CartsPage = ({ currentUser }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState("");
  const {
    data: getAllCartsData,
    mutate: getAllCartsFn,
    isPending: getAllCartsLoading,
    isError: getAllCartsError,
    isSuccess: getAllCartSuccess,
  } = useGetAllCarts();

  console.log("data", getAllCartsData);

  useEffect(() => {
    if (getAllCartSuccess) {
      const { carts } = getAllCartsData;
      console.log("carts/.......", carts[0].products);
      setCartItems(carts[0].products);
      setTotalCost(carts[0].total);
    }
  }, [getAllCartSuccess]);

  useEffect(() => {
    if (Object.keys(currentUser).length !== 0) {
      getAllCartsFn(currentUser?.id);
    }
  }, [currentUser]);

  return (
    <div className="cart-container">
      <div className="cart-center wrapper my-10">
        {getAllCartsLoading && (
          <div className="page wrapper flex justify-center items-center">
            <p>Loading....</p>
          </div>
        )}

        <div className="products-container my-10 grid  gap-8 grid-cols-[1fr] lg:gap-10 md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)]">
          {!getAllCartsLoading &&
            cartItems.map((eachProduct) => {
              const { brand, discountPercentage, id, price, thumbnail, title } =
                eachProduct;
              return (
                <article
                  key={id}
                  className="w-full rounded-md border border-gray-50 shadow-lg p-4 transition-all ease-linear flex flex-col gap-4 hover:shadow-2xl"
                >
                  <div className="img-container w-full">
                    <img
                      src={thumbnail}
                      alt={title}
                      className="w-full object-contain max-h-[280px]"
                    />
                  </div>
                  <div className="product-name">
                    <h1 className="text-2xl font-semibold">{title}</h1>
                  </div>
                  <div className="price-container flex justify-between items-center gap-4">
                    <p className="text-2xl font-semibold">$ {price}</p>
                    <p>Discount - {discountPercentage}%</p>
                  </div>
                  <div className="brand">
                    <p className="flex justify-start items-center">
                      <span className="font-semibold">Brand</span>: {brand}
                    </p>
                  </div>
                  {/* <div className="desc">
                    <p>{description}</p>
                  </div> */}
                  {/* <div className="add-to-cart">
                    <button
                      onClick={() => addToCartAPI(id)}
                      className="px-4 py-2 rounded flex justify-center w-full bg-orange-400 text-white font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div> */}
                </article>
              );
            })}
        </div>

        <div className="w-full my-10 flex justify-end">
          <button className="py-5 px-10 rounded-md bg-yellow-700 text-white text-3xl">
            Total : ${totalCost}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartsPage;
