import { requireScUser } from "@/lib/sc-auth";
import { prisma } from "@/lib/prisma";
import { hasCredentials } from "@/lib/sc-netsuite";
import { ConnectionTestPanel, type ConnectableEnvironment } from "./ConnectionTestPanel";
import { CsvUploadPreview } from "./CsvUploadPreview";

export default async function ImportDetectorPage() {
  const user = await requireScUser();

  const membership = await prisma.scOrgMember.findFirst({
    where: { userId: user.id },
    orderBy: { createdAt: "asc" },
    include: {
      org: {
        include: {
          nsAccounts: {
            where: { archivedAt: null },
            orderBy: { createdAt: "asc" },
            include: { environments: true },
          },
        },
      },
    },
  });

  const accounts = membership?.org.nsAccounts ?? [];
  const environments: ConnectableEnvironment[] = accounts.flatMap((account) =>
    account.environments
      .filter((env) => hasCredentials(env))
      .map((env) => ({
        id: env.id,
        accountName: account.name,
        envName: env.name,
        type: env.type,
      }))
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-brand-900">Import Doctor</h1>
        <p className="mt-1 text-sm text-brand-400">
          A pre-flight validator for NetSuite CSV imports, catching Internal ID/Name reference
          mismatches and other errors before you hit import. This is an early foundation build;
          full validation is coming in later phases.
        </p>
      </div>

      <ConnectionTestPanel environments={environments} />
      <CsvUploadPreview />
    </div>
  );
}
