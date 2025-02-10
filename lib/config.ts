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
      qstashUrl: process.env.QSTASH_URL as string,
      qstashToken: process.env.QSTASH_TOKEN as string,
      qstashCurrentSigningKey: process.env.QSTASH_CURRENT_SIGNING_KEY as string,
      qstashNextSigningKey: process.env.QSTASH_NEXT_SIGNING_KEY as string,
    },
  },
};

export default config;
