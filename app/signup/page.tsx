import type { Metadata } from "next";
import RegisterForm from "./RegisterForm";
export const metadata: Metadata = {
  title: "Create a Memoire account",
  description:
    "Sign up for Memoire to start capturing your thoughts, ideas, and memories.",
};

export default function Register() {
  return <RegisterForm />;
}
