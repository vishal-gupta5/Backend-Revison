const redis = require("redis");

const redisClient = redis.createClient({
  username: "default",
  password: "owjeGsHzrcr4RSbU4uNonTVf33pOLhS9",
  socket: {
    host: "tendency-loved-wrench-33427.db.redis.io",
    port: 19564,
  },
});

const connectRedis = async () => {
    await redisClient.connect();
    console.log("Connect to Redis!");
}

connectRedis();

module.exports = redisClient;