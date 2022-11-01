let maxamount = 200
let amount = 0
let color = Math.floor(Math.random() * 3)
let i = 0
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
    ]
]

function background() {

    setInterval(function remove() {
        color = Math.floor(Math.random() * 3)
        background()
    }, 60000);

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
    }
}

function dots() {
    while (amount < maxamount) {

        let dot = document.createElement("div")

        dot.classList.add("dot")

        dot.style.borderRadius = "50%"

        let random = Math.ceil((Math.random() * 100) + 50) / 8
        dot.style.animation = "opacity " + random + "s ease-in, animX" + i + " " + random + "s ease-in, animY" + i + " " + random + "s ease-in"

        let size = Math.floor(Math.random() * 500)
        dot.style.width = Math.sqrt(size) + "px"
        dot.style.height = Math.sqrt(size) + "px"


        let childcolor = Math.floor(Math.random() * colors.length)
        let red = Math.floor(Math.random() * (colors[color][childcolor][1] - colors[color][childcolor][0])) + colors[color][childcolor][0]
        let green = Math.floor(Math.random() * (colors[color][childcolor][3] - colors[color][childcolor][2])) + colors[color][childcolor][2]
        let blue = Math.floor(Math.random() * (colors[color][childcolor][5] - colors[color][childcolor][4])) + colors[color][childcolor][4]
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

        document.getElementById("body").appendChild(dot)

        amount++
        i++

        setInterval(function remove() {
            document.getElementById("body").removeChild(dot)
            amount--
            dots()
        }, (random * 1000) + 500);
    }
}

