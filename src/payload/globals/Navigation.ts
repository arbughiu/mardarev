import type { GlobalConfig } from "payload";

import { isAdmin } from "../access";

export const Navigation: GlobalConfig = {
  slug: "navigation",
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: "headerLinks",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "order",
          type: "number",
        },
      ],
    },
    {
      name: "footerLinks",
      type: "array",
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
        {
          name: "href",
          type: "text",
          required: true,
        },
        {
          name: "order",
          type: "number",
        },
      ],
    },
  ],
};
