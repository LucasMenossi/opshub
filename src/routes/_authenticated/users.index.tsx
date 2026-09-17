import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { UsersPage } from "@/features/users";

const userSearchSchema = z.object({
  q: z.string().optional(),
  role: z.string().optional(),
  team: z.string().optional(),
  status: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/users/")({
  validateSearch: userSearchSchema,
  component: UsersPage,
});
