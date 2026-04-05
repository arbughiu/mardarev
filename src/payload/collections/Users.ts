import type { CollectionConfig } from "payload";

import { isAdmin, isAdminOrSelf } from "../access";

export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    tokenExpiration: 86400,
    maxLoginAttempts: 5,
    lockTime: 600000,
  },
  admin: {
    useAsTitle: "name",
    group: "Gestionare",
  },
  access: {
    create: isAdmin,
    read: isAdminOrSelf,
    update: isAdminOrSelf,
    delete: isAdmin,
  },
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      defaultValue: ["editor"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
      access: {
        update: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
      },
      hooks: {
        beforeChange: [
          ({ req, value, operation }) => {
            // First user automatically becomes admin
            if (operation === "create" && !req.user) {
              return ["admin"];
            }
            return value;
          },
        ],
      },
    },
  ],
};
