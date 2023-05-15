// eslint-disable-next-line no-unused-vars
import React, { useContext, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { CustomHookContext } from "../../Context Api/useHooks";

const ExistingProduct = () => {
  const { b2b_products, b2bPost, updateB2b } = useContext(CustomHookContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedItemImage, setSelectedItemImage] = useState(null);
  const [isModalOpenView, setIsModalOpenView] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [base_image, setBaseImage] = useState(null);
  const handleBaseImage = async (e) => {
    e.preventDefault();
    const { name, files } = e.target;
    if (name === "image" && files.length > 0) {
      const formData = new FormData();
      formData.append("image", files[0]);
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_APP_SECRET_SERVER_SIDE}/upload`,
          formData
        );
        setBaseImage(res?.data?.imageUrl);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value || selectedItem?.title,
      price: e.target.price.value || selectedItem?.price,
      priceb2b: e.target.priceb2b.value || selectedItem?.priceb2b,
      shipping: selectedItem?.shipping,
      description: e.target.description.value || selectedItem?.description,
      category: selectedItem?.category,
      subCategory: selectedItem?.subCategory,
      spec: selectedItem?.spec,
      productVariant: selectedItem?.productVariant,
      unit: selectedItem?.unit,
      postFrom: selectedItem?.postFrom,
      image: base_image || selectedItem?.image,
    };

    await b2bPost({ ...data, previous: selectedItem, type: "update" });
    await updateB2b(selectedItem?._id, data);
    // await updateB2b(selectedItem?._id, data);
    setIsModalOpenView(!isModalOpenView);
    e.target.reset();
  };
  const overlayVariants = {
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        duration: 0.3,
        delayChildren: 0.4,
      },
    },
    hidden: {
      opacity: 0,
      transition: {
        when: "afterChildren",
        duration: 0.3,
        delay: 0.4,
      },
    },
  };
  return (
    <>
      <div
        className={
          isModalOpenView === true || isModalOpenDelete === true
            ? "blur-sm brightness-90 transition-all ease-in-out duration-300 flex flex-wrap gap-2"
            : "flex flex-wrap gap-2 transition-all ease-in-out duration-300"
        }
      >
        {b2b_products?.map((item, index) => (
          <div
            key={index}
            className="w-96 h-96 border-2 border-black p-4 rounded-xl group hover:cursor-pointer"
          >
            <figure className="w-52 h-52 mx-auto rounded-xl  ">
              <img
                className="w-52 h-52 rounded-xl overflow-hidden group-hover:rounded-lg group-hover:scale-105 transition-all duration-300 delay-75 ease-in-out"
                src={item?.image}
                alt={item.title}
              />
            </figure>
            <div className="">
              <h2 className="font-semibold text-xl capitalize">{item.title}</h2>
              <p>
                <span className="text-lg font-semibold">Price :-</span>
                {item?.price}
              </p>
              <p>
                <span className="text-lg font-semibold">PriceB2B :-</span>
                {item?.priceb2b}
              </p>
              <div className="w-full flex justify-center gap-2">
                <button
                  onClick={() => {
                    setSelectedItem(item),
                      setIsModalOpenView(!isModalOpenView),
                      setSelectedItemImage(item?.image);
                  }}
                  className="btn btn-primary"
                >
                  View
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    setIsModalOpenDelete(!isModalOpenDelete),
                      setSelectedItem(item);
                  }}
                  className="btn btn-error"
                >
                  Delete
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <AnimatePresence>
        {isModalOpenView && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className={
              isModalOpenView === true &&
              "fixed inset-0 bg-transparent    flex flex-wrap items-center justify-center"
            }
          >
            <motion.div
              className="max-w-2xl w-4/5 h-4/6 overflow-y-auto bg-white border rounded-xl "
              initial={{ y: "-100vh" }}
              animate={{ y: 0 }}
              exit={{ y: "-100vh" }}
              transition={{ duration: 0.35 }}
            >
              <div className="border-b-2 border-black z-50 w-full top-0 ">
                <div className="flex justify-between px-3 items-center">
                  <h5 className="m-0 text-xl p-4 ">Order Details</h5>
                  <button
                    className="border  border-gray-700 p-1.5 rounded-lg"
                    onClick={() => {
                      setIsModalOpenView(!isModalOpenView), setIsEdit(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              {isEdit === false ? (
                <div className="w-full flex flex-wrap justify-center  px-2 py-1.5 ">
                  <figure className="md:w-1/4 w-1/2">
                    <img
                      className="w-52 h-52 rounded-xl overflow-hidden hover:rounded-lg hover:scale-105 transition-all duration-300 delay-75 ease-in-out"
                      src={selectedItem?.image}
                    />
                  </figure>
                  <div className="flex flex-col items-center w-3/4">
                    <button
                      onClick={() => setIsEdit(!isEdit)}
                      className=" w-full flex justify-end"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                        />
                      </svg>
                    </button>
                    <p className="text-xl font-bold capitalize">
                      {selectedItem?.title}
                    </p>{" "}
                    <p>
                      <span className="text-lg font-semibold">Price :-</span>
                      {selectedItem?.price}
                    </p>
                    <p>
                      <span className="text-lg font-semibold">PriceB2B :-</span>
                      {selectedItem?.priceb2b}
                    </p>
                    <p>
                      <span className="text-base mt-1">Description :-</span>
                      <br />
                      {selectedItem?.description}
                    </p>
                  </div>
                </div>
              ) : (
                <div className=" flex flex-wrap justify-center w-full px-2 py-1.5">
                  <div
                    className="flex mt-2
                   justify-center md:w-1/4 w-1/2"
                  >
                    {selectedItemImage ? (
                      <div className="relative">
                        <img
                          className="w-52 h-52 rounded-lg"
                          src={selectedItemImage}
                        />
                        <button
                          onClick={() => setSelectedItemImage(null)}
                          className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/4 -translate-y-1/4 bg-red-500 rounded-full z-20"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="w-1/4 ">
                        <label
                          htmlFor="dropzone-file"
                          className="flex flex-col items-center justify-center w-52 h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              aria-hidden="true"
                              className="w-8 h-8 mb-3 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                              ></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>
                              <br /> or drag and drop
                            </p>
                          </div>

                          <input
                            onChange={(e) => handleBaseImage(e)}
                            id="dropzone-file"
                            type="file"
                            name="image"
                            className="hidden"
                          />
                        </label>
                      </div>
                    )}
                  </div>

                  <form
                    onSubmit={handleSubmit}
                    className="flex flex-col items-center w-3/4 gap-3"
                  >
                    <div className=" w-full flex justify-end gap-2">
                      <button
                        onClick={() => setIsEdit(!isEdit)}
                        className="w-11 h-11 border border-black rounded-lg group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-9 h-9 mx-auto group-hover:text-red-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>

                      <button
                        type="submit"
                        className="w-11 h-11 border border-black rounded-lg group"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-9 h-9 mx-auto group-hover:text-green-400"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="">
                      <span>Title :</span>
                      <br />
                      <input
                        name="title"
                        placeholder={selectedItem.title}
                        className="border h-10 border-sky-300 focus:outline-sky-400 p-2 rounded-lg"
                      />
                    </div>
                    <div className=" ">
                      <span>Price :</span>
                      <br />
                      <input
                        name="price"
                        placeholder={selectedItem.price}
                        className="border h-10 border-sky-300 focus:outline-sky-400 p-2 rounded-lg"
                      />
                    </div>
                    <div className="  ">
                      <p>Price B2b :</p>
                      <br />
                      <input
                        name="priceb2b"
                        placeholder={selectedItem.priceb2b}
                        className="border h-10 border-sky-300 focus:outline-sky-400 p-2 rounded-lg"
                      />
                    </div>
                    <div className=" min-h-20 ">
                      <span>Description :</span>
                      <br />
                      <textarea
                        name="description"
                        placeholder={selectedItem.description}
                        className="h-20 border  border-sky-300 focus:outline-sky-400 p-2 rounded-lg"
                      />
                    </div>
                    <button type="submit">Submit</button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
        {isModalOpenDelete && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className={
              isModalOpenDelete === true &&
              "fixed  inset-0 z-50 bg-transparent    flex items-center justify-center"
            }
          >
            <motion.div
              className="max-w-lg p-4 overflow-y-auto bg-gray-800 border rounded-xl "
              initial={{ scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              exit={{ scale: 0 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
              }}
            >
              <motion.div className="flex flex-col justify-center items-center h-full">
                <motion.img
                  initial={{ y: "-100vh" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-100vh" }}
                  transition={{ duration: 0.6 }}
                  className="w-1/3 h-1/2 rounded-xl"
                  src={selectedItem?.image}
                />

                <p className="text-xl text-white ">
                  Are you want to remove this ?
                </p>
                <motion.div className="flex gap-4 mt-1.5">
                  <button
                    onClick={async () => {
                      await b2bPost({ ...selectedItem, type: "delete" }),
                        setIsModalOpenDelete(!isModalOpenDelete);
                    }}
                    className="text-white border px-2.5 py-1.5 bg-red-500 rounded-lg"
                  >
                    Yes
                  </button>
                  <button
                    className="text-white border px-2.5 py-1.5 bg-transparent rounded-lg"
                    onClick={() => setIsModalOpenDelete(!isModalOpenDelete)}
                  >
                    No
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ExistingProduct;
