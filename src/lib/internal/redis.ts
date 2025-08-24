import { createClient } from "redis";

// Create a single Redis client instance with connection pooling
const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    connectTimeout: 10000,
    lazyConnect: true,
  },
  retry_strategy: (options) => {
    if (options.total_retry_time > 1000 * 60 * 60) {
      // End reconnecting after a specific timeout and flush all commands with an error
      return new Error('Retry time exhausted');
    }
    if (options.attempt > 10) {
      // End reconnecting with built in error
      return undefined;
    }
    // Reconnect after
    return Math.min(options.attempt * 100, 3000);
  }
});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis connected"));
redisClient.on("end", () => console.log("Redis disconnected"));
redisClient.on("ready", () => console.log("Redis ready"));

// Connect once
await redisClient.connect();

export const redis = redisClient;
export const redisPublisher = redisClient; // Use same client for both to avoid connection limits
