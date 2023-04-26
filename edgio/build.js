const { join, relative } = require('path')
const { DeploymentBuilder } = require('@edgio/core/deploy')

const appDir = process.cwd()

module.exports = async function build() {
  const builder = new DeploymentBuilder()
  builder.clearPreviousBuildOutput()
  await builder.exec('npx next build')
  builder.addJSAsset(join(appDir, '.env.production'))
  builder.addJSAsset(join(appDir, '.next', 'standalone'), 'dist')
  builder.addJSAsset(join(appDir, 'public'), join('dist', 'public'))
  const publicDir = join(appDir, 'public')
  builder.writeFileSync(
    join(builder.jsDir, 'public_routes'),
    (await import('globby'))
      .globbySync(publicDir, {
        onlyFiles: true,
      })
      .map((i) => relative(publicDir, i))
      .join(',')
  )
  builder.buildServiceWorker(join(process.cwd(), 'sw', 'service-worker.ts'), join(process.cwd(), '.edgio', 'temp', 'service-worker.js'), false)
  await builder.build()
}
