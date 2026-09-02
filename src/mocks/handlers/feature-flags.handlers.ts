import { featureFlags } from "@/features/feature-flags/data/feature-flags";

import { http, HttpResponse } from "msw";

export const featureFlagHandlers = [
  http.get("/api/feature-flags", async () => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    return HttpResponse.json(featureFlags);
  }),

  http.patch("/api/feature-flags/:id", async ({ params, request }) => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });

    const featureFlag = featureFlags.find((flag) => flag.id === params.id);

    if (!featureFlag) {
      return HttpResponse.json(
        {
          message: "Feature flag not found",
        },
        {
          status: 404,
        },
      );
    }

    const body = (await request.json()) as {
      enabled: boolean;
    };

    featureFlag.enabled = body.enabled;

    return HttpResponse.json(featureFlag);
  }),
];
