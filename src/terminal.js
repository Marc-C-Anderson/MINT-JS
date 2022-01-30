'strict'

Terminal = function () {
    //        this._version = "Terminal Version 1.0.0 (Build 20220129)"
}

Terminal.prototype.version = function () {
    return 'Terminal Version 1.0.0 (Build 20220129)'
}

//const Terminal.prototype.version = "Terminal Version 1.0.0 (Build 20220129)"

//const terminal = () => { console.log("A simple imlementation of a glass terminal.") }
//const version = "Terminal Version 1.0.0 (Build 20220129)"

Terminal.prototype.createDisplay = function (id, numCols, numRows, vram) {
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
