import { RouterProvider } from "@tanstack/react-router";

import { router } from "@/app/router/router";
import { AppProviders } from "./app/providers/AppProvider";

export default function App() {
  return (
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  );
}
