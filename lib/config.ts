const config = {
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
    databaseUrl: process.env.DATABASE_URL as string,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
    },
    upstash: {
      redisRestUrl: process.env.UPSTASH_REDIS_REST_URL as string,
      redisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN as string,
    },
  },
};

export default config;
