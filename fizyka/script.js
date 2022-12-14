let f0      // Częstotliwość wysyłana
let f1      // Częstotliwość odbierana - zbliża się
let f2      // Częstotliwość odbierana - oddala się
let fx      // Częstotliwość odbierana - niewiadoma, do wyznaczenia czy się oddala czy nie
let v0      // Prędkość dźwięku - domyślnie 340m/s
let v1      // Prędkość obiektu odbierającego fale - domyślnie 0m/s
let v2      // Prędkość obiektu wysyłającego fale - domyślnie 0m/s
let vdiff   // Różnica prędkości między obiektami

let states = ["nie ruszają", "zbliżają do siebie", "oddalają od siebie", "Brak danych"]
let index

let units = []
const MPStoKMH = 3.6

function calc() {

    f0 = Number(document.getElementById("f0").value) < 0 ? Number(document.getElementById("f0").value) * -1 : Number(document.getElementById("f0").value)
    f1 = Number(document.getElementById("f1").value) < 0 ? Number(document.getElementById("f1").value) * -1 : Number(document.getElementById("f1").value)
    f2 = Number(document.getElementById("f2").value) < 0 ? Number(document.getElementById("f2").value) * -1 : Number(document.getElementById("f2").value)
    fx = Number(document.getElementById("fx").value) < 0 ? Number(document.getElementById("fx").value) * -1 : Number(document.getElementById("fx").value)
    v0 = Number(document.getElementById("v0").value) === 0 ? 340 : Number(document.getElementById("v0").value) < 0 ? Number(document.getElementById("v0").value) * -1 : Number(document.getElementById("v0").value)
    v1 = Number(document.getElementById("v1").value) < 0 ? Number(document.getElementById("v1").value) * -1 : Number(document.getElementById("v1").value)
    v2 = Number(document.getElementById("v2").value) < 0 ? Number(document.getElementById("v2").value) * -1 : Number(document.getElementById("v2").value)

    for (let i = 0; i < 3; i++) {
        document.getElementsByName("v" + i + "unit").forEach(n => {
            if (n.checked) {
                units[i] = n.value
            }
        })
        if (units[i] === "km/h") {
            switch (i) {
                case 0:
                    if (Number(document.getElementById("v0").value) === 0) {
                        return;
                    }
                    v0 /= MPStoKMH
                    break
                case 1:
                    v1 /= MPStoKMH
                    break
                case 2:
                    v2 /= MPStoKMH
                    break
            }
        }
    }

    vdiff = v2 - v1 < 0 ? v1 - v2 : v2 - v1

    /*
    PRZYPADKI:
    - znamy f0 i fx -> wyznaczamy f1 && f2 && vdiff - v1 && v2 nieznane
        *) f0 === fx -> obiekty się nie ruszają
    - znamy f0 i f1/f2 -> wyznaczamy f2 && f1 && vdiff - v1 && v2 nieznane
        *) f0 === f1 || f2 -> obiekty się nie ruszają
    - znamy f0 i vdiff -> wyznaczamy f1 && f2 - v1 && v2 nieznane
        *) vdiff === 0 -> f1 && f2 = f0
    - znamy f0 && v1 || v2 -> wyznaczamy f1 && f2 && vdiff
        *) v1 || v2 === 0 -> v2 || v1 = 0
    - znamy (f1 || f2) && vdiff -> wyznaczamy f0

    BŁĄD:
    - znamy fx i vdiff
    - nie znamy f0, fx, f1/f2
    -
     */

    /*
    - znamy f0 i fx -> wyznaczamy f1 && f2 && vdiff - v1 && v2 nieznane
    *) f0 === fx -> obiekty się nie ruszają
     */

    if (f0 !== 0 && fx !== 0) {
        if (f0 === fx) {
            document.getElementById("calc").innerHTML = "f0 === fx -> Różnica prędkości jest zerowa"
            f1 = fx
            f2 = fx
            index = 0
        } else {
            document.getElementById("calc").innerHTML = "znamy f0 i fx -> wyznaczamy f1 && f2 && vdiff - v1 && v2 nieznane"
            if (fx > f0) {
                f1 = fx
                f2 = f0 - (fx - f0)
                vdiff = Math.round((((fx / f0) - 1) * v0) * 1000) / 1000
                index = 1
            } else {
                f2 = fx
                f1 = f0 - (fx - f0)
                vdiff = Math.round((((fx / f0) - 1) * v0) * 1000) / 1000 < 0 ? (Math.round((((fx / f0) - 1) * v0) * 1000) / 1000 * -1) : Math.round((((fx / f0) - 1) * v0) * 1000) / 1000
                index = 2
            }
        }
        load()
        return
    }

    /*
    - znamy f0 i f1/f2 -> wyznaczamy f2 && f1 && vdiff - v1 && v2 nieznane
    *) f0 === f1 || f2 -> obiekty się nie ruszają
     */

    if (f0 !== 0 && (f1 !== 0 || f2 !== 0)) {
        if (f1 !== 0 && f2 === 0) {
            if (f0 > f1) {
                alert("Błąd, częstotliwość przy zbliżaniu się (f1) nie może być mniejsza niż częstotliwość nadawania (f0)")
                return;
            }
            document.getElementById("calc").innerHTML = "znamy f0 i f1/f2 -> wyznaczamy f2 && f1 && vdiff - v1 && v2 nieznane"
            f2 = f0 - (f1 - f0)
            vdiff = Math.round((((f1 / f0) - 1) * v0) * 1000) / 1000
            index = 1
            if (f0 === f1) {
                document.getElementById("calc").innerHTML = "f0 === f1 || f2 -> Różnica prędkości jest zerowa"
                index = 0
            }
        } else {
            if (f0 < f2) {
                alert("Błąd, częstotliwość przy zbliżaniu się (f1) nie może być mniejsza niż częstotliwość nadawania (f0)")
                return;
            }
            document.getElementById("calc").innerHTML = "znamy f0 i f1/f2 -> wyznaczamy f2 && f1 && vdiff - v1 && v2 nieznane"
            f1 = f0 - (f2 - f0)
            vdiff = Math.round((((f2 / f0) - 1) * v0) * 1000) / 1000 * -1
            index = 2
            if (f0 === f2) {
                document.getElementById("calc").innerHTML = "f0 === f1 || f2 -> Różnica prędkości jest zerowa"
                index = 0
            }
        }
        load()
        return;
    }

    /*
    - znamy f0 && v1 || v2 -> wyznaczamy f1 && f2 && vdiff
    *) v1 || v2 === 0 -> v2 || v1 = 0
     */

    /*
    - znamy f0 i vdiff -> wyznaczamy f1 && f2 - v1 && v2 nieznane
     */

    if (f0 !== 0 && vdiff !== 0) {
        document.getElementById("calc").innerHTML = "znamy f0 i vdiff -> wyznaczamy f1 && f2 - v1 && v2 nieznane"
        f1 = Math.round(f0 * (1 + (vdiff / v0)) * 1000) / 1000
        f2 = Math.round(f0 * (1 - (vdiff / v0)) * 1000) / 1000
        index = 3
        load()
        return;
    }

    /*
    *) vdiff === 0 -> f1 && f2 = f0
     */

    if (f0 !== 0 && vdiff === 0) {
        document.getElementById("calc").innerHTML = "vdiff === 0 -> f1 && f2 = f0"
        f1 = f0
        f2 = f0
        index = 0
        load()
        return;
    }

    /*
    - znamy (f1 || f2) && vdiff -> wyznaczamy f0
     */

    if (f1 !== 0 || f2 !== 0) {
        document.getElementById("calc").innerHTML = "znamy (f1 || f2) && vdiff -> wyznaczamy f0"
        if (f1 !== 0 && f2 === 0) {
            f0 = Math.round(f1 / (1 + vdiff / v0) * 1000) / 1000
            f2 = Math.round((f0 - (f1 - f0)) * 1000) / 1000
            index = 1
        } else {
            f0 = Math.round(f2 / (1 - vdiff / v0) * 1000) / 1000
            f1 = Math.round((f0 + (f0 - f2)) * 1000) / 1000
            index = 2
        }
        if (vdiff === 0) {
            document.getElementById("calc").innerHTML = "vdiff === 0 -> Różnica prędkości jest zerowa"
            f0 = f1 !== 0 ? f1 : f2
            if (f1 !== 0) {
                f2 = f1
            } else {
                f2 = f1
            }
            index = 0
        }
        load()
        return;
    }
    alert("Błąd, nie podano wystarczających danych")
}

