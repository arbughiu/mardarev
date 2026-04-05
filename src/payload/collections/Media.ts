import type { CollectionConfig } from "payload";

import { isAdmin, isLoggedIn } from "../access";

export const Media: CollectionConfig = {
  slug: "media",
  admin: {
    group: "Conținut",
  },
  access: {
    create: isLoggedIn,
    read: () => true,
    update: isLoggedIn,
    delete: isAdmin,
  },
  upload: {
    mimeTypes: ["image/*", "video/*"],
    adminThumbnail: "thumbnail",
    imageSizes: [
      {
        name: "thumbnail",
        width: 400,
        height: 300,
        position: "centre",
      },
      {
        name: "card",
        width: 768,
        height: 1024,
        position: "centre",
      },
      {
        name: "hero",
        width: 1920,
        height: 1080,
        position: "centre",
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
    },
    {
      name: "caption",
      type: "textarea",
    },
  ],
};
