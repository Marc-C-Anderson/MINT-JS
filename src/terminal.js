'strict'

const ttyCols = 80
const ttyRows = 24
const ttyRam = []

/**
 * Display the terminal version.
 */
const ttyVersion = () => { return 'Terminal Version 1.0.0 (Build 20220207)' }

/**
 * Initialise the screen buffer.
 */
const ttyInit = () => {
    for (let idx = 0; idx <= ttyCols * ttyRows; idx++) { ttyRam[idx] = ' ' }
}

/**
 * Create the terminal in the DOM and render the contents of the tty RAM
 * @param {*} id 
 */
const ttyCreate = (id) => {
    const table = document.createElement('table')
    const ui = document.getElementById(id)
    ui.append(table)
    for (let row = 0; row < ttyRows; row++) {
        const tr = document.createElement('tr')
        table.append(tr)
        for (let col = 0; col < ttyCols; col++) {
            const td = document.createElement('td')
            td.id = 'cell.' + col + '.' + row
            tr.append(td)
            td.innerText = ttyRam[row * ttyCols + col]
        }
    }
}

/**
 * Update the screen with the latest copy of the screen buffer.
 */
const ttyUpdate = () => {
    for (let row = 0; row < ttyRows; row++) {
        for (let col = 0; col < ttyCols; col++) {
            const td = document.getElementById('cell.' + col + '.' + row)
            td.innerText = ttyRam[row * ttyCols + col]
        }
    }
}

let ttyCP = 0 // The current character pointer into the screen buffer.
let currentCol = 0
let currentRow = ttyRows - 1

const ttyMemMove = () => {
    for (let idx = ttyCols; idx < ttyCols * ttyRows; idx++) { ttyRam[idx - 80] = ttyRam[idx] }
    for (let idx = ttyCols * (ttyRows - 1); idx < ttyCols * ttyRows; idx++) { ttyRam[idx] = ' ' }
}

/**
 * Put a character to the screen buffer and update the screen.
 * @param {*} ch The character to copy to the screen buffer. 
 * @returns void
 */
const ttyPutC = (ch) => {
    if (ch == 'Shift') return
    if (ch == 'Backspace') return
    if (ch == 'Enter') {
        ttyMemMove()
        currentCol = 0
        // if (currentRow > 0) {
        //     currentRow -= 1
        // }
        ttyUpdate()
        return
    }
    ttyRam[currentRow * ttyCols + currentCol] = ch
    //    ttyCP++
    currentCol += 1
    if (currentCol >= ttyCols) {
        ttyMemMove()
        currentCol = 0
    }
    ttyUpdate()
}
