function copy(text) {
    navigator.clipboard.writeText(text);
    document.getElementById("kris")
}

function load() {
    if (Math.random() >= 0.985) {
        document.getElementById("kris").src = "images/fishe.png"
        document.getElementById("kris").style.borderRadius = "10%"
        document.getElementById("gitimg").src = "images/bestia.gif"
        document.getElementById("gitimg").style.borderRadius = "10%"
        document.getElementById("ytimg").src = "images/moyai.gif"
        document.getElementById("ytimg").style.borderRadius = "10%"
        document.getElementById("dcimg").src = "images/moyai.gif"
        document.getElementById("dcimg").style.borderRadius = "10%"
        document.getElementById("tgimg").src = "images/moyai.gif"
        document.getElementById("tgimg").style.borderRadius = "10%"
    }
}