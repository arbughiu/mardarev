import type { CollectionConfig } from "payload";

import { isAdmin } from "../access";

export const ContactForms: CollectionConfig = {
  slug: "contact-forms",
  admin: {
    useAsTitle: "email",
    group: "Mesaje",
  },
  access: {
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  timestamps: true,
  fields: [
    {
      name: "name",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
    },
    {
      name: "phone",
      type: "text",
    },
    {
      name: "projectType",
      type: "select",
      options: [
        { label: "Rezidențial", value: "rezidential" },
        { label: "Comercial", value: "comercial" },
        { label: "Design Interior", value: "interior" },
        { label: "Peisagistică", value: "peisagistica" },
      ],
    },
    {
      name: "message",
      type: "textarea",
      required: true,
    },
    {
      name: "status",
      type: "select",
      defaultValue: "new",
      options: [
        { label: "Nou", value: "new" },
        { label: "În progres", value: "in_progress" },
        { label: "Rezolvat", value: "resolved" },
        { label: "Spam", value: "spam" },
      ],
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "notes",
      type: "textarea",
      admin: {
        description: "Note interne - vizibile doar pentru administratori",
      },
      access: {
        read: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
        update: ({ req: { user } }) => Boolean(user?.roles?.includes("admin")),
      },
    },
  ],
};
