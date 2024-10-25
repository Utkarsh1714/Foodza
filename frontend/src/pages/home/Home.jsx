import React, { useState } from "react";
import Header from "../../components/header/Header";
import Explore from "../../components/ExploreMenu/Explore";
import FoodDisplay from "../../components/FoodDisplay/FoodDisplay";
import AppDownload from "../../components/AppDownload/AppDownload";

const Home = () => {
  const [category, setCategory] = useState("All");

  return (
    <>
      <div>
        <Header />
        <Explore category={category} setCategory={setCategory} />
        <FoodDisplay category={category} />
        <AppDownload />
      </div>
    </>
  );
};

export default Home;
