import imagekit from "imagekit";
import { NextResponse } from "next/server";

import config from "@/lib/config";

const {
  env: {
    imageKit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

const imageKit = new imagekit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imageKit.getAuthenticationParameters());
}
