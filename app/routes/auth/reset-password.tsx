import { useSearchParams } from "react-router";
import { ResetForm } from "~/components/auth/reset-form";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || undefined;

  return <ResetForm token={token} />;
}
