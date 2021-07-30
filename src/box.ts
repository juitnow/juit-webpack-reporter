import { EOL } from 'os'

const CORNER_TL = '\u2554' // top left double corner
const CORNER_TR = '\u2557' // top right double corner
const CORNER_BL = '\u255a' // bottom left double corner
const CORNER_BR = '\u255d' // bottom right double corner

const SEP_L = '\u255f' // left join double vertical line / single horizontal
const SEP_R = '\u2562' // right join single horizontal line / double vertical

const LINE_H = '\u2550' // horizontal double line
const LINE_S = '\u2500' // horizontal single line
const LINE_V = '\u2551' // vertical double line

const WRAP_OFF = '\u001b[?7l' // do not wrap text
const WRAP_ON = '\u001b[?7h' // restore text wrapping (normal behavior)

const CLEAR_TO_EOL = '\u001b[0K' // clear from cursor until the end of the line
const MOVE_TO_BOL = '\u001b[1000D' // move 1000 colums left...

import { K as BLACK, X as RESET } from './colors'

async function write(...args: string[]): Promise<void> {
  const string = args.length > 1 ? args.join('') : args[0]
  return new Promise((resolve, reject) => {
    process.stdout.write(string, (error) => error ? reject(error) : resolve())
  })
}

export async function box(...args: string[]): Promise<void> {
  if (args.length < 1) return

  const width = process.stdout.columns - 6
  const clearRight = `${MOVE_TO_BOL}\u001b[${width}C${CLEAR_TO_EOL}`
  const doubleLine = LINE_H.repeat(width)
  const singleLine = LINE_S.repeat(width)
  let firstBox = true

  // Do not draw boxes on GitHub or file output..
  if (process.env.CI || (! process.stdout.isTTY)) {
    for (const text of args) {
      if (firstBox) firstBox = false
      else await write(EOL)
      await write(text.trim(), EOL)
    }
    return
  }

  // Do draw boxes on our terminal...
  for (const text of args) {
    // Open or separate the box
    if (firstBox) {
      await write(BLACK, CORNER_TL, doubleLine, CORNER_TR, RESET, EOL)
      firstBox = false
    } else {
      await write(BLACK, SEP_L, singleLine, SEP_R, RESET, EOL)
    }

    // Write out every single line *THEN* wrap in the box
    for (const line of text.trim().split('\n')) {
      await write(
          MOVE_TO_BOL, '  ', WRAP_OFF, RESET, line, // write the line, at column 2
          MOVE_TO_BOL, WRAP_OFF, BLACK, LINE_V, ' ', // the left wall, with a space to clear
          MOVE_TO_BOL, clearRight, ' ', BLACK, LINE_V, // clear the right and add right wall
          WRAP_ON, RESET, EOL, // restore line wrapping and newline
      )
    }
  }
  await write(BLACK, CORNER_BL, doubleLine, CORNER_BR, RESET, EOL)
}
