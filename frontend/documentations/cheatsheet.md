# Cheatsheet

## Setup npm

```
npm create vite@latest
```

Then delete the following:

- index.html

```html
<link rel="icon" type="image/svg+xml" href="/vite.svg" />
```

remove that and insert .ico file into the public folder.

Also remove the stuff in the public folder.

Go to src.

- Delete the assets.
- CSS.
- App.jsx

## Edit the main

We are going to be using 2 things.

The router and the redux.

## Router

npm i the following

```
    "@react-oauth/google": "^0.12.1",
    "@reduxjs/toolkit": "^2.0.1",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^9.0.4",
    "react-router-dom": "^6.20.1",
    "react-spotify-web-playback": "^0.14.1",
    "redux": "^5.0.0",
    "socket.io-client": "^4.7.2"
```

```jsx
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
```

Create the router:

```jsx
import { createBrowserRouter, redirect, useNavigate } from "react-router-dom";

import Layout from "./pages/Layout";
import PublicLayout from "./pages/PublicLayout";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Users from "./pages/Users";
import UsersDetail from "./pages/UserDetail";
import MyDetail from "./pages/MyDetail";
import EditMyDetail from "./pages/EditMyDetail";
import ChatRooms from "./pages/ChatRooms";
import ChatRoom from "./pages/ChatRoom";
import Spotify from "./pages/Spotify";
import Drinks from "./pages/Drinks";
import Posts from "./pages/Posts";
import PostDetail from "./pages/PostDetail";

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: () => {
      if (!localStorage.token) {
        return redirect("/register");
      }
      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/users",
        element: <Users />,
      },
      {
        path: "/drinks",
        element: <Drinks />,
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
```

Create your slice.

```jsx
// set content of modal on / off

import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    content: "",
  },
  reducers: {
    setContent: (state, action) => {
      return {
        ...state,
        content: action.payload,
      };
    },
    clearContent: (state) => {
      return {
        ...state,
        content: "",
      };
    },
  },
});

export const { setContent, clearContent } = modalSlice.actions;

export default modalSlice.reducer;
```

Craete the store.

```jsx
import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./apiSlice";
import modalSlice from "./modalSlice";

// Redux Thunk middleware - handle async

// 1. export STORE -> using setter from slices
export const store = configureStore({
  reducer: {
    api: apiSlice,
    modal: modalSlice,
  },
});
```

Then you can use it anywhere.

```jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearContent } from "../Store/modalSlice"; // global setter

export default function Modal() {
  const { content } = useSelector((state) => state.modal); // global state
  const dispatch = useDispatch();

  if (!content) return null; // Return early if there's no content

  return (
    <div className="modal">
      <div className="modal-window">
        <h2>Modal</h2>
        <p>{content}</p>
        <button onClick={() => dispatch(clearContent())}>Close</button>
      </div>
    </div>
  );
}
```

To navigate or link use the following:

```jsx
import { useNavigate } from "react-router-dom";

import { Link } from "react-router-dom";
```

Example.

```jsx
function onLogout(e) {
  e.preventDefault();
  // remove token and user data from memory, go to login
  localStorage.removeItem("token");
  // go to login
  navigate("/login");
}
```

```jsx
return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
```
