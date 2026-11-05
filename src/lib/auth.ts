import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

const authSecret = process.env.BETTER_AUTH_SECRET;

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is not configured");
}

// Live site URL, e.g. https://booknook-client-rez24.vercel.app (no trailing slash)
const baseURL = (process.env.BETTER_AUTH_URL || "http://localhost:3000").replace(/\/$/, "");

const globalForMongo = globalThis as unknown as {
  _bookNookMongo?: MongoClient;
};

const client =
  globalForMongo._bookNookMongo ??
  new MongoClient(process.env.MONGODB_URI as string);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._bookNookMongo = client;
}

const db = client.db("booknook");

export const auth = betterAuth({
  secret: authSecret,
  baseURL,
  trustedOrigins: [baseURL],

  database: mongodbAdapter(db),

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  // Lets someone who registered with email later sign in with Google on the same address
  account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google"],
    },
  },

  plugins: [jwt()],
});