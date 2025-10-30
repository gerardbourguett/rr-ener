import { redirect } from "react-router";
import { removeUser } from "~/services/auth";

export async function clientAction() {
  removeUser();
  throw redirect("/auth/login");
}

export async function clientLoader() {
  throw redirect("/");
}
