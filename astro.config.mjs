// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import partytown from "@astrojs/partytown";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://mattsappliancesla.com",
  output: "static",
  integrations: [
    react(),
    partytown({
      config: {
        forward: ["dataLayer.push"],
      },
    }),
    sitemap({
      filter: (page) =>
        ![
          "https://mattsappliancesla.com/locations/lafayette/",
          "https://mattsappliancesla.com/services/",
          "https://mattsappliancesla.com/services/delivery/",
          "https://mattsappliancesla.com/services/repairs/",
        ].includes(page),
    }),
  ],
});
