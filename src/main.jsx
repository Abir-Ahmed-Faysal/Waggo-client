import { RouterProvider } from "react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Router/Router.jsx";

import ContextProvider from "./Context/AuthContextProvider.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ThemeProvider from "./components/ThemeProvider.jsx";
import { ToastContainer } from "react-toastify";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <RouterProvider router={router} />
                <ToastContainer />
        </ThemeProvider>
      </QueryClientProvider>
    </ContextProvider>
  </StrictMode>
);
