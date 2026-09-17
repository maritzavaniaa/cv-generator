import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
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
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  const connected = await isDatabaseConnected();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-3 p-8 text-center">
      <h1 className="text-2xl font-semibold">Auto-Generate CV</h1>
      <p className="text-sm text-neutral-500">Phase 0 — Foundation Ready</p>
      {connected && (
        <p className="text-sm text-emerald-600">Database Connected</p>
      )}
      <Link
        href="/login"
        className="mt-3 inline-flex items-center gap-2 rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50"
      >
        Sign in
      </Link>
    </main>
  );
}
