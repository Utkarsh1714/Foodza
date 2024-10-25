import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setimage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Soups & Starter Plates",
  });

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    const response = await axios.post(`${url}/api/food/add`, formData);

    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "",
      });
      setimage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div className="add w-[70%] mt-[50px] text-[#6d6d6d] text-base">
      <form className="flexcol gap-[20px]" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flexcol">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              alt=""
              className="w-[120px]"
            />
          </label>
          <input
            onChange={(e) => setimage(e.target.files[0])}
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add-product-name flexcol">
          <p>Product name</p>
          <input
            onChange={onChange}
            value={data.name}
            type="text"
            name="name"
            placeholder="Type here"
            className="p-2.5 border"
          />
        </div>
        <div className="add-product-desc flexcol">
          <p>Product description</p>
          <textarea
            onChange={onChange}
            value={data.description}
            name="description"
            rows="6"
            placeholder="Write content here"
            required
            className="p-2.5 border"
          ></textarea>
        </div>
        <div className="add-category-price flex gap-[30px]">
          <div className="add-category flexcol">
            <p>Product category</p>
            <select onChange={onChange} name="category" className="border">
              <option value="Soups & Starter Plates">
                Soups & Starter Plates
              </option>
              <option value="Veg Tandoor Grills">Veg Tandoor Grills</option>
              <option value="Chops & Chelo">Chops & Chelo</option>
              <option value="Non-Veg Tandoor Grills">
                Non-Veg Tandoor Grills
              </option>
              <option value="Biryani, Pulao & Rice">
                Biryani, Pulao & Rice
              </option>
              <option value="Non-Veg Curries">Non-Veg Curries</option>
              <option value="Veg Curries">Veg Curries</option>
              <option value="Side Orders">Side Orders</option>
              <option value="Indian Breads">Indian Breads</option>
              <option value="Desserts">Desserts</option>
              <option value="Drinks & Juices">Drinks & Juices</option>
            </select>
          </div>
          <div className="add-price flexcol">
            <p>Product price</p>
            <input
              onChange={onChange}
              value={data.price}
              type="Number"
              name="price"
              placeholder="Rs. 100/-"
              className="border"
            />
          </div>
        </div>
        <button
          type="submit"
          className="add-btn max-w-[120px] border-none p-2.5 bg-black text-white cursor-pointer"
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
