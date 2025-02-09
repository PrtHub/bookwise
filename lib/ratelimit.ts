import { redis } from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.fixedWindow(5, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});