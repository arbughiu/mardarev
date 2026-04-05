import type { GlobalConfig } from "payload";

import { isAdmin } from "../access";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "MardareV Arhitectură",
    },
    {
      name: "siteDescription",
      type: "textarea",
    },
    {
      name: "tagline",
      type: "text",
      defaultValue: "Viziunea ta merită forma perfectă.",
    },
    {
      name: "taglineSubtitle",
      type: "textarea",
      defaultValue:
        "Proiecte personalizate, livrare rapidă și vizualizare 3D completă — de la concept la realitate.",
    },
    {
      name: "contactInfo",
      type: "group",
      fields: [
        {
          name: "email",
          type: "email",
        },
        {
          name: "phone",
          type: "text",
        },
        {
          name: "address",
          type: "textarea",
        },
        {
          name: "hours",
          type: "text",
        },
      ],
    },
    {
      name: "socialMedia",
      type: "group",
      fields: [
        {
          name: "facebook",
          type: "text",
        },
        {
          name: "instagram",
          type: "text",
        },
        {
          name: "linkedin",
          type: "text",
        },
      ],
    },
    {
      name: "stats",
      type: "group",
      fields: [
        {
          name: "projectsCompleted",
          type: "text",
          defaultValue: "150+",
        },
        {
          name: "projectsLabel",
          type: "text",
          defaultValue: "Proiecte finalizate",
        },
        {
          name: "yearsExperience",
          type: "text",
          defaultValue: "12",
        },
        {
          name: "yearsLabel",
          type: "text",
          defaultValue: "Ani de experiență",
        },
        {
          name: "avgDeliveryTime",
          type: "text",
          defaultValue: "45 zile",
        },
        {
          name: "deliveryLabel",
          type: "text",
          defaultValue: "Timp mediu de livrare",
        },
      ],
    },
    {
      name: "copyrightText",
      type: "text",
    },
  ],
};
