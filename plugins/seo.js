import config from "../app.config.js";

function generateMeta(name, content) {
  const keyAttr = name.substr(0, 3) === "og:" ? "property" : "name";
  return { [keyAttr]: name, content };
}

function sanitiseDescription(str) {
  return str
    .replace(/\[(.*)]\(.*\)/g, "$1") // Markup links
    .replace(/<\/?.+>/, ""); // Html tags
}

export default (opts) => {
  const url = config.url;
  const title = opts.title;
  // TODO: update to include prefix/suffix
  const documentTitle = title;
  const head = {
    title,
    link: { rel: "canonical", href: url },
  };

  if (!opts.image && !opts.description) return head;

  const image = url + opts.image;

  const maxDescriptionLength = 197;
  const sanitizedDescription = sanitiseDescription(opts.description);
  const description =
    sanitizedDescription.length > maxDescriptionLength
      ? sanitizedDescription.substr(0, maxDescriptionLength) + "..."
      : sanitizedDescription;

  const meta = [
    generateMeta("description", description),
    generateMeta("twitter:title", documentTitle),
    generateMeta("twitter:description", description),
    generateMeta("twitter:image:src", image),
    generateMeta("twitter:image:alt", title),
    generateMeta("og:title", documentTitle),
    generateMeta("og:description", description),
    generateMeta("og:image", image),
    generateMeta("og:image:alt", title),
    generateMeta("og:url", url),
  ];

  if (opts.type) meta.push(generateMeta("og:type", opts.type));

  return Object.assign(head, { meta });
};
