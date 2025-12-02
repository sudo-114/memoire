"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import GoogleIcon from "@/components/ui/icons/google-icon";
import AppleFilledIcon from "@/components/ui/icons/apple-icon";
import Link from "next/link";
import EmailController from "@/components/email-controller";
import PassController from "@/components/password-controller";

const user = z.object({
  email: z
    .email("Enter a valid email address")
    .min(1, "Enter a valid email address"),

  pass: z
    .string("Password must be at least 8 characters long")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
      "Include at least one special character",
    )
    .regex(/[0-9]/, "Include at least one number")
    .regex(/[A-Z]/, "Include at least one uppercase")
    .regex(/[a-z]/, "Include at least one lowercase")
    .min(8, "Password must be at least 8 characters long"),

  persist: z.boolean(),
});

type User = z.infer<typeof user>;

export default function LoginForm() {
  const form = useForm<User>({
    resolver: zodResolver(user),
    defaultValues: {
      persist: true,
    },
    mode: "all",
  });

  const onSubmit = (data: User) => {
    toast(JSON.stringify(data));
  };

  return (
    <div className="m-5 max-w-md">
      <h1 className="text-3xl mb-3">Welcome back</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldDescription>Log in to your account</FieldDescription>

          <EmailController name="email" control={form.control} />

          <PassController
            name="pass"
            control={form.control}
            passComplete="current-password"
            forgetPass
          />

          <Controller
            name="persist"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} orientation="horizontal">
                <Checkbox
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  onCheckedChange={field.onChange}
                  checked={field.value}
                />
                <FieldLabel htmlFor={field.name}>Remember me</FieldLabel>
              </Field>
            )}
          />

          <Button type="submit">Log In</Button>

          <FieldSeparator>OR CONTINUE WITH</FieldSeparator>

          <Field orientation="horizontal">
            <Button type="button" variant="outline" className="flex-1">
              <GoogleIcon /> Google
            </Button>
            <Button type="button" variant="outline" className="flex-1">
              <AppleFilledIcon />
              Apple
            </Button>
          </Field>

          <FieldDescription className="text-center">
            Don&apos;t have an account? <Link href="/signup">Sign Up</Link>
          </FieldDescription>
        </FieldGroup>
      </form>
    </div>
  );
}
