import { settings } from "@/features/settings";
import { http, HttpResponse } from "msw";

export const settingsHandlers = [
  http.get("/api/settings", async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return HttpResponse.json(settings);
  }),

  http.patch("/api/settings", async ({ request }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const body = (await request.json()) as Partial<typeof settings>;

    Object.assign(settings, body);

    return HttpResponse.json(settings);
  }),
];
