import { api } from "@/lib/api";

import type { ServicesResponse } from "./services.types";

export const servicesApi = {
  async getServices(): Promise<ServicesResponse> {
    const { data } = await api.get<ServicesResponse>("/services");

    return data;
  },
};
