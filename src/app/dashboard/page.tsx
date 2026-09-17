import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-2xl font-semibold">
        Welcome, {session.user.name ?? session.user.email}
      </h1>
      <p className="text-sm text-neutral-500">{session.user.email}</p>
      <p className="text-sm text-neutral-500">Your CV workspace is ready.</p>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/login" });
        }}
      >
        <button
          type="submit"
          className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-neutral-50"
        >
          Sign Out
        </button>
      </form>
    </main>
  );
}
