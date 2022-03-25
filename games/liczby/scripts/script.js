let players;
let gamemode;
let hex;
let gamemodeIndex;
let size;
let n1 = 0;
let table = []
let names = []
let win = []
let end;
let gamemodes = ["Kazdy osobno"]
let colors = [
    "rgba(255,0  ,0  ,0.25)",
    "rgba(255,255,0  ,0.25)",
    "rgba(0  ,255,0  ,0.25)",
    "rgba(0  ,255,255,0.25)",
    "rgba(0  ,0  ,255,0.25)",
    "rgba(255,0  ,255,0.25)",
    "rgba(255,255,255,0.25)",
    "rgba(0  ,0  ,0  ,0.25)"
]

function createNumber(length, amount, hexy) {
    table = []
    for (let i = 0; i < amount; i++) {
        let number = [];
        while (number.length !== length) {
            let random;
            if (hexy === "true") {
                random = Math.floor(Math.random() * 15) + 1
            } else {
                random = Math.floor(Math.random() * 9) + 1
            }
            if (!number.includes(random)) {
                number.push(random)
            }
        }
        if (hexy === "true") {
            for (let i = 0; i < length; i++) {
                if (number[i] > 9) {
                    switch (number[i]) {
                        case 10:
                            number[i] = "A"
                            break
                        case 11:
                            number[i] = "B"
                            break
                        case 12:
                            number[i] = "C"
                            break
                        case 13:
                            number[i] = "D"
                            break
                        case 14:
                            number[i] = "E"
                            break
                        case 15:
                            number[i] = "F"
                            break
                    }
                }
            }
        }
        table.push(number)
    }
}

function playSound(name) {
    let sound = new Audio("sounds/" + name + ".mp3")
    sound.play()
}

function color() {
    document.getElementById("bottom").style.backgroundColor = colors[Math.floor(Math.random() * 8)]
}

function togglehexa() {
    if (document.getElementById("hexa").checked) {
        document.getElementById("numbercount").setAttribute("max", "15")
        document.getElementById("hexainfo").innerHTML = `- "Cyfry" 10 i wyzej sa w systemie hexadecymalnym (A,B,C,D,E,F)<br>`
        document.getElementById("maxnum").innerText = "F"
    } else {
        document.getElementById("hexainfo").innerHTML = ``
        document.getElementById("maxnum").innerText = "9"
        if (document.getElementById("numbercount").value > 9) {
            console.log("b")
            document.getElementById("numbercount").setAttribute("value", "9")
            showAmount(9, "numbersize")
        }
        document.getElementById("numbercount").setAttribute("max", "9")
    }
}

function switchGamemode() {
    if (n1 === gamemodes.length - 1) {
        n1 = 0
    } else {
        n1++
    }
    document.getElementById("gamemode").innerText = gamemodes[n1]
}

function showAmount(amount, id) {
    document.getElementById(id).innerText = amount
    if (id === "numbersize") { document.getElementById("rules-amount").innerText = amount }
    playSound("pop-slider")
}

function play() {
    players = document.getElementById("playercount").value
    gamemode = gamemodes[n1]
    gamemodeIndex = n1
    size = document.getElementById("numbercount").value
    hex = document.getElementById("hexa").checked
    window.open("game.html?players=" + players + "_gamemode=" + gamemodeIndex + "_size=" + size + "_hex=" + hex)
}

function get(data) {
    let query = location.search.substring(1).split("_");
    switch (data) {
        case "p":
            return parseInt(query[0].replace("players=", ""))
        case "g":
            return parseInt(query[1].replace("gamemode=", ""))
        case "s":
            return parseInt(query[2].replace("size=", ""))
        case "h":
            return query[3].replace("hex=", "")
    }
}

function load() {
    createNumber(get("s"), get("p"), get("h"))
    names = []
    for (let i = 0; i < get("p"); i++) {
        win.push(false)
    }
    document.getElementById("nameInput").focus()
    document.addEventListener('keyup', (e) => {
        if (!end) {
            if (e.code === "Enter") {
                if (document.getElementById("numberInput") !== null) {
                    submitnumber()
                } else if (document.getElementById("nameInput") !== null) {
                    validate("add")
                }
            }
        }
    });
    end = false;
}

