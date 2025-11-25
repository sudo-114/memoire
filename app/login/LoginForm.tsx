"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import GoogleIcon from "@/components/ui/icons/google-icon";
import AppleFilledIcon from "@/components/ui/icons/apple-icon";
import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const user = z.object({
  email: z
    .email("Please enter a valid email address")
    .min(1, "Please enter a valid email address"),

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
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("password");
  const [toggle, setToggle] = useState(<Eye />);

  const showPass = () => {
    const next = !visible;
    setVisible(next);
    setType(next ? "text" : "password");
    setToggle(next ? <EyeOff /> : <Eye />);
  };

  const form = useForm<User>({
    resolver: zodResolver(user),
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

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  type="email"
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  placeholder="jdoe@example.com"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="pass"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field>
                <div className="relative">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <Link
                    href="reset-password"
                    className="absolute right-0 top-0 text-sm font-semibold text-blue-500"
                  >
                    Forget Password?
                  </Link>
                </div>

                <div className="relative">
                  <Input
                    {...field}
                    type={type}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    placeholder="●●●●●●●●●●"
                    autoComplete="current-password"
                    className="pr-10"
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    onClick={showPass}
                    className="absolute right-0 -top-0.5"
                  >
                    {toggle}
                  </Button>
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
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
                  checked
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
