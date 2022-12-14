let enabled = true
let random = true
let maxamount = 75
let amount = 0
let i = 0
let bg = Math.floor(Math.random() * 6) + 1
let colors  = [
    // R-MIN, R-MAX, G-MIN, G-MAX, B-MIN, B-MAX
    [
        // RED
        [ 150,   200,   0,     25,    0,     25  ],
        [ 150,   255,   0,     50,    0,     50  ],
        [ 200,   255,   0,     50,    0,     50  ],
        [ 200,   255,   100,   200,   0,     50  ],
        [ 200,   255,   150,   200,   0,     50  ]
    ],

    [
        // GREEN
        [ 0,     50,    150,   255,   0,     50  ],
        [ 0,     50,    200,   255,   0,     50  ],
        [ 0,     50,    200,   255,   100,   200 ],
        [ 0,     50,    200,   255,   200,   255 ]
    ],

    [
        // BLUE
        [ 0,     50,    0,     50,    150,   255 ],
        [ 0,     50,    0,     50,    200,   255 ],
        [ 100,   200,   0,     50,    200,   255 ],
        [ 200,   255,   0,     50,    200,   255 ],
        [ 200,   255,   100,   150,   200,   255 ],
        [ 0,     50,    100,   150,   200,   255 ]
    ],

    [
        // YELLOW
        [ 200,   255,   100,   200,   0,     50  ],
        [ 200,   255,   150,   200,   0,     50  ],
        [ 200,   255,   200,   255,   0,     50  ],
        [ 150,   255,   150,   255,   0,     50  ]
    ],

    [
        // GRAY
        [ 100, 200, 2, 1, 3, 7 ]
    ]
]
let color = Math.floor(Math.random() * colors.length)

function detectMob() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPad/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

function enable() {
    if (detectMob()) {
        maxamount = 10
    } else {
        maxamount = 50
    }
}

function changeColor(c) {
    if (c !== "off") {
        if (c === "random") {
            document.getElementsByClassName("active")[0].classList.remove("active")
            document.getElementsByClassName("colorblock")[0].classList.add("active")
            random = true
        } else {
            document.getElementsByClassName("active")[0].classList.remove("active")
            document.getElementsByClassName("colorblock")[Number(c) + 1].classList.add("active")
            random = false
            color = Number(c)
        }
        if (!enabled) {
            enabled = true
            document.getElementById("body").style.backgroundImage = "url('images/bg/0.jpg')"
            enable()
            dots()
        }
        background()
    } else {
        maxamount = 0
        document.getElementsByClassName("active")[0].classList.remove("active")
        document.getElementsByClassName("colorblock")[6].classList.add("active")
        enabled = false
    }
}

function interval() {
    setInterval(function remove() {
        if (enabled) {
            if (random) {
                let newColor = Math.floor(Math.random() * colors.length)
                if (color === newColor) {
                    if (color - 1 === colors.length) {
                        color = 0
                    } else {
                        color++
                    }
                } else {
                    color = newColor
                }
            }
            dots()
            background()
        } else {
            let newBg = Math.floor(Math.random() * 6) + 1
            if (bg === newBg) {
                if (bg === 6) {
                    bg = 1
                } else {
                    bg++
                }
            } else {
                bg = newBg
            }
            if (document.title === "Doppler") {
                document.getElementById("body").style.backgroundImage = "url('../images/bg/" + bg + ".jpg')"
            } else {
                document.getElementById("body").style.backgroundImage = "url('images/bg/" + bg + ".jpg')"
            }
        }
    }, 15000);
}

