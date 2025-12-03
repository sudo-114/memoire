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
import GoogleIcon from "@/components/ui/icons/google-icon";
import AppleFilledIcon from "@/components/ui/icons/apple-icon";
import PassController from "@/components/password-controller";
import EmailController from "@/components/email-controller";
import { JSX, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const user = z.object({
  name: z.string("Name is required").min(1, "Name is required").trim(),

  email: z.email("Enter a valid email address"),

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
  const [btn, setBtn] = useState<string | JSX.Element>("Create account");
  const [disBtn, setDisBtn] = useState(false);

  const form = useForm<User>({
    resolver: zodResolver(user),
    defaultValues: {
      terms: true,
    },
    mode: "all",
  });

  const onSubmit = async (data: User) => {
    setDisBtn(true);
    setBtn(<Spinner />);
    const apiUrl = process.env.NEXT_PUBLIC_API_REGISTER;
    try {
      const res = await fetch(apiUrl!, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Unexpected error occurred!");
      }

      const result = await res.json();
      console.log(result);

      if (result.error) {
        toast.error(result.error);
        return;
      }

      if (result.success) {
        toast.success(result.success);
        return;
      }
    } catch {
      toast("Unexpected error occurred! Try again later.");
    } finally {
      setDisBtn(false);
      setBtn("Create account");
    }
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

          <EmailController name="email" control={form.control} />

          <PassController
            name="pass"
            control={form.control}
            passComplete="new-password"
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
                  checked={field.value}
                  required
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

          <Button
            type="submit"
            disabled={disBtn}
            className="disabled:cursor-not-allowed"
          >
            {btn}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
