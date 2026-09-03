import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

import { updateSettings, type Settings } from "../api";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (settings: Settings) => updateSettings(settings),

    onSuccess: (settings) => {
      queryClient.setQueryData(["settings"], settings);

      toast.success("Settings saved");
    },

    onError: () => {
      toast.error("Unable to save settings. Please try again.");
    },
  });
}
