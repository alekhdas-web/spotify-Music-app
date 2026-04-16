document.addEventListener("DOMContentLoaded", () => {
    const masterPlay = document.getElementById("masterPlay");
    const shuffle = document.querySelector(".shuffle");
    const seek = document.querySelector("#seek");
    const bar2 = document.querySelector(".bar2");
    const dot = document.querySelector(".dot");
    const currentStart = document.querySelector("#current-start");
    const currentEnd = document.querySelector("#current-end");
    const vol_icon = document.querySelector("#vol-icon");
    const vol_bar = document.querySelector(".vol-bar");
    const vol_dot = document.querySelector(".vol-dot");
    const back = document.querySelector("#back");
    const next = document.querySelector("#next");

    const music = new Audio("audiospotify/1.mp3");

    let index = 1;
    const playlistPlayButtons = Array.from(document.getElementsByClassName("playListPlay")); // convert to array
    

    // Play/Pause Functionality with check for masterPlay
    if (masterPlay) {
        masterPlay.addEventListener("click", () => {
            if (music.paused || music.currentTime <= 0) {
                music.play();
                masterPlay.classList.add("fa-pause");
                masterPlay.classList.remove("fa-play");
            } else {
                music.pause();
                masterPlay.classList.remove("fa-pause");
                masterPlay.classList.add("fa-play");
            }
        });
    }
// Playlist buttons functionality
    if (playlistPlayButtons.length > 0) {
        playlistPlayButtons.forEach((button) => {
            button.addEventListener('click', (event) => {
                const playListPlayId = event.currentTarget.id;
                index = parseInt(playListPlayId); // use index as a global variable

                // If the clicked button is already playing, pause the music
                if (!music.paused && music.src.includes(`audiospotify/${index}.mp3`)) {
                    music.pause();
                    button.classList.remove('fa-pause');
                    button.classList.add('fa-play');

                    if (masterPlay) {
                        masterPlay.classList.remove('fa-pause');
                        masterPlay.classList.add('fa-play');
                    }
                } else {
                    // Set and play the selected song
                    music.src = `audiospotify/${index}.mp3`;
                    music.play();

                    // Reset all playlist buttons to play state
                    playlistPlayButtons.forEach((btn) => {
                        btn.classList.remove('fa-pause');
                        btn.classList.add('fa-play');
                    });

                    // Update the clicked button to pause state
                    button.classList.add('fa-pause');
                    button.classList.remove('fa-play');

                    if(masterPlay){
                        masterPlay.classList.add('fa-pause');
                        masterPlay.classList.remove('fa-play');
                    }
              }
            });
        });
    }
    

});



