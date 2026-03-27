import dotenv from "dotenv";
import Redis from "ioredis";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL, {
  tls: {
    rejectUnauthorized: false,
  },
  connectTimeout: 10000,
});

redis.on("connect", () => {
  console.log("Redis connected");
});

redis.on("error", (err) => {
  console.log("Redis error:", err.message);
});