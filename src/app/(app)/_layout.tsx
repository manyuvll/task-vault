import { Redirect, Stack } from "expo-router";

import { useAuth } from "~/core/auth";

export default function AppLayout() {
  const { session } = useAuth();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!session) {
    return <Redirect href="/sign-in" />;
  }

  // This layout can be deferred because it's not the root layout.
  return <Stack />;
}
