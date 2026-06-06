document.addEventListener("DOMContentLoaded", () => {
    const songContainer = 
        document.getElementById("songContainer");
    const searchBtn = 
        document.getElementById("searchBtn");
    const searchInput = 
        document.getElementById("searchInput");

    // SEARCH SONGS
    async function searchSongs(query) {
        songContainer.innerHTML = 
            "<h2>Loading...</h2>";
        try {
            // Using CORS proxy + RapidAPI
            const response = await fetch(
                `https://cors-anywhere.herokuapp.com/https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
                {
                    method: "GET",
                    headers: {
                        "X-RapidAPI-Key": "a666b57759msh05fb77d6f3e6815p165096jsn41270454d859",
                        "X-RapidAPI-Host": "deezerdevs-deezer.p.rapidapi.com"
                    }
                }
            );
            const data = await response.json();
            displaySongs(data.data);
        } catch (error) {
            console.log(error);
            songContainer.innerHTML = 
                "<h2>Error loading songs</h2>";
        }
    }

    // ADD FAVORITE
    async function addFavorite(song) {
        try {
            await fetch(
                // Replace with your Render URL
                "https://your-app.onrender.com/favorites",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(song)
                }
            );
            alert("Song added to favorites! ❤️");
        } catch (error) {
            console.log(error);
        }
    }

    // DISPLAY SONGS
    function displaySongs(songs) {
        songContainer.innerHTML = "";
        songs.forEach((song) => {
            songContainer.innerHTML += `
            <div class="song-item">
                <img src="${song.album.cover_medium}">
                <div class="song-info">
                    <h3>${song.title}</h3>
                    <p>${song.artist.name}</p>
                </div>
                <button class="fav-btn">❤️ Favorite</button>
                <audio controls>
                    <source 
                        src="${song.preview}" 
                        type="audio/mp3">
                </audio>
            </div>`;
        });

        const favButtons = 
            document.querySelectorAll(".fav-btn");
        favButtons.forEach((button, index) => {
            button.addEventListener("click", () => {
                addFavorite(songs[index]);
            });
        });
    }

    // SEARCH BUTTON
    searchBtn.addEventListener("click", () => {
        searchSongs(searchInput.value);
    });

    // ENTER KEY SEARCH
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchSongs(searchInput.value);
        }
    });

    // DEFAULT SEARCH
    searchSongs("Arijit");
});

     
