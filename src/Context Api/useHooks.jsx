import axios from "axios";
// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { AuthContext } from "./AuthContext";

// import { io } from "socket.io-client";
export const CustomHookContext = createContext();

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const { user } = useContext(AuthContext);

  const [b2bData, setB2bData] = useState([]);
  const [b2b_products, setB2b_products] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(false);

  // const socket = io(`${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/mew-order`);
  ///product

  // --------------------------------------------------------b2b product get -----------------------------------
  useEffect(() => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/product/${
      user?.email || localStorage.getItem("User email")
    }`;
    setLoading(false);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setB2b_products(response.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user?.email]);

  const updateB2b = async (id, body) => {
    setLoading(true);
    try {
      const url = `${
        import.meta.env.VITE_APP_SECRET_SERVER_SIDE
      }/product/b2bProducts/${id}`;
      const response = await axios.put(url, body, {
        headers: {
          "content-type": "application/json",
        },
      });
      const json = response.data;
      setLoading(false);
      if (json) {
        toast.success("Product Update Successfully", {
          position: "top-center",
        });
      }
      const index = b2b_products.findIndex((item) => item._id === id);
      const newProductsData = [...b2b_products];
      newProductsData[index] = json;
      setB2b_products(newProductsData);
    } catch (err) {
      toast.error(err.message, {
        position: "top-center",
      });
    }
  };

  // --------------------------------------------------------b2b  Notification post-------------------------

  const b2bPost = async (body) => {
    setLoading(true);
    try {
      const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/b2b`;
      const response = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = response?.data;
      setLoading(false);
      if (json) {
        toast.success("Product Request Send Successfully", {
          position: "top-center",
        });
      }
      setB2bData([...b2bData, json]);
    } catch (err) {
      toast.error(`Something error`, {
        position: "top-center",
      });
    }
  };

  ///-------------------------------------------Category--------------------------------//

  // ----------------------------------------------------------Category get----------------------------------------------------------

  useEffect(() => {
    const url = `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/category`;
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const data = response.data;
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <CustomHookContext.Provider
      value={{
        b2b_products,
        categories,
        loading,
        updateB2b,
        b2bPost,
      }}
    >
      {children}
    </CustomHookContext.Provider>
  );
};

export default ContextProvider;
