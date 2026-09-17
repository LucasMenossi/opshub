import { createFileRoute, redirect } from "@tanstack/react-router";

import { LoginPage } from "@/features/auth";
import { useAuthStore } from "@/stores/auth.store";

export const Route = createFileRoute("/login")({
  beforeLoad: () => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    if (isAuthenticated) {
      throw redirect({
        to: "/",
      });
    }
  },

  component: LoginPage,
});
