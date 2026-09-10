import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

async function isDatabaseConnected() {
  try {
    await db.$queryRaw`SELECT 1`;
    return true;
  } catch {
    return false;
  }
}

export default async function Home() {
  const connected = await isDatabaseConnected();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-2xl font-semibold">Auto-Generate CV</h1>
      <p className="text-sm text-neutral-500">Phase 0 — Foundation Ready</p>
      {connected && (
        <p className="text-sm text-emerald-600">Database Connected</p>
      )}
    </main>
  );
}
