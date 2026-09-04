import { useEffect } from "react";

import { useForm, type FieldErrors } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { AlertCircle, Check, Loader2, Moon, Monitor, Sun } from "lucide-react";

import { PageHeader } from "@/components/DataDisplay";
import { Container, Input } from "@/components/UI";
import { PageErrorState } from "@/components/PageState";

import { Button, Card, Select } from "@/components/UI";

import { useSettings, useUpdateSettings } from "../hooks";

import {
  settingsSchema,
  type Settings,
  type Theme,
} from "../api/settings.types";

import { SettingsPageSkeleton, SettingsSection } from "../components";
import { useThemeStore } from "@/stores/theme.store";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs text-red-600">{message}</p>;
}

function ThemeOption({
  value,
  selected,
  label,
  description,
  icon: Icon,
  onSelect,
}: {
  value: Theme;
  selected: boolean;
  label: string;
  description: string;
  icon: typeof Sun;
  onSelect: (value: Theme) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      className={`flex flex-1 items-start gap-3 rounded-xl border p-4 text-left transition-colors ${
        selected
          ? "border-foreground bg-muted text-foreground"
          : "border-border bg-background text-foreground hover:border-foreground/40 hover:bg-muted/50"
      }`}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />

      <span>
        <span className="block text-sm font-medium">{label}</span>

        <span className="mt-1 block text-xs text-muted-foreground">
          {description}
        </span>
      </span>

      {selected && <Check className="ml-auto h-4 w-4" aria-hidden="true" />}
    </button>
  );
}

export function SettingsPage() {
  const { data, isPending, isError, refetch } = useSettings();

  const updateSettings = useUpdateSettings();

  const setTheme = useThemeStore((state) => state.setTheme);

  const form = useForm<Settings>({
    resolver: zodResolver(settingsSchema),
    defaultValues: data,
  });

  const theme = form.watch("theme");

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [data, form]);

  const onSubmit = (values: Settings) => {
    updateSettings.mutate(values);
  };

  if (isPending) {
    return (
      <Container>
        <SettingsPageSkeleton />
      </Container>
    );
  }

  if (isError || !data) {
    return (
      <PageErrorState
        title="Unable to load settings"
        description="Your preferences could not be loaded."
        onRetry={() => void refetch()}
      />
    );
  }

  const errors = form.formState.errors as FieldErrors<Settings>;

  return (
    <Container>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PageHeader
          title="Settings"
          description="Personalize your OpsHub experience and notification preferences."
        />

        <SettingsSection
          title="Appearance"
          description="Choose how OpsHub should look. Changes are applied immediately."
        >
          <div className="flex flex-col gap-3 md:flex-row">
            <ThemeOption
              value="light"
              selected={theme === "light"}
              label="Light"
              description="Use the light interface."
              icon={Sun}
              onSelect={(value) => {
                form.setValue("theme", value, {
                  shouldDirty: true,
                });

                setTheme(value);
              }}
            />

            <ThemeOption
              value="dark"
              selected={theme === "dark"}
              label="Dark"
              description="Use the dark interface."
              icon={Moon}
              onSelect={(value) => {
                form.setValue("theme", value, {
                  shouldDirty: true,
                });

                setTheme(value);
              }}
            />

            <ThemeOption
              value="system"
              selected={theme === "system"}
              label="System"
              description="Follow your device preference."
              icon={Monitor}
              onSelect={(value) => {
                form.setValue("theme", value, {
                  shouldDirty: true,
                });

                setTheme(value);
              }}
            />
          </div>
        </SettingsSection>

        <SettingsSection
          title="Profile"
          description="Update the profile information associated with your OpsHub account."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium">
              Name
              <Input className="mt-2" {...form.register("profile.name")} />
              <FieldError message={errors.profile?.name?.message} />
            </label>

            <label className="text-sm font-medium">
              Email
              <Input className="mt-2" {...form.register("profile.team")} />
              <FieldError message={errors.profile?.email?.message} />
            </label>

            <label className="text-sm font-medium">
              Team
              <Input className="mt-2" {...form.register("profile.team")} />
              <FieldError message={errors.profile?.team?.message} />
            </label>

            <label className="text-sm font-medium">
              Role
              <Input className="mt-2" {...form.register("profile.role")} />
              <FieldError message={errors.profile?.role?.message} />
            </label>
          </div>
        </SettingsSection>

        <SettingsSection
          title="Notifications"
          description="Choose which operational events should generate notifications."
        >
          <div className="space-y-4">
            {(
              [
                [
                  "deployments",
                  "Deployment notifications",
                  "Receive updates when deployments change state.",
                ],
                [
                  "incidents",
                  "Incident notifications",
                  "Receive updates about incident lifecycle changes.",
                ],
                [
                  "featureFlags",
                  "Feature flag updates",
                  "Receive updates when feature flags are changed.",
                ],
              ] as const
            ).map(([name, label, description]) => (
              <label
                key={name}
                className="flex cursor-pointer items-start gap-3"
              >
                <input
                  type="checkbox"
                  className="mt-1 h-4 w-4"
                  {...form.register(`notifications.${name}`)}
                />

                <span>
                  <span className="block text-sm font-medium">{label}</span>

                  <span className="block text-xs text-zinc-500">
                    {description}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </SettingsSection>

        <SettingsSection
          title="Preferences"
          description="Configure defaults used throughout the application."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="text-sm font-medium">
              Default landing page
              <Select
                className="mt-2"
                {...form.register("preferences.defaultLandingPage")}
              >
                <option value="dashboard">Dashboard</option>

                <option value="services">Services</option>

                <option value="deployments">Deployments</option>

                <option value="incidents">Incidents</option>

                <option value="logs">Logs</option>

                <option value="feature-flags">Feature Flags</option>

                <option value="users">Users</option>
              </Select>
            </label>

            <label className="text-sm font-medium">
              Default table page size
              <Select
                className="mt-2"
                {...form.register("preferences.defaultPageSize", {
                  valueAsNumber: true,
                })}
              >
                <option value={10}>10 rows</option>

                <option value={25}>25 rows</option>

                <option value={50}>50 rows</option>

                <option value={100}>100 rows</option>
              </Select>
            </label>

            <label className="text-sm font-medium">
              Density
              <Select
                className="mt-2"
                {...form.register("preferences.density")}
              >
                <option value="comfortable">Comfortable</option>

                <option value="compact">Compact</option>
              </Select>
            </label>

            <label className="text-sm font-medium">
              Date and time format
              <Select
                className="mt-2"
                {...form.register("preferences.dateTimeFormat")}
              >
                <option value="24h">24-hour</option>

                <option value="12h">12-hour</option>
              </Select>
            </label>
          </div>
        </SettingsSection>

        <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          {updateSettings.isError ? (
            <p
              className="flex items-center gap-2 text-sm text-red-600"
              role="alert"
            >
              <AlertCircle className="h-4 w-4" aria-hidden="true" />
              We could not save your changes. Please try again.
            </p>
          ) : (
            <p className="text-sm text-zinc-500">
              Changes are saved through the settings API.
            </p>
          )}

          <Button
            type="submit"
            disabled={updateSettings.isPending || !form.formState.isDirty}
          >
            {updateSettings.isPending && (
              <Loader2
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
            )}
            Save changes
          </Button>
        </Card>
      </form>
    </Container>
  );
}
