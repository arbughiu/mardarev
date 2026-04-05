import path from "path";
import { fileURLToPath } from "url";

import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { s3Storage } from "@payloadcms/storage-s3";
import sharp from "sharp";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { Projects } from "./src/payload/collections/Projects";
import { Testimonials } from "./src/payload/collections/Testimonials";
import { TeamMembers } from "./src/payload/collections/TeamMembers";
import { ContactForms } from "./src/payload/collections/ContactForms";

import { SiteSettings } from "./src/payload/globals/SiteSettings";
import { Navigation } from "./src/payload/globals/Navigation";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  serverURL: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined,
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    schemaName: "payload",
  }),
  sharp,
  admin: {
    importMap: {
      baseDir: path.resolve(dirname, "src/app/(payload)/admin"),
    },
  },
  plugins: [
    s3Storage({
      collections: {
        media: true,
      },
      bucket: process.env.S3_BUCKET || "mardarev",
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || "",
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || "",
        },
        endpoint: process.env.S3_ENDPOINT || "",
        region: process.env.S3_REGION || "auto",
        forcePathStyle: true,
      },
    }),
  ],
  collections: [
    Users,
    Media,
    Projects,
    Testimonials,
    TeamMembers,
    ContactForms,
  ],
  globals: [SiteSettings, Navigation],
  upload: {
    limits: {
      fileSize: 20000000, // 20MB
    },
  },
});
