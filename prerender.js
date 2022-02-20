const fs = require('fs-extra')
const path = require('path')

const toAbsolute = (p) => path.resolve(__dirname, p)

const manifest = require('./dist/static/ssr-manifest.json')
const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8')
const { render } = require('./dist/server/entry-server.js')

// TODO: Enable automatic generation of routes as an option
// determine routes to pre-render from src/pages
const routesToPrerender = fs
  .readdirSync(toAbsolute('src/pages'))
  .map((file) => {
    const name = file.replace(/\.vue$/, '').toLowerCase()
    return name === 'home' ? `/` : `/${name}`
  })

function compileTemplate(content, data) {
  return Object.entries(data).reduce((output, [key, value]) => {
    return output.replace(`<!--${key}-->`, value)
  }, content)
}

;(async () => {
  // pre-render each route...
  for (const url of routesToPrerender) {
    const templateData = await render(url, manifest)

    const compiled = compileTemplate(template, templateData)

    const dir = url === '/' ? '' : url
    const filePath = `dist/static${dir}/index.html`
    fs.outputFileSync(toAbsolute(filePath), compiled)
    console.log('pre-rendered:', filePath)
  }

  // done, delete ssr manifest
  // fs.unlinkSync(toAbsolute('dist/static/ssr-manifest.json'))
})()
