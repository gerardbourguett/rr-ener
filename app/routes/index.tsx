import { redirect } from "react-router";
import { getUser } from "~/services/auth";

/**
 * Root route handler
 * Redirects to /dashboard if authenticated, or /auth/login if not
 */
export async function clientLoader() {
  const user = getUser();

  if (user) {
    throw redirect("/dashboard");
  }

  throw redirect("/auth/login");
}

// This component never renders because loader always redirects
export default function Index() {
  return null;
}
