let main        = 0     // Kilof - główna zmienna
let index       = 1     // Do minerałów
let clicks      = 0     // ilość kliknięć
let coins       = 0     // ilość monet gracza
let energy      = 150   // energia gracza, odnawiana przez jedzenie
let power               // moc gracza, liczona z kilofa, mnożników, itd
let mineralHP   = 8     // HP minerału
let mineral     = 0     // ID minerału
let mine        = 0     // Poziom kopalni
let sound
let alive       = true
let golem       = false

// Mnożniki         zwiększane indexy, wszystkie aktywme
let multipliers     = [ 1, // Kilof
                        0, // Ilość kilof
                        1, // Monety
                        0, // Ilość monety
                        0] // Autoclick

// Moc kilofa,      zależne od indexu
let pickaxePower    = [1, 7, 33, 143, 634, 1500]

// HP minerałów,    zależne od indexu
let mineralsPower   = [8, 17, 67, 156, 398, 815, 1913, 3396, 8030, 16312, 1000000]
//                       I      II        III        IV          V
// Cena minerałów,  zależna od indexu
let mineralsPrice   = [3, 12, 27, 48, 75, 144, 196, 256, 405, 625]

// nazwy do obrazków
let mineralImages   = ["kamien", "wegiel", "zelazo", "srebro", "zloto", "platyna", "lazuryt", "rubin", "szafir", "szmaragd"]
let mineralNames    = ["Kamien", "Wegiel", "Ruda zelaza", "Ruda srebra", "Ruda zlota", "Ruda platyny", "Lazuryt", "Rubin", "Szafir", "Szmaragd"]

/*
Minerały:
1) kamień
2) węgiel
3) żelazo
4) srebro
5) złoto
6) platyna
7) lazuryt
8) rubin
9) szafir
10) szmaragd
 */

function newMineral() {
    if (index === 99) {
        golem = true
        mineral = 10
        document.getElementById("mineral").src = "images/other/golem.png"
        document.getElementById("mineralName").innerText = "[BOSS] Golem"
        golemAttack()
    } else {
        switch (main) {
            case 0:
                index = 2
                break
            case 1:
                index = 4
                break
            case 2:
                index = 6
                break
            case 3:
                index = 8
                break
            case 4:
                index = 10
                break
            case 5:
                if (Math.round(Math.random() * 3) === 1) {
                    if (mine === 9) {
                        index = 99
                    } else {
                        index = 10
                    }
                } else {
                    index = 10
                }
                break
        }
        if (index !== 99) {
            if (index > mine + 1) {
                index = mine + 1
            }
            mineral = Math.floor(Math.random() * index)
        }
    }
}

function clickEvent(autoclicked) {

    if (energy <= 0) {
        gameOver()
        return
    }

    if (!autoclicked) {
        if (Math.round(Math.random() * 2) === 1) {
            energy--
            update("energy", energy)
            hp(energy, 150, "energy")
        }
    }

    /*/
     *   Liczenie mocy kilofa
    /*/

    power = pickaxePower[main]
    power *= multipliers[0]
    power = Math.round(power)
    pick()

    mineralHP -= power

    if (mineralHP <= 0) {
        if (golem) {
            victory()
            return
        }
        coins += Math.round(((mineralsPrice[mineral]) * ((Math.random() / 2) + 0.75)) * multipliers[2])
        newMineral()
        mineralHP = mineralsPower[mineral];
        if (!golem) {
            document.getElementById("mineral").src = "images/minerals/" + mineralImages[mineral] + "-" + Math.ceil(Math.random() * 3) + ".png"
            document.getElementById("mineralName").innerText = mineralNames[mineral]
            update("coins", coins)
            playSound("coins")
        }
    } else {
        switch (mineral) {
            case 0:
            case 1:
                sound = "stone"
                break
            default:
                sound = "steel"
                break
        }
        playSound(sound)
    }
    hp(mineralHP, mineralsPower[mineral], "hp")
}

function buy(val, item) {
    coins -= Number(val)
    update("coins", coins)
    log("Zakupiono: " + item)
    playSound("buy")
}

