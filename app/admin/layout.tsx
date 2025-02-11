import "@/styles/admin.css";

import { auth } from "@/auth";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
import { redirect } from "next/navigation";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const AdminLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

  const isAdmin = await db
    .select({ isAdmin: users.role })
    .from(users)
    .where(session?.user?.id ? eq(users.id, session?.user?.id) : undefined)
    .limit(1)
    .then((res) => res[0]?.isAdmin === "ADMIN");

  if (!isAdmin) return redirect("/");

  return (
    <main className="flex min-h-screen w-full max-w-[1920px] mx-auto flex-row">
      <Sidebar session={session} />

      <div className="admin-container">
        <Header session={session} />
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
