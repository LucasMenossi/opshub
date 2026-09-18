import { useState } from "react";

import { Container } from "@/components/UI";
import { PageHeader } from "@/components/DataDisplay";

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
      <div className="space-y-8">
        <PageHeader
          title="Users"
          description={`${summary.users} ${userLabel} across ${summary.teams} ${teamLabel}.`}
        />
        <UserTable onSummaryChange={setSummary} />
      </div>
    </Container>
  );
}
