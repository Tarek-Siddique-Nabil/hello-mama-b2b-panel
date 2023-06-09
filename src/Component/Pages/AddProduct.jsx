// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from "react";

import axios from "axios";
import { CustomHookContext } from "../../Context Api/useHooks";
import { AuthContext } from "../../Context Api/AuthContext";

const AddProduct = () => {
  const { categories, b2bPost } = useContext(CustomHookContext);
  const { user } = useContext(AuthContext);

  const [existingCategory, setExistingCategory] = useState([]);

  const [existingSubCategory, setSubExistingCategory] = useState([]);
  useEffect(() => {
    setSubExistingCategory(existingCategory?.children);
  }, [existingCategory]);

  const [category, setCategory] = useState(null);

  const [subCategory, setSubCategory] = useState(null);

  const [base_image, setBaseImage] = useState(null);
  const handleBaseImage = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (name === "base_image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/upload`,
          formData
        );
        setBaseImage(res.data.imageUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const product = {
      title: e.target.title.value,
      price: e.target.price.value,
      priceb2b: e.target.priceb2b.value,
      description: e.target.description.value,
      category: category,
      subCategory: subCategory,
      image: base_image,

      postFrom: user?.email,
      type: "add",
    };

    await b2bPost(product);

    e.target.reset();

    setExistingCategory([]);
    setSubExistingCategory([]);
    setCategory(null);
    setSubCategory(null);
    setBaseImage(null);
  };

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center min-h-screen"
      >
        <div className=" flex flex-col">
          <span>পণ্যের নাম :-</span>
          <input
            required
            name="title"
            placeholder="Title"
            className="w-52 border border-black focus:outline-cyan-300 rounded-lg px-2.5 py-1.5"
          />
        </div>
        <div className="flex flex-col">
          <span>খুচরা মূল্য :-</span>
          <input
            type="number"
            required
            name="price"
            placeholder="Price"
            className="w-52 border border-black focus:outline-cyan-300 rounded-lg px-2.5 py-1.5"
          />
        </div>
        <div className="flex flex-col">
          <span>পাইকারী মূল্য :-</span>
          <input
            type="number"
            required
            name="priceb2b"
            placeholder="B2b Price"
            className="w-52 border border-black focus:outline-cyan-300 rounded-lg px-2.5 py-1.5"
          />
        </div>
        <div className="flex flex-col  w-52">
          <span>
            Category :- <span className="text-sky-600">{category}</span>
          </span>
          <div className="flex flex-wrap gap-2 border p-2 border-black hover:border-cyan-600 rounded-xl">
            {categories?.map((item, index) => (
              <span key={index} className="flex  gap-1 ">
                <input
                  required
                  type="radio"
                  className="radio radio-error "
                  name="category"
                  onChange={() => [
                    setExistingCategory(item),
                    setCategory(item.value),
                  ]}
                />
                <label className="dark:text-white">{item?.value}</label>
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col w-52">
          <span>
            Sub-Category :-<span className="text-sky-600">{subCategory}</span>
          </span>
          <div className="flex flex-wrap gap-2 border p-2 border-black hover:border-cyan-600 rounded-xl">
            {existingSubCategory?.map((item, index) => (
              <span key={index} className="flex  gap-1 ">
                <input
                  required
                  type="radio"
                  className="radio radio-error "
                  name="category"
                  onChange={() => [setSubCategory(item.value)]}
                />
                <label className="dark:text-white">{item?.value}</label>
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <span>Description :-</span>
          <textarea
            required
            name="description"
            placeholder="Description"
            className="w-52 h-16 border border-black focus:outline-cyan-300 rounded-lg px-2.5 py-1.5"
          />
        </div>
        <div className="flex flex-col">
          <span>Image :-</span>
          <input
            type="file"
            onChange={(e) => handleBaseImage(e)}
            name="base_image"
            className="file-input file-input-bordered file-input-info w-52"
          />
        </div>

        <button
          className="bg-sky-300 hover:bg-sky-500 border border-black rounded-xl p-2.5 mt-3"
          type="submit"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default AddProduct;
