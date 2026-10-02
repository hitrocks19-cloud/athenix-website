/** Public address of the site. Override with SITE_URL (e.g. for a staging domain). */
export const siteUrl = (process.env.SITE_URL || "https://www.athenixlearning.com").replace(/\/$/, "");
