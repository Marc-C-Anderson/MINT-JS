'strict'

function terminal(id, numCols, numRows, vram) {
    function version() { return 'Terminal Version 1.0.0 (Build 20220130)' }

    function createDisplay() {
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

    return Object.freeze({ version, createDisplay })
}
