import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import useproducts from "./../hooks/useProducts";
import useSearch from "./../hooks/useSearch";
import useCart from "../hooks/useCart";
import Alert from "../components/Alert";
import { CiSearch } from "react-icons/ci";

function Home({ currentUser }) {
  const [allProducts, setAllProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: "",
    price: "",
  });
  const [maxPrice, setMaxPrice] = useState("");

  const [alertMessage, setAlertMessage] = useState({
    status: false,
    message: "",
    type: "",
  });

  const {
    mutate: productsApiFn,
    isPending: productsApiLoading,
    isSuccess: productsApiSuccess,
    isError: productsApiError,
    error: productsApiErrorMessage,
    data: productsApiData,
  } = useproducts();

  const {
    mutate: searchApiFn,
    isPending: searchApiLoading,
    isSuccess: searchApiSuccess,
    isError: searchApiError,
    error: searchApiErrorMessage,
    data: searchApiData,
  } = useSearch();

  console.log("data", productsApiData);

  const {
    mutate: addCartApiFn,
    isPending: addToCarApitLoading,
    isSuccess: addToCartApiSuccess,
    isError: addToCartApiError,
    error: addToCartApiErrorMessage,
    data: addToCartApiData,
  } = useCart();

  function getMaxPrice(products) {
    if (!Array.isArray(products) || products.length === 0) {
      // Handle the case where the input is not a valid array or is empty
      return null; // Or you can return an appropriate default value
    }

    let maxPrice = products[0].price; // Assume the first product has the maximum price

    for (let i = 1; i < products.length; i++) {
      const currentPrice = products[i].price;

      if (currentPrice > maxPrice) {
        // Update maxPrice if the current product has a higher price
        maxPrice = currentPrice;
      }
    }

    return maxPrice;
  }

  useEffect(() => {
    if (addToCartApiError) {
      setAlertMessage({
        status: true,
        message: addToCartApiData?.message || "Please login and try again...",
        type: "error",
      });
    }
  }, [addToCartApiError]);

  useEffect(() => {
    if (addToCartApiSuccess) {
      setAlertMessage({
        status: true,
        message: "Successfully Added " + addToCartApiData?.products[0]["title"],
        type: "success",
      });
    }
  }, [addToCartApiSuccess]);

  const addToCartAPI = (productId) => {
    setAlertMessage({
      status: false,
      message: "",
      type: "",
    });
    const payload = {
      userId: currentUser?.id,
      products: [
        {
          id: productId,
          quantity: 1,
        },
      ],
    };

    addCartApiFn(payload);
  };

  const handleFilters = (itemValue, itemName) => {
    setFilters({
      ...filters,
      [itemName]: itemValue,
    });
  };

  useEffect(() => {
    searchApiFn(filters["searchTerm"]);
  }, [filters["searchTerm"]]);

  useEffect(() => {
    if (searchApiSuccess) {
      setAllProducts(searchApiData?.products);
      setMaxPrice(getMaxPrice(searchApiData?.products));
    }
  }, [searchApiSuccess]);

  useEffect(() => {
    if (productsApiSuccess) {
      setAllProducts(productsApiData?.products);
      setMaxPrice(getMaxPrice(productsApiData?.products));
    }
  }, [productsApiSuccess]);

  function getProductsBelowPrice(products, maxPrice) {
    console.log({ products, maxPrice });
    if (!Array.isArray(products) || products.length === 0) {
      // Handle the case where the input is not valid
      return null; // Or you can return an appropriate default value
    }

    const filteredProducts = products.filter(
      (product) => product.price <= maxPrice
    );

    return filteredProducts;
  }

  useEffect(() => {
    if (searchApiData && searchApiData?.products.length !== 0)
      setAllProducts(
        getProductsBelowPrice(searchApiData?.products, filters["price"])
      );
  }, [filters["price"]]);

  useEffect(() => {
    productsApiFn();
  }, []);

  // if (productsApiLoading || searchApiLoading) {
  //   return (
  //     <div className="page wrapper flex justify-center items-center">
  //       <p>Loading....</p>
  //     </div>
  //   );
  // }

  console.log("filters", filters);

  return (
    <div className="home-container">
      <div className="home-container-center wrapper">
        <div className="filters flex gap-4 items-center">
          <div className="input-container  flex justify-center my-10 w-full max-w-[500px] relative">
            <input
              type="text"
              name="searchItem"
              id="searchItem"
              placeholder="Serach Here..."
              value={filters["searchTerm"]}
              onChange={(e) => handleFilters(e.target.value, "searchTerm")}
              className="rounded border border-gray-300 h-[45px] w-full max-w-[500px] px-4"
            />
            <span className="absolute top-[50%] right-[15px] translate-x-[-50%] translate-y-[-50%]">
              <CiSearch className="text-2xl" />
            </span>
          </div>
          <div className="input-range flex flex-col gap-1">
            <label htmlFor="price">Filter by Price $0 to ${maxPrice}</label>
            <input
              type="range"
              onChange={(e) => handleFilters(e.target.value, "price")}
              min={0}
              max={maxPrice}
            ></input>
          </div>
        </div>

        {alertMessage.status && (
          <Alert message={alertMessage.message} type={alertMessage.type} />
        )}

        {(productsApiLoading || searchApiLoading) && (
          <div className="page wrapper flex justify-center items-center">
            <p>Loading....</p>
          </div>
        )}

        <div className="w-full">
          <p>Showing {allProducts?.length} Products....</p>
        </div>

        <div className="products-container my-10 grid  gap-8 grid-cols-[1fr] lg:gap-10 md:grid-cols-[repeat(2,1fr)] lg:grid-cols-[repeat(3,1fr)]">
          {!searchApiLoading &&
            !productsApiLoading &&
            allProducts?.map((eachProduct) => {
              const {
                brand,
                category,
                description,
                discountPercentage,
                id,
                images,
                price,
                rating,
                stock,
                thumbnail,
                title,
              } = eachProduct;
              return (
                <article
                  key={id}
                  className="w-full rounded-md border border-gray-50 shadow-lg p-4 transition-all ease-linear flex flex-col gap-4 hover:shadow-2xl"
                >
                  <div className="img-container w-full">
                    <img
                      src={images[0]}
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
                  <div className="desc">
                    <p>{description}</p>
                  </div>
                  <div className="add-to-cart">
                    <button
                      onClick={() => addToCartAPI(id)}
                      className="px-4 py-2 rounded flex justify-center w-full bg-orange-400 text-white font-semibold"
                    >
                      Add to Cart
                    </button>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </div>
  );
}
export default Home;
