import { redirect } from "react-router";
import { LoginForm } from "~/components/auth/login-form";
import { isAuthenticated } from "~/services/auth";

export async function clientLoader() {
  // If already authenticated, redirect to home
  if (isAuthenticated()) {
    throw redirect("/dashboard");
  }
  return null;
}

export default function Login() {
  return <LoginForm />;
}
