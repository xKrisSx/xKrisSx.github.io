function checkInput(classlist) {
    if (!(
        Number(document.getElementsByClassName(String(classlist).split(" ")[2] + " " + String(classlist).split(" ")[3])[0].value) > 0 &&
        Number(document.getElementsByClassName(String(classlist).split(" ")[2] + " " + String(classlist).split(" ")[3])[0].value) < 10
    )) {
        document.getElementsByClassName(String(classlist).split(" ")[2] + " " + String(classlist).split(" ")[3])[0].value = ""
    }
}


function checkRow(row) {
    let numbers = []
    for (let i = 0; i < 9; i++) {
        let n = Number(Array.from(document.getElementsByClassName("row" + row))[i].value)
        if (!numbers.includes(n) && n !== 0) {
            numbers.push(n)
        }
    }
    return numbers.length === 9;
}


function checkCol(col) {
    let numbers = []
    for (let i = 0; i < 9; i++) {
        let n = Number(Array.from(document.getElementsByClassName("col" + col))[i].value)
        if (!numbers.includes(n) && n !== 0) {
            numbers.push(n)
        }
    }
    return numbers.length === 9;
}


function checkBox(box) {
    let numbers = []
    for (let i = 0; i < 9; i++) {
        let n = Number(Array.from(document.getElementsByClassName("box" + box))[i].value)
        if (!numbers.includes(n) && n !== 0) {
            numbers.push(n)
        }
    }
    return numbers.length === 9;
}


function loadNumbers() {

}


function removeNumbers(amount) {

}


function end() {
    for (let i = 1; i <= 9; i++) {
        if (!checkBox(i)) {
            alert("error box" + i)
            return false
        }
        if (!checkCol(i)) {
            alert("error col" + i)
            return false
        }
        if (!checkRow(i)) {
            alert("error row" + i)
            return false
        }
    }
    return true
}