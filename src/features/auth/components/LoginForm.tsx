import { useState } from "react";

import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { useAuthStore } from "@/stores/auth.store";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [authError, setAuthError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),

    defaultValues: {
      email: "admin@opshub.dev",
      password: "opshub",
    },
  });

  const onSubmit = (data: LoginFormData) => {
    setAuthError(null);

    const isAuthenticated = login(data.email, data.password);

    if (!isAuthenticated) {
      setAuthError("Invalid email or password.");
      return;
    }

    navigate({
      to: "/",
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="admin@opshub.dev"
          {...register("email")}
        />

        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <Input
          id="password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          {...register("password")}
        />

        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      {authError && (
        <p role="alert" className="text-sm text-destructive">
          {authError}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isSubmitting}>
        Sign in
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        Demo credentials: admin@opshub.dev / opshub
      </p>
    </form>
  );
}