function background() {

    let angle = Math.floor(Math.random() * 360)

    switch (color) {
        case 0:
            document.getElementById("gradient").style.backgroundImage = "linear-gradient(" + angle + "deg, rgba(255, 128, 0, 0.05) 0%, rgba(255, 0, 0, 0.05)  50%, rgba(0,0,0,0.05) 100%)"
            break
        case 1:
            document.getElementById("gradient").style.backgroundImage = "linear-gradient(" + angle + "deg, rgba(89, 255, 67, 0.05) 0%, rgba(0, 128, 2, 0.05)  50%, rgba(0,0,0,0.05) 100%)"
            break
        case 2:
            document.getElementById("gradient").style.backgroundImage = "linear-gradient(" + angle + "deg, rgba(0, 129, 255, 0.05) 0%, rgba(92, 0, 255, 0.05) 50%, rgba(0,0,0,0.05) 100%)"
            break
        case 3:
            document.getElementById("gradient").style.backgroundImage = "linear-gradient(" + angle + "deg, rgba(255, 145, 0, 0.05) 0%, rgba(255, 214, 0, 0.05) 50%, rgba(0,0,0,0.05) 100%)"
            break
        case 4:
            document.getElementById("gradient").style.backgroundImage = "linear-gradient(" + angle + "deg, rgba(255, 255, 255, 0.125) 0%, rgba(128, 128, 128, 0.05) 50%, rgba(0,0,0,0.05) 100%)"
            break
    }
}

function dots() {
    while (amount < maxamount && enabled) {

        let dot = document.createElement("div")

        dot.classList.add("dot")

        dot.style.borderRadius = "50%"

        let random = Math.ceil((Math.random() * 100) + 50) / 11
        dot.style.animation = "opacity " + random + "s ease-in, animX" + i + " " + random + "s ease-in, animY" + i + " " + random + "s ease-in"

        let size = Math.floor(Math.random() * 500)
        dot.style.width = Math.sqrt(size) + "px"
        dot.style.height = Math.sqrt(size) + "px"


        let childcolor = Math.floor(Math.random() * colors[color].length)
        let red
        let green
        let blue
        if (color === 4) {
            let x = Math.floor(Math.random() * (colors[color][childcolor][1] - colors[color][childcolor][0])) + colors[color][childcolor][0]
            red = x
            green = x
            blue = x
        } else {
            red = Math.floor(Math.random() * (colors[color][childcolor][1] - colors[color][childcolor][0])) + colors[color][childcolor][0]
            green = Math.floor(Math.random() * (colors[color][childcolor][3] - colors[color][childcolor][2])) + colors[color][childcolor][2]
            blue = Math.floor(Math.random() * (colors[color][childcolor][5] - colors[color][childcolor][4])) + colors[color][childcolor][4]
        }

        dot.style.backgroundImage =
            "radial-gradient(circle, rgba(255,255,255,1) 20%," +
            "rgba(" + red + "," + green + "," + blue + "," + (Math.random() / 2 + 0.5) + ") 30%," +
            "rgba(0,0,0,0) 100%)"

        dot.style.translate = "translate(100px, 0px)"

        dot.style.position = "fixed"
        let left = Math.floor(Math.random() * 100)
        dot.style.left = left + "vw"
        let top  = Math.floor(Math.random() * 100)
        dot.style.top = top + "vh"

        document.styleSheets[0].insertRule("\
			@keyframes animX" + i + " {\
			    0%   { left: " + (left + (Math.floor(Math.random() * 60) - 30)) + "vw; }\
			    100% { left: " + left + "vw;   }\
			}"
        );
        document.styleSheets[0].insertRule("\
			@keyframes animY" + i + " {\
			    0%   { top: " + (top + (Math.floor(Math.random() * 60) - 30)) + "vh; }\
			    100% { top: " + top + "vh;   }\
			}"
        );

        dot.style.filter = "blur(2px)"
        if (1 !== 1) { alert("a") }
        document.getElementById("body").appendChild(dot)

        amount++
        i++

        setTimeout(function remove() {
           // document.getElementById("body").removeChild(dot)
            dot.remove()
            amount--
            dots()
        }, (random * 1000) + 500);
    }
}

