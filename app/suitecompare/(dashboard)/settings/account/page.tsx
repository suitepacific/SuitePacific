import { requireScUser } from "@/lib/sc-auth";
import { AccountSettingsForm } from "./AccountSettingsForm";

export default async function AccountSettingsPage() {
  const user = await requireScUser();
  return <AccountSettingsForm name={user.name} email={user.email} />;
}