function pick() {
    document.getElementById("pickaxe").style.animation = "pick 0.2s"
    setTimeout(function () {
        document.getElementById("pickaxe").style.animation = ""
        }, 100
    )
}


function setEnergy(val) {
    energy = val
    update("energy", energy)
}
function addEnergy(val) {
    energy += val
    update("energy", energy)
}
function hp(hp, max, id) {
    let percent = (hp/max)

    let x
    let s
    let w
    if (id === "hp") {
        x = mineralHP
        s = id
        w = 256
    } else {
        x = energy
        s = "energia"
        w = 266
    }
    document.getElementById(id + "Bar").style.width = percent * w + "px"
    document.getElementById(id).innerHTML = s.toUpperCase() + ": " + x
    if (percent > 0.85) {
        document.getElementById(id + "Bar").style.backgroundColor = "rgba(0, 255, 0, 0.75)"
    } else if (percent > 0.5) {
        document.getElementById(id + "Bar").style.backgroundColor = "rgba(128, 255, 0, 0.75)"
    } else if (percent > 0.35) {
        document.getElementById(id + "Bar").style.backgroundColor = "rgba(255, 255, 0, 0.75)"
    } else if (percent > 0.15) {
        document.getElementById(id + "Bar").style.backgroundColor = "rgba(255, 128, 0, 0.75)"
    } else {
        document.getElementById(id + "Bar").style.backgroundColor = "rgba(255, 0, 0, 0.75)"
    }
}
function update(type, val) {
    switch (type) {
        case "coins":
            document.getElementById("coinsCount").innerHTML = '<img src="images/other/coins.gif" height="24" style="margin: -6px 5px">' + val
            break
        case "energy":
            document.getElementById("energy").innerHTML = "Energia: " + energy
            break
    }
}
function victory() {
    endGame()
    alive = false

    let div = document.createElement("div")
    div.id = "greenScreen"
    document.getElementById("body").appendChild(div)

    let text = document.createElement("div")
    text.innerHTML = "Gratulacje!<br>Ukonczyles gre!<br>Uzyj przycisku ponizej, aby wrocic do menu"
    text.id = "gameOverText"
    document.getElementById("body").appendChild(text)

    let image = document.createElement("img")
    image.src = "images/other/koniec.png"
    image.id = "restartGame"
    image.onclick = function goToMenu() {
        window.location.href = 'index.html';
    }
    document.getElementById('body').appendChild(image);
}

function gameOver() {

    log("Twoja energia spadla do 0, nie mozesz nic zrobic")
    alive = false
    golem = false
    index = 0
    mineral = 0
    mineralHP = mineralsPower[mineral];
    document.getElementById("mineral").src = "images/minerals/" + mineralImages[mineral] + "-" + Math.ceil(Math.random() * 3) + ".png"
    document.getElementById("mineralName").innerText = mineralNames[mineral]
    coins = 0
    update("coins", coins)

    let div = document.createElement("div")
    div.id = "redScreen"
    document.getElementById("body").appendChild(div)

    let text = document.createElement("div")
    text.innerHTML = "Nie wszystko stracone!<br>Mozesz powrocic do gry z 15 energii przyciskiem ponizej!"
    text.id = "gameOverText"
    document.getElementById("body").appendChild(text)

    let image = document.createElement("img")
    image.src = "images/other/restart.png"
    image.id = "restartGame"
    image.onclick = function restartGame() {
        setEnergy(15)
        log("Zregenerowano resztke sil - wykorzystaj ja madrze!")
        alive = true
        div.remove()
        image.remove()
        text.remove()
    }
    document.getElementById('body').appendChild(image);
}

function autoclick() {
    if (alive) {
        if (multipliers[4] !== 0) {
            clickEvent(true)
            setTimeout(autoclick, (5000 / multipliers[4]))
        } else {
            setTimeout(autoclick, 5000)
        }
    }
}

function golemAttack() {
    if (alive) {
        if (golem) {
            let random = (Math.ceil(Math.random() * 20) + 10)
            if (energy - random <= 0) {
                energy = 0
                hp(energy, 150, "energy")
                gameOver()
            } else {
                energy -= random
                hp(energy, 150, "energy")
                setTimeout(golemAttack, 3000)
            }
        }
    }
}