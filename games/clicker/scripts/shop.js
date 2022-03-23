let prices = [75, 425, 1275, 2825, 4100, 8000, 12500, 25000, 33335, 42500, 55000, 72500, 100000]
let foodPricesMultipliers = [1, 2, 5, 8, 15, 28, 39, 48, 67, 100, 130]

function shop(item, price) {
    switch (item) {
        case 1:
            if (main === 0) {
                if (price <= coins) {
                    main = 1
                    buy(price, "Kilof I")
                    document.getElementById("pickaxe").src = "images/pickaxes/pick1.png"
                } else {
                    notEnoughCoins()
                }
            } else {
                if (main > 0) {
                    betterPickaxe()
                } else {
                    worsePickaxe()
                }
            }
            break
        case 2:
            if (main === 1) {
                if (price <= coins) {
                    main = 2
                    buy(price, "Kilof II")
                    document.getElementById("pickaxe").src = "images/pickaxes/pick2.png"
                } else {
                    notEnoughCoins()
                }
            } else {
                if (main > 1) {
                    betterPickaxe()
                } else {
                    worsePickaxe()
                }
            }
            break
        case 3:
            if (main === 2) {
                if (price <= coins) {
                    main = 3
                    buy(price, "Kilof III")
                    document.getElementById("pickaxe").src = "images/pickaxes/pick3.png"
                } else {
                    notEnoughCoins()
                }
            } else {
                if (main > 2) {
                    betterPickaxe()
                } else {
                    worsePickaxe()
                }
            }
            break
        case 4:
            if (main === 3) {
                if (price <= coins) {
                    main = 4
                    buy(price, "Kilof IV")
                    document.getElementById("pickaxe").src = "images/pickaxes/pick4.png"
                } else {
                    notEnoughCoins()
                }
            } else {
                if (main > 3) {
                    betterPickaxe()
                } else {
                    worsePickaxe()
                }
            }
            break
        case 5:
            if (main === 4) {
                if (price <= coins) {
                    main = 5
                    buy(price, "Kilof V")
                    alert("Uwaga!\nZ tym kilofem możliwe jest przyzwanie GOLEMA, który od razu zada cios z zaskoczenia - będzie Cię to kosztowało masę energii!\nNigdy nie wiadomo, kiedy to nastąpi...")
                    document.getElementById("pickaxe").src = "images/pickaxes/pick5.png"
                } else {
                    notEnoughCoins()
                }
            } else {
                if (main > 4) {
                    betterPickaxe()
                } else {
                    worsePickaxe()
                }
            }
            break
        case 101:
            if (mine !== 9) {
                if (prices[mine] <= coins) {
                    buy(prices[mine], "Ulepszenie kopalni")
                    mine++
                    document.getElementById("mineAmount").innerText = "+" + mine
                    if (mine !== 9) {
                        document.getElementById("mineUpgrade").innerHTML = "" + prices[mine]
                    } else {
                        document.getElementById("mineUpgrade").innerHTML = "max"
                    }
                    document.getElementById("chlebek").innerHTML = 5 * foodPricesMultipliers[mine] + ""
                    document.getElementById("batonik").innerHTML = 20 * foodPricesMultipliers[mine] + ""
                    document.getElementById("colka").innerHTML = 45 * foodPricesMultipliers[mine] + ""
                } else {
                    notEnoughCoins()
                }
            } else {
                maxUpgrade()
            }
            break
        case 102:
            if (multipliers[0] <= 5) {
                if (prices[multipliers[1]] <= coins) {
                    buy(prices[multipliers[1]], "Ulepszenie kilofa")
                    multipliers[0] *= 1.15
                    document.getElementById("pickAmount").innerText = "x" + Math.round(multipliers[0] * 100) / 100
                    multipliers[1]++
                    if (multipliers[0] <= 5) {
                        document.getElementById("pickUpgrade").innerHTML = "" + prices[multipliers[1]]
                    } else {
                        document.getElementById("pickUpgrade").innerHTML = "max"
                    }
                } else {
                    notEnoughCoins()
                }
            } else {
                maxUpgrade()
            }
            break
        case 103:
            if (multipliers[2] <= 5) {
                if (prices[multipliers[3]] <= coins) {
                    buy(prices[multipliers[3]], "Ulepszenie monet")
                    multipliers[2] *= 1.15
                    multipliers[3]++
                    document.getElementById("coinAmount").innerText = "x" + Math.round(multipliers[2] * 100) / 100
                    if (multipliers[2] <= 5) {
                        document.getElementById("coinUpgrade").innerHTML = "" + prices[multipliers[3]]
                    } else {
                        document.getElementById("coinUpgrade").innerHTML = "max"
                    }
                } else {
                    notEnoughCoins()
                }
            } else {
                maxUpgrade()
            }
            break
        case 104:
            if (multipliers[4] <= 25) {
                let price = (100 * Math.pow(multipliers[4] + 1, 2))
                if (price <= coins) {
                    multipliers[4]++
                    document.getElementById("autoAmount").innerText = "x" + multipliers[4]
                    buy(price, "Ulepszenie autoclicka")
                    if (multipliers[4] <= 25) {
                        document.getElementById("autoUpgrade").innerHTML = "" + (100 * Math.pow(multipliers[4] + 1, 2))
                    } else {
                        document.getElementById("autoUpgrade").innerHTML = "max"
                    }
                } else {
                    notEnoughCoins()
                }
            } else {
                maxUpgrade()
            }
            break
        case 301:
            if (energy < 150) {
                if (price * foodPricesMultipliers[mine] <= coins) {
                    if (energy <= 125) {
                        addEnergy(25)
                    } else {
                        setEnergy(150)
                    }
                    buy(price * foodPricesMultipliers[mine], "Chlebek")
                    document.getElementById("chlebek").innerHTML = price * foodPricesMultipliers[mine] + ""
                    hp(energy, 150, "energy")
                } else {
                    notEnoughCoins()
                }
            } else {
                maxEnergy()
            }
            break
        case 302:
            if (energy < 150) {
                if (price * foodPricesMultipliers[mine] <= coins) {
                    if (energy <= 75) {
                        addEnergy(75)
                    } else {
                        setEnergy(150)
                    }
                    buy(price * foodPricesMultipliers[mine], "Batonik")
                    document.getElementById("batonik").innerHTML = price * foodPricesMultipliers[mine] + ""
                    hp(energy, 150, "energy")
                } else {
                    notEnoughCoins()
                }
            } else {
                maxEnergy()
            }
            break
        case 303:
            if (energy < 150) {
                if (price * foodPricesMultipliers[mine] <= coins) {
                    setEnergy(150)
                    buy(price * foodPricesMultipliers[mine], "Napój colo-podobny")
                    document.getElementById("colka").innerHTML = price * foodPricesMultipliers[mine] + ""
                    hp(energy, 150, "energy")
                } else {
                    notEnoughCoins()
                }
            } else {
                maxEnergy()
            }
            break
        case 901:
            buy(-1000000, "monety")
            break
        case 902:
            setEnergy(1000000)
            hp(energy, 100, "energy")
            break
    }
}