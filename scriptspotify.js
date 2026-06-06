document.addEventListener("DOMContentLoaded", () => {
    const songContainer = 
        document.getElementById("songContainer");
    const searchBtn = 
        document.getElementById("searchBtn");
    const searchInput = 
        document.getElementById("searchInput");

    // SEARCH SONGS — Direct Deezer API
    async function searchSongs(query) {
        songContainer.innerHTML = 
            "<h2>Loading... 🎵</h2>";
        try {
            const response = await fetch(
                `https://api.deezer.com/search?q=${query}&limit=10`
            );
            const data = await response.json();
            
            if(data.data && data.data.length > 0) {
                displaySongs(data.data);
            } else {
                songContainer.innerHTML = 
                    "<h2>No songs found!</h2>";
            }
        } catch (error) {
            console.log(error);
            songContainer.innerHTML = 
                "<h2>Error loading songs!</h2>";
        }
    }

    // DISPLAY SONGS
    function displaySongs(songs) {
        songContainer.innerHTML = "";
        songs.forEach((song) => {
            songContainer.innerHTML += `
            <div class="song-item">
                <img src="${song.album.cover_medium}" 
                     alt="${song.title}">
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist.name}</p>
                </div>
                <audio controls>
                    <source 
                        src="${song.preview}" 
                        type="audio/mp3">
                </audio>
            </div>`;
        });
    }

    // SEARCH BUTTON
    searchBtn.addEventListener("click", () => {
        const query = searchInput.value.trim();
        if(query) searchSongs(query);
    });

    // ENTER KEY
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            const query = 
                searchInput.value.trim();
            if(query) searchSongs(query);
        }
    });

    // DEFAULT SEARCH
    searchSongs("Arijit Singh");
});
