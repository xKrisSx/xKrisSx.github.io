function playSound(sound) {
    let audio = new Audio("sounds/" + sound + ".mp3");
    audio.play();
}