function load() {
    write("f0out", f0 + "Hz")
    write("f1out", f1 + "Hz")
    write("f2out", f2 + "Hz")
    write("v0out", v0 === 0 ? "Brak danych" : Number(document.getElementById("v0").value) === 0 ? v0 + "m/s" : (Math.round(v0 * 1000) / 1000) + "m/s" + " / " + (Math.round(((v0 * 1000) / 1000) * MPStoKMH)) + "km/h")
    write("v1out", v1 === 0 ? v2 === 0 ? "Brak danych" : 0 + units[1] : (Math.round(v1 * 1000) / 1000) + "m/s" + " / " + (Math.round(((v1 * 1000) / 1000) * MPStoKMH)) + "km/h")
    write("v2out", v2 === 0 ? v1 === 0 ? "Brak danych" : 0 + units[2] : (Math.round(v2 * 1000) / 1000) + "m/s" + " / " + (Math.round(((v2 * 1000) / 1000) * MPStoKMH)) + "km/h")
    write("vdiffout", (Math.round(vdiff * 1000) / 1000) + "m/s" + " / " + (Math.round(((vdiff * 1000) / 1000) * MPStoKMH)) + "km/h")
    write("obdiff", states[index])
}

function write(id, string) {
    document.getElementById(id).innerHTML = string
}