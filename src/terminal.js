'strict'

const terminal = () => { console.log("A simple imlementation of a glass terminal.") }

const createDisplay = (id, numCols, numRows, vram) => {
    const table = document.createElement('table')
    const ui = document.getElementById(id)
    ui.append(table)
    for (let row = 0; row < numRows; row++) {
        const tr = document.createElement('tr')
        table.append(tr)
        for (let col = 0; col < numCols; col++) {
            const td = document.createElement('td')
            tr.append(td)
            td.innerText = vram[row * numCols + col]
        }
    }
}
