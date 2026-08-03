import { PageHeader } from "@/components/data-display";
import { Container } from "@/components/ui";

import { UserTable } from "../components";

export function UsersPage() {
  return (
    <Container>
      <PageHeader
        title="Users"
        description="Manage users, roles and team assignments."
      />

      <UserTable />
    </Container>
  );
}
