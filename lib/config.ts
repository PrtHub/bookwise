const config = {
  env: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL as string,
    databaseUrl: process.env.DATABASE_URL as string,
    imageKit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY as string,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT as string,
    },
  },
};

export default config;
