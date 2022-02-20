import config from '../app.config.js'

function generateMeta(propertyName, propertyValue, content) {
  return { [propertyName]: propertyValue, content }
}

function sanitiseDescription(str) {
  return str
    .replace(/\[(.*)]\(.*\)/g, '$1') // Markup links
    .replace(/<\/?.+>/, '') // Html tags
}

export default (opts) => {
  const url = config.url
  const title = opts.title
  // TODO: update to include prefix/suffix
  const documentTitle = title
  const head = {
    title,
    link: { rel: 'canonical', href: url },
  }

  if (!opts.image && !opts.description) return head

  const image = url + opts.image

  const maxDescriptionLength = 197
  const sanitizedDescription = sanitiseDescription(opts.description)
  const description =
    sanitizedDescription.length > maxDescriptionLength
      ? sanitizedDescription.substr(0, maxDescriptionLength) + '...'
      : sanitizedDescription

  const meta = [
    generateMeta('name', 'description', description),
    generateMeta('name', 'twitter:title', documentTitle),
    generateMeta('name', 'twitter:description', description),
    generateMeta('name', 'twitter:image:src', image),
    generateMeta('name', 'twitter:image:alt', title),
    generateMeta('property', 'og:title', documentTitle),
    generateMeta('property', 'og:description', description),
    generateMeta('property', 'og:image', image),
    generateMeta('property', 'og:image:alt', title),
    generateMeta('property', 'og:url', url),
  ]

  if (opts.type) meta.push(generateMeta('property', 'og:type', opts.type))

  return Object.assign(head, { meta })
}
