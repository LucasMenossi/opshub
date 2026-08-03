import { api } from "@/lib/api";

import type { User } from "./users.types";

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get<User[]>("/users");

  return data;
}
