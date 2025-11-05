export function setSeo({ title, description, url, image, favicon }) {
  if (title) document.title = title

  function upsertMetaByName(name, content) {
    if (!content) return
    let el = document.head.querySelector(`meta[name="${name}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('name', name)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function upsertMetaByProperty(property, content) {
    if (!content) return
    let el = document.head.querySelector(`meta[property="${property}"]`)
    if (!el) {
      el = document.createElement('meta')
      el.setAttribute('property', property)
      document.head.appendChild(el)
    }
    el.setAttribute('content', content)
  }

  function upsertLink(rel, href, extras = {}) {
    if (!href) return
    let el = document.head.querySelector(`link[rel="${rel}"]`)
    if (!el) {
      el = document.createElement('link')
      el.setAttribute('rel', rel)
      document.head.appendChild(el)
    }
    el.setAttribute('href', href)
    Object.entries(extras).forEach(([k, v]) => el.setAttribute(k, v))
  }

  // Basic
  upsertMetaByName('description', description)

  // Open Graph (LinkedIn)
  upsertMetaByProperty('og:type', 'website')
  upsertMetaByProperty('og:title', title)
  upsertMetaByProperty('og:description', description)
  upsertMetaByProperty('og:url', url)
  upsertMetaByProperty('og:image', image)
  upsertMetaByProperty('og:image:alt', 'Your Tool preview')

  // Twitter
  upsertMetaByName('twitter:card', 'summary_large_image')
  upsertMetaByName('twitter:title', title)
  upsertMetaByName('twitter:description', description)
  upsertMetaByName('twitter:image', image)
  upsertMetaByName('twitter:url', url)

  // Favicon
  upsertLink('icon', favicon, { type: 'image/x-icon', sizes: 'any' })
  upsertLink('shortcut icon', favicon)
  // Optional PWA/iOS
  upsertLink('apple-touch-icon', '/apple-touch-icon.png')
  upsertLink('manifest', '/site.webmanifest')
}
