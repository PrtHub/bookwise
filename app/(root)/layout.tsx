import Header from "@/components/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  const user = await db
    .select()
    .from(users)
    .where(session?.user?.id ? eq(users.id, session.user.id) : undefined)
    .limit(1);

  // Update last activity date if it's not today
  if (
    user.length &&
    user[0].lastActivityDate !== new Date().toISOString().slice(0, 10)
  ) {
    after(async () => {
      if (!session?.user?.id) return;

      await db
        .update(users)
        .set({
          lastActivityDate: new Date().toISOString().slice(0, 10),
        })
        .where(eq(users.id, session.user.id));
    });
  }

  return (
    <main className="root-container">
      <div className="max-w-7xl mx-auto w-full">
        <Header session={session} />
        <div className="mt-20 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default Layout;
