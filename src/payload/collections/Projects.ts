import type { CollectionConfig } from "payload";

import { isAdmin } from "../access";

const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/[ăâ]/g, "a")
    .replace(/[îï]/g, "i")
    .replace(/[șş]/g, "s")
    .replace(/[țţ]/g, "t")
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "year", "featured"],
    group: "Conținut",
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data }) => {
        if (data && !data.slug && data.title) {
          data.slug = formatSlug(data.title);
        }
        return data;
      },
    ],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "category",
      type: "select",
      options: [
        { label: "Rezidențial", value: "rezidential" },
        { label: "Comercial", value: "comercial" },
        { label: "Design Interior", value: "interior" },
        { label: "Peisagistică", value: "peisagistica" },
      ],
    },
    {
      name: "categoryLabel",
      type: "text",
      admin: {
        description: 'Etichetă afișată pentru categorie (ex: "Rezidențial")',
      },
    },
    {
      name: "year",
      type: "number",
      required: true,
    },
    {
      name: "location",
      type: "text",
      required: true,
    },
    {
      name: "area",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "details",
      type: "richText",
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "heroImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "galleryImages",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "order",
      type: "number",
      admin: {
        position: "sidebar",
      },
    },
  ],
};