let regex = /^[a-zA-Z0-9]+$/
let numberregex = /^[0-9]+$/
let numberregex2 = /^[1-9]+$/
let hexregex = /^[0-9a-fA-F]+$/
let hexregex2 = /^[1-9a-fA-F]+$/

function validate(type) {
    if (!end) {
        let val = document.getElementById("nameInput").value
        switch (type) {
            case "add":
                playSound("pop")
                if (val.length === 0) {
                    log("red", "Nazwa nie moze byc pusta!")
                    break
                }
                if (val.length < 3) {
                    log("red", "Ta nazwa jest zbyt krotka!")
                    break
                }
                if (val.length > 12) {
                    document.getElementById("nameInput").value = document.getElementById("nameInput").value.substring(0, 12);
                    log("red", "Osiagnieto limit znakow! (12)")
                    break
                }
                if (!regex.test(val)) {
                    document.getElementById("nameInput").value = document.getElementById("nameInput").value.substring(0, val.length - 1);
                    log("red", "Ten znak jest niedozwolony! (" + val[val.length - 1] + ")")
                    break
                }
                log("red", "")
                if (names.includes(val)) {
                    log("red", "Ta nazwa juz wystepuje!")
                    break
                }
                names.push(val)
                if (names.length === get("p")) {
                    document.getElementById("namecontainer").remove()
                    createDivs(get("p"))
                } else {
                    document.getElementById("nameInput").value = ""
                    document.getElementById("playernamescount").innerText = (names.length + 1).toString()
                    log("green", "Dodano gracza #" + names.length + ": " + val)
                }
                break
            case "input":
                playSound("key")
                if (val.length > 12) {
                    document.getElementById("nameInput").value = document.getElementById("nameInput").value.substring(0, 12);
                    log("red", "Osiagnieto limit znakow! (12)")
                    break
                }
                if (!regex.test(val)) {
                    document.getElementById("nameInput").value = document.getElementById("nameInput").value.substring(0, val.length - 1);
                    log("red", "Ten znak jest niedozwolony! (" + val[val.length - 1] + ")")
                    break
                }
                break
        }
    }
}

function log(color, tekst) {
    let classlist = document.getElementById("log").classList
    switch (color) {
        case "red":
            if (!classlist.contains("red")) {
                document.getElementById("log").classList.add("red")
                document.getElementById("log").classList.remove("green")
            }
            break
        case "green":
            if (!classlist.contains("green")) {
                document.getElementById("log").classList.add("green")
                document.getElementById("log").classList.remove("red")
            }
            break
    }
    document.getElementById("log").innerText = tekst
}

function createDivs(amount) {
    for (let i = 0; i < amount; i++) {
        let div = document.createElement("div")
        div.classList.add("playercontainer", "w" + amount, "small")
        div.style.background = colors[Math.floor(Math.random() * 8)]

        let h1 = document.createElement("h1")
        h1.classList.add("small", "center")
        h1.innerText = names[i]

        let p = document.createElement("p")
        p.id = "p" + i
        p.classList.add("scroll")
        p.innerText = ""
        p.style.marginBottom = "10vh;"

        div.appendChild(h1)
        div.appendChild(p)

        document.getElementById("gamecontainer").appendChild(div)
    }
    //<input type="text" class="nameInput medsmaller" id="nameInput" oninput="validate('input')">
    let input = document.createElement("input")
    input.type = "text"
    input.classList.add("medsmaller", "nameInput")
    input.id = "numberInput"
    input.oninput = function () {
        playSound("key")
        let val = document.getElementById("numberInput").value
        if (val.length > get("s")) {
            document.getElementById("numberInput").value = document.getElementById("numberInput").value.substring(0, get("s"));
            log("red", "Osiagnieto limit znakow! (" + get("s") + ")")
        }
    }

    //<div id="playernameinputdivxd" class="med">Gracz #<span id="playernamescount">1</span> <button id="addplayer" onclick="validate('add')">✓</button></div><br>
    let inputtext = document.createElement("div")
    inputtext.id = "numberdivinfo"
    inputtext.classList.add("med")
    inputtext.innerHTML = "Teraz kolej gracza <span id='playernamespan' class='green'>" + names[0] + " (#1)</span><button id='numberbutton' onclick='submitnumber()'>✓</button>"

    document.getElementById("gamecontainer").appendChild(input)
    document.getElementById("gamecontainer").appendChild(inputtext)

    document.getElementById("numberInput").focus()
}

