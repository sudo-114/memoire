import type { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Log in to Memoire",
  description: "Sign in to Memoire to access your notes and ideas.",
};

export default function Login() {
  return <LoginForm />;
}
