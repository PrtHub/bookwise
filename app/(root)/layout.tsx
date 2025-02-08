import Header from "@/components/header";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();

  if (!session) redirect("/sign-in");

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
