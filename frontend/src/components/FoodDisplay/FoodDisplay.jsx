import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import FoodItem from "../FoodItem/FoodItem";
import "./FoodDisplay.css";

const FoodDisplay = ({ category }) => {
  const context = useContext(StoreContext);

  if (!context) {
    return <div>Error: Context is not available</div>;
  }

  const { food_list } = context;

  return (
    <div className="food-display mt-[30px]" id="food-display">
      <h2 className="font-semibold" style={{ fontSize: "max(2vw, 24px)" }}>
        Top dishes near you
      </h2>
      <div className="food-display-list ">
        {food_list.map((item) => {
          if (category === "All" || category === item.category) {
            return (
              <FoodItem
                key={item._id} // Using item._id as a unique key
                id={item._id}
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }
          return null; // Ensure the map function always returns something
        })}
      </div>
    </div>
  );
};

export default FoodDisplay;