let iteration = 0;

function submitnumber() {
    if (!end) {

        document.getElementById("numberInput").focus()

        playSound("pop")
        let num = document.getElementById("numberInput").value

        if (num.length > get("s")) {
            log("red", "Liczba jest zbyt dluga! Maksymalna dlugosc: " + get("s"))
            return
        }

        if (num.length < get("s")) {
            log("red", "Liczba jest zbyt krotka! Wymagana dlugosc: " + get("s"))
            return;
        }

        if (get("h") === "true") {
            if (!hexregex.test(num)) {
                log("red", "To nie jest liczba!")
                return;
            }

            if (!hexregex2.test(num)) {
                log("red", "Liczba nie moze zawierac zera!")
                return;
            }
        } else {
            if (!numberregex.test(num)) {
                log("red", "To nie jest liczba!")
                return;
            }

            if (!numberregex2.test(num)) {
                log("red", "Liczba nie moze zawierac zera!")
                return;
            }
        }

        let numtable = num.toUpperCase().split("")
        num = num.toUpperCase()
        let points = 0

        let numbers = []

        for (let i = 0; i < numtable.length; i++) {
            if (!numbers.includes(numtable[i].toUpperCase())) {
                numbers.push(numtable[i])
            } else {
                log("red", "Cyfry nie moga sie powtarzac!")
                return;
            }
        }

        for (let i = 0; i < numtable.length; i++) {
            numtable.forEach(n => {
                if (table[iteration][i].toString().includes(n.toString())) {
                    points += 1
                }
            })
            if (numtable[i].toString() === table[iteration][i].toString()) {
                points += 1
            }
        }

        if (table[iteration].toString().replaceAll(",", "") === num.toString()) {
            win[iteration] = true
        }

        document.getElementById("numberInput").value = ""
        if (win[iteration]) {
            document.getElementById("p" + iteration).innerHTML += "<br><span class='green'>" + num + "</span><br>Ilosc prob: " + (document.getElementById("p" + iteration).getElementsByTagName("br").length + 1)
        } else {
            document.getElementById("p" + iteration).innerHTML += "<br>" + num + " - " + points + "p"
        }
        log("green", "Gracz: " + names[iteration] + ", Liczba: " + num)

        if (iteration + 1 === names.length) {
            iteration = 0
        } else {
            iteration++
        }
        for (let i = iteration; i < names.length + iteration + 1; i++) {
            if (win[iteration]) {
                if (iteration + 1 === names.length) {
                    iteration = 0
                } else {
                    iteration++
                }
            } else {
                break
            }
        }
        let j = 0;
        win.forEach(n => {
            if (n) {
                j++
            }
        })
        if (j === win.length) {
            end = true
            document.getElementById("numberInput").blur()
            let div = document.createElement("div")
            div.id = "greenScreen"
            document.getElementById("body").appendChild(div)

            let text = document.createElement("div")
            text.innerHTML = "<span class='big'>Wszyscy wygrali!</span><br><span class='medsmaller'>Kliknij przycisk ponizej, aby wrocic do menu</span>"
            text.id = "gameOverText"
            document.getElementById("body").appendChild(text)

            let btn = document.createElement("button")
            btn.id = "restartGame"
            btn.classList.add("medsmaller")
            btn.innerText = "Menu"
            btn.onclick = function goToMenu() {
                window.close()
            }
            document.getElementById('body').appendChild(btn);
        }
        document.getElementById("playernamespan").innerText = names[iteration] + " (#" + (iteration + 1) + ")"
    }
}