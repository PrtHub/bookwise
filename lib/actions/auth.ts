"use server";

import { hash } from "bcryptjs";
import { eq } from "drizzle-orm";

import { signIn } from "@/auth";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { headers } from "next/headers";
import { ratelimit } from "@/lib/ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflow";
import config from "../config";

export const signinWithCredentials = async (
  params: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = params;

  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return redirect("/too-fast");
    }

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      return {
        success: false,
        error: result.error,
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.log("SIGN_IN_WITH_CREDENTIALS", error);
    return {
      success: false,
      error: "Sign in failed",
    };
  }
};

export const SignUp = async (params: AuthCredentials) => {
  const { fullName, email, password, universityId, universityCard } = params;

  try {
    const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return redirect("/too-fast");
    }

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return {
        success: false,
        error: "User already exists",
      };
    }

    const hashedPassword = await hash(password, 10);

    await db.insert(users).values({
      fullName,
      email,
      password: hashedPassword,
      universityId,
      universityCard,
    });

    await workflowClient.trigger({
      url: `${config.env.prodApiUrl}/api/workflow/onboarding`,
      body: {
        email,
        fullName,
      },
    });

    await signinWithCredentials({
      email,
      password,
    });

    return { success: true };
  } catch (error) {
    console.log("SIGN_UP_ERROR", error);
    return {
      success: false,
      error: "Sign up failed",
    };
  }
};
