import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";

function Router() {
  return (
    <BrowserRouter basename="/">
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}
export default Router;
