export type HiringLocation = {
  slug: "jennings" | "lake-charles" | "lafayette";
  name: string;
  enabled: boolean;
  url: string;
  pagePath: string;
};

export const hiringLocations: HiringLocation[] = [
  {
    slug: "jennings",
    name: "Jennings",
    enabled: true,
    url: "https://mattsappliancesjenningsllc.easyapply.co/",
    pagePath: "/locations/jennings",
  },
  {
    slug: "lake-charles",
    name: "Lake Charles",
    enabled: true,
    url: "https://mattsusedappliancesllc9532.easyapply.co/",
    pagePath: "/locations/lake-charles",
  },
  {
    slug: "lafayette",
    name: "Lafayette",
    enabled: false,
    url: "",
    pagePath: "/locations/lafayette",
  },
];

export const openHiringLocations = hiringLocations.filter(
  (location) => location.enabled && location.url,
);

export const isHiring = openHiringLocations.length > 0;

export const getHiringLocation = (slug: HiringLocation["slug"]) =>
  hiringLocations.find((location) => location.slug === slug);
