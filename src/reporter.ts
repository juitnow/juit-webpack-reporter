import { Compiler, WebpackError } from 'webpack'
import { box } from './box'

import { R, G, Y, K, W, U, X } from './colors'

function errorMessage(error: WebpackError): string {
  let message = (error.stack && (error.hideStack === false)) ?
      error.message + error.stack : error.message
  if (error.file) {
    message += `\n${K}at ${W}${U}${error.file}${X}`
    if (error.loc) {
      const loc = error.loc as any // something messed up with types...
      if (loc.start) {
        message += ` ${K}(line=${loc.start.line}`
        if (loc.start.column) message += `,col=${loc.start.column}`

        if (loc.end) {
          message += ` \u2192 line=${loc.end.line}`
          if (loc.end.column) message += `,col=${loc.end.column}`
        }
      }
      message += `)${X}`
    }
  }
  return message
}

// Our Report Plugin as a class
export class JuitWebpackReportPlugin {
  constructor() {
    // No options for now...
  }

  apply(compiler: Compiler): void {
    compiler.hooks.done.tapPromise('JuitWebpackReportPlugin', async (stats) => {
      // Arguments for our box...
      const args: string[] = []

      if (stats.hasWarnings()) {
        args.push(`Found ${Y}${stats.compilation.warnings.length}${X} warnings`)
        args.push(...stats.compilation.warnings.map(errorMessage))
      }

      if (stats.hasErrors()) {
        args.push(`Found ${Y}${stats.compilation.errors.length}${X} errors`)
        args.push(...stats.compilation.errors.map(errorMessage))
        args.push(`Compilation ${R}failed${X}!`)
      } else if (stats.hasWarnings()) {
        args.push(`Compilation ${Y}has warnings${X}!`)
      } else {
        args.push(`Compilation ${G}succesful${X}!`)
      }

      if (args.length) {
        // eslint-disable-next-line no-console
        console.log() // bloody spinner
        await box(...args)
      }
    })
  }
}

// Our Report Plugin as a singleton instance
export const juitWebpackReportPlugin = new JuitWebpackReportPlugin()
