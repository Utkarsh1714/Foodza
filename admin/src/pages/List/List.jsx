import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({ url }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error");
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="pt-5 list add flexcol">
        <p>All Foods List</p>
        <div className="list-table">
          <div className="list-table-format title bg-[#f9f9f9]">
            <b>Image</b>
            <b>Name</b>
            <b>Catogory</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {list.map((item, index) => {
            return (
              <div key={index} className="list-table-format">
                <img
                  src={`${url}/images/` + item.image}
                  alt=""
                  className="w-[50px]"
                />
                <p>{item.name}</p>
                <p>{item.category}</p>
                <p>Rs. {item.price}</p>
                <p
                  className="cursor-pointer cursor"
                  onClick={() => removeFood(item._id)}
                >
                  X
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default List;
