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

            const response = await fetch(
               `https://cors-anywhere.herokuapp.com/https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
                {
                    method: "GET",

                    headers: {

                        "X-RapidAPI-Key":
                            "a666b57759msh05fb77d6f3e6815p165096jsn41270454d859",

                        "X-RapidAPI-Host":
                            "deezerdevs-deezer.p.rapidapi.com"
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



    
    // DISPLAY SONGS

    function displaySongs(songs) {

        async function addFavorite(song){

    try{

        await fetch(
            "http://localhost:5000/favorites", //favorites.json e backend file store hbe jeta favourite//
            {
                method:"POST",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify(song)
            }
        );

        alert("Song added to favorites");

    }catch(error){

        console.log(error);
    }
} //backend function added run server 5000 first//


        songContainer.innerHTML = "";

        songs.forEach((song) => {

            songContainer.innerHTML += `

            <div class="song-item">

                <img src="${song.album.cover_medium}">

                <div class="song-info">

                    <h3>${song.title}</h3>

                    <p>${song.artist.name}</p>

                </div>

                <button class="fav-btn">
   ❤️ Favorite
</button>

                <audio controls>


                    <source 
                        src="${song.preview}" 
                        type="audio/mp3"
                    >

                </audio>

            </div>
            `;
        }); 

        const favButtons =
    document.querySelectorAll(".fav-btn");

favButtons.forEach((button,index)=>{

    button.addEventListener("click",()=>{

        addFavorite(songs[index]);
    });
});
    }



    
    // BUTTON SEARCH
    

    searchBtn.addEventListener("click", () => {

        const query = searchInput.value;

        searchSongs(query);
    });



    
    // ENTER SEARCH
    

    searchInput.addEventListener("keypress", (e) => {

        if (e.key === "Enter") {

            searchSongs(searchInput.value);
        }
    });



    
    // DEFAULT SONGS
    

    searchSongs("Arijit");
});
