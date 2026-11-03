import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";
import { MongoClient } from "mongodb";

// Reuse one Mongo connection across hot reloads in development
const globalForMongo = globalThis as unknown as { _bookNookMongo?: MongoClient };
const client = globalForMongo._bookNookMongo ?? new MongoClient(process.env.MONGODB_URI as string);
if (process.env.NODE_ENV !== "production") globalForMongo._bookNookMongo = client;

const db = client.db("booknook");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // after registering, the user is sent to the login page
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  // Issues JWTs (and publishes /api/auth/jwks) so the Express server can verify users
  plugins: [jwt()],
});
