import { Toaster } from "react-hot-toast";
import Routes from "./Routes";

const App = () => {
  return (
    <div>
      <Toaster position="top-center" reverseOrder={false} toastOptions={{ duration: 3000 }} />
      <Routes />
    </div>
  );
};

export default App;
