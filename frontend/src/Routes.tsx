import { Route, Routes as ReactRoutes, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/HomePage";

const Routes = () => {
  return (
    <BrowserRouter>
      <ReactRoutes>
        <Route path="/" element={<HomePage />} />
      </ReactRoutes>
    </BrowserRouter>
  );
};

export default Routes;
