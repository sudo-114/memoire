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
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import GoogleIcon from "@/components/ui/icons/google-icon";
import AppleFilledIcon from "@/components/ui/icons/apple-icon";

const user = z.object({
  name: z.string("Name is required").min(1, "Name is required").trim(),

  email: z.email("Please enter a valid email address"),

  pass: z
    .string("Password should be at least 8 characters long")
    .regex(
      /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]/,
      "Include at least one special character",
    )
    .regex(/[A-Z]/, "Include at least one uppercase")
    .regex(/[a-z]/, "Include at least one lowercase")
    .regex(/[0-9]/, "Include at least one number")
    .min(8, "Password should be at least 8 characters long"),

  terms: z.boolean(),
});

type User = z.infer<typeof user>;

export default function RegisterForm() {
  const [toggle, setToggle] = useState(<Eye />);
  const [type, setType] = useState("password");
  const [visible, setVisible] = useState(false);

  const showPass = () => {
    const next = !visible;
    setVisible(next);
    setToggle(next ? <EyeOff /> : <Eye />);
    setType(next ? "text" : "password");
  };

  const form = useForm<User>({
    resolver: zodResolver(user),
  });

  const onSubmit = (data: User) => {
    toast(JSON.stringify(data, null, 2));
  };

  return (
    <div className="m-4 max-w-md">
      <h1 className="text-3xl mb-3">Create your Memoire account</h1>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <FieldDescription>
            Already have an account? <Link href="/login">Log In</Link>
          </FieldDescription>

          <Field>
            <Button variant="outline" type="button">
              <GoogleIcon /> Sign up with Google
            </Button>
            <Button variant="outline" type="button">
              <AppleFilledIcon /> Sign up with Apple
            </Button>
          </Field>

          <FieldSeparator>OR</FieldSeparator>

          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                />

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  {...field}
                  id={field.name}
                  type="email"
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
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>

                <div className="relative">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-lg"
                    onClick={showPass}
                    className="absolute right-0 -top-0.5"
                  >
                    {toggle}
                  </Button>

                  <Input
                    {...field}
                    id={field.name}
                    aria-invalid={fieldState.invalid}
                    type={type}
                    placeholder="●●●●●●●●●●"
                    autoComplete="new-password"
                    className="pr-10"
                  />
                </div>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="terms"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                <Checkbox
                  id={field.name}
                  aria-invalid={fieldState.invalid}
                  onCheckedChange={field.onChange}
                  checked
                />
                <FieldLabel htmlFor={field.name}>
                  <p>
                    By creating account, you agree to our{" "}
                    <Link href="/terms" className="text-blue-500">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-blue-500">
                      Privacy Policy
                    </Link>
                  </p>
                </FieldLabel>
              </Field>
            )}
          />

          <Button type="submit">Create account</Button>
        </FieldGroup>
      </form>
    </div>
  );
}
