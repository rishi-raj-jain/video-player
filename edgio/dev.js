const { join } = require('path')
const { existsSync } = require('fs')
const { createDevServer } = require('@edgio/core/dev')
const { DeploymentBuilder } = require('@edgio/core/deploy')

const appDir = process.cwd()
const SW_SOURCE = join(appDir, 'sw', 'service-worker.ts')
const SW_DEST = join(appDir, '.edgio', 'temp', 'service-worker.js')

module.exports = function () {
  if (existsSync(SW_SOURCE)) {
    const builder = new DeploymentBuilder()
    builder.buildServiceWorker(SW_SOURCE, SW_DEST, false)
  }
  return createDevServer({
    label: '[Next.js Standalone]',
    command: (port) => `PORT=${port} npm run dev`,
    ready: [/started server/i],
  })
}
