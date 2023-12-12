import {
  RouterProvider,
  createBrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/route/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import WithoutAuthRoute from "./components/route/WithoutAuthRoute";
import About from "./routes/About";
import Notes from "./routes/notes/Notes";
import Note from "./routes/notes/Note";
import NoteCreate from "./routes/notes/NoteCreate";
import NoteEdit from "./routes/notes/NoteEdit";
import NotFound from "./routes/NotFound";
import MainLayout from "./components/MainLayout";

import { Provider } from "react-redux";
import store, { persistor } from "./redux";
import { PersistGate } from "redux-persist/integration/react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        ),
        children: [
          {
            path: "/",
            element: <Navigate to="/about" />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: "notes",
            element: <Notes />,
          },
          {
            path: "notes/create",
            element: <NoteCreate />,
          },
          {
            path: "notes/:id",
            element: <Note />,
          },
          {
            path: "notes/:id/edit",
            element: <NoteEdit />,
          },
        ],
      },
      {
        path: "/auth",
        element: (
          <WithoutAuthRoute>
            <Outlet />
          </WithoutAuthRoute>
        ),
        children: [
          {
            path: "login",
            element: <Login />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<div>loading...</div>} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
