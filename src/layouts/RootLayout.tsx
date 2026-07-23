import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { AppLayout } from "./AppLayout";

export function RootLayout() {
  return (
    <>
      <AppLayout>
        <Outlet />
      </AppLayout>

      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
