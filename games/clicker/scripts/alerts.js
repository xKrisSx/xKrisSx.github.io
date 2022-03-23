function betterPickaxe() {
    log("Nie mozesz tego kupic, posiadasz juz lepszy kilof!")
}
function worsePickaxe() {
    log("Najpierw musisz kupic poprzedni kilof!")
}
function maxUpgrade() {
    log("Nie mozesz tego dalej ulepszyc!")
}
function notEnoughCoins() {
    log("Nie stac cie na to!")
}
function maxEnergy() {
    log("Posiadasz pelna energie, nie musisz tego kupowac!")
}
function endGame() {
    log("Gratulacje! Ukonczyles gre!")
}

function log(text) {
    let date = new Date()
    let h = date.getHours()
    let m = date.getMinutes()
    let s = date.getSeconds()
    if (h.toString().length === 1) {h = "0" + h}
    if (m.toString().length === 1) {m = "0" + m}
    if (s.toString().length === 1) {s = "0" + s}
    text = h + ":" + m + ":" + s + ": " + text
    document.getElementById("consoleOut").innerHTML = text
}