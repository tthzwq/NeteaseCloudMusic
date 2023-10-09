import { createBrowserRouter, Navigate } from "react-router-dom";

import Layout from "../layout/index.jsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/discovery" replace={true} />,
  },
  {
    path: "/discovery",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("@/views/discovery/recommend/index.jsx"),
      },
      {
        path: "playlist",
        lazy: () => import("@/views/discovery/play-list/index.jsx"),
      },
      {
        path: "toplist",
        lazy: () => import("@/views/discovery/top-list/index.jsx"),
      },
      {
        path: "artist",
        lazy: () => import("@/views/discovery/art-ist/index.jsx"),
      },
      {
        path: "album",
        lazy: () => import("@/views/discovery/album/index.jsx"),
      },
    ],
  },
  {
    path: "/my",
    element: <Layout />,
    children: [
      {
        index: true,
        lazy: () => import("@/views/my/index.jsx"),
      },
    ],
  }
]);

export default router;
