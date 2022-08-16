import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chart from "./Routes/Chart";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";
import Price from "./Routes/Price";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin />}>
          <Route path="price" element={<Price />} />
          <Route path="chart" element={<Chart />} />
        </Route>
        <Route path="/" element={<Coins />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
