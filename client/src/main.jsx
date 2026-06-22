import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

import router from "./routes";
import { store } from "./redex/store";
import AuthLoader from "./components/AuthLoader";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthLoader>
      <RouterProvider router={router} />
    </AuthLoader>
    <Toaster position="top-right" />
  </Provider>
);