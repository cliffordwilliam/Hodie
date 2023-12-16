// base
import React from "react";
import ReactDOM from "react-dom/client";
// router
import { RouterProvider } from "react-router-dom";
import router from "./router";
// store
import { Provider } from "react-redux";
import { store } from "./store";
// google
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="267165704667-7hon0dg1152bjl995k272q72uftpfglo.apps.googleusercontent.com">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </GoogleOAuthProvider>
    ,
  </React.StrictMode>
);
