import { useState } from "react";

import { Container } from "@/components/ui";
import { PageHeader } from "@/components/data-display";

import { UserTable } from "../components";

export function UsersPage() {
  const [summary, setSummary] = useState({
    users: 0,
    teams: 0,
  });

  const userLabel = summary.users === 1 ? "user" : "users";
  const teamLabel = summary.teams === 1 ? "team" : "teams";

  return (
    <Container>
      <PageHeader
        title="Users"
        description={`${summary.users} ${userLabel} across ${summary.teams} ${teamLabel}.`}
      />
      <UserTable onSummaryChange={setSummary} />
    </Container>
  );
}
