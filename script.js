const prevButton = document.getElementById("prev");
const nextButton = document.getElementById("next");
const repeatButton = document.getElementById("repeat");
const shuffleButton = document.getElementById("shuffle");
const audio = document.getElementById("audio");
const songImage = document.getElementById("song-image");
const songName = document.getElementById("song-name");
const songArtist = document.getElementById("song-artist");
const counter = document.getElementById("counter");
const pauseButton = document.getElementById("pause");
const playButton = document.getElementById("play");
const playlistButton = document.getElementById("playlist");
const foldersButton = document.getElementById("folders");
const maxDuration = document.getElementById("max-duration");
const currentTimeRef = document.getElementById("current-time");
const progressBar = document.getElementById("progress-bar");
const playlistContainer = document.getElementById("playlist-container");
const foldersContainer = document.getElementById("folders-container");
const closeListButton = document.getElementById("close-button");
const closeFoldersButton = document.getElementById("close-folder-button");
const playlistSongs = document.getElementById("playlist-songs");
const folders = document.getElementById("foldersList");
const currentProgress = document.getElementById("current-progress");

//index for songs
let index = 0;
//index for albume number
let album = 1;
//handel first next song error
let firstclick = 0;
//handel albume list view
let albumView = 0;
let isopen = false;




//initially loop=true
let loop = true;


const songs = {

    Album1: [
        {
            name: "Talt Daat",
            link: "Media/1.MP3",
            artist: "Abu & Yousre",
            image: "Media/1.jpg",
        },
        {
            name: "Darawesh",
            link: "Media/2.mp3",
            artist: "Altoras",
            image: "Media/2.jpg",
        },
        {
            name: "Ana Lk Ala Tool",
            link: "Media/3.mp3",
            artist: "Abd EL-Haleem",
            image: "Media/3.jpg",
        },
        {
            name: "Bent-ElSoltan",
            link: "Media/4.mp3",
            artist: "Adwya",
            image: "Media/4.jpg",
        }, {
            name: "Talt Daat",
            link: "Media/5.MP3",
            artist: "Abu & Yousre",
            image: "Media/5.jpg",
        },
        {
            name: "Darawesh",
            link: "Media/6.mp3",
            artist: "Altoras",
            image: "Media/6.jpg",
        },
        {
            name: "Ana Lk Ala Tool",
            link: "Media/7.mp3",
            artist: "Abd EL-Haleem",
            image: "Media/7.jpg",
        },
        {
            name: "Bent-ElSoltan",
            link: "Media/8.mp3",
            artist: "Adwya",
            image: "Media/8.jpg",
        }
    ],
    Album2: [
        {
            name: "Darawesh",
            link: "Media/2.mp3",
            artist: "Altoras",
            image: "Media/2.jpg",
        },
        {
            name: "Ana Lk Ala Tool",
            link: "Media/3.mp3",
            artist: "Abd EL-Haleem",
            image: "Media/3.jpg",
        },
        {
            name: "Bent-ElSoltan",
            link: "Media/4.mp3",
            artist: "Adwya",
            image: "Media/4.jpg",
        }
    ],
    Album3: [
        {
            name: "Ana Lk Ala Tool",
            link: "Media/3.mp3",
            artist: "Abd EL-Haleem",
            image: "Media/3.jpg",
        },
        {
            name: "Bent-ElSoltan",
            link: "Media/4.mp3",
            artist: "Adwya",
            image: "Media/4.jpg",
        }
    ],
    Album4: [
        {
            name: "Bent-ElSoltan",
            link: "Media/4.mp3",
            artist: "Adwya",
            image: "Media/4.jpg",
        },
        {
            name: "Darawesh",
            link: "Media/2.mp3",
            artist: "Altoras",
            image: "Media/2.jpg",
        }
    ]

};

// get numberOfAlbums
const size = Object.keys(songs).length;
const numberOfAlbums = size;


//events object
let events = {
    mouse: {
        click: "click",
    },
    touch: {
        click: "touchstart",
    },
};

let deviceType = "";

//Detect touch device

const isTouchDevice = () => {
    try {
        //We try to create TouchEvent(it would fail for desktops and throw error)
        document.createEvent("TouchEvent");
        deviceType = "touch";
        return true;
    } catch (e) {
        deviceType = "mouse";
        return false;
    }
};

//Format time (convert ms to seconds, minutes and add 0 id less than 10)
const timeFormatter = (timeInput) => {
    let minute = Math.floor(timeInput / 60);
    minute = minute < 10 ? "0" + minute : minute;
    let second = Math.floor(timeInput % 60);
    second = second < 10 ? "0" + second : second;
    return `${minute}:${second}`;
};

// setIndex after selecting from the list
setIndex = (i) => {
    index = i;
}
//set song
const setSong = (arrayIndex = 0) => {
    setIndex(arrayIndex)

    let albumName = `Album${album}`;
    //this extracts all the variables from the object
    let { name, link, artist, image } = songs[albumName][arrayIndex];
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;
    //display duration when metadata loads
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };

    if (isopen == true) {
        playlistContainer.classList.add("hide");
        albumView = 1;
        albumeListHandler();
    } else {
        playlistContainer.classList.add("hide");
    }

};

// set Folders

const setFolder = (albumNum) => {
    const albumName = `Album${albumNum}`;
    const num = getAlbumLength(albumNum);
    index = 1;
    return [albumName, num]

};

const setAlbum = (num) => {
    album = num;
    initializePlaylist(num);
}

//get Album Length 
const getAlbumLength = (albumNum) => {
    albumNum = `Album${albumNum}`;
    let num = songs[albumNum].length;

    return num;
}

//Edit counter

const setCounter = (index = 0) => {
    let total = getAlbumLength(album);
    counter.innerText = ` ${index + 1}/${total}  Album (${album})`;
}

//play song
const playAudio = () => {
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
};

//repeat button
repeatButton.addEventListener("click", () => {
    if (repeatButton.classList.contains("active")) {
        repeatButton.classList.remove("active");
        audio.loop = false;
        // console.log("repeat off");
    } else {
        repeatButton.classList.add("active");
        audio.loop = true;
        // console.log("repeat on");
    }
});

//Next song
const nextSong = () => {

    if (firstclick == 0 && index >= 1) { index = 0 };
    ++firstclick;

    //getAlbumLength
    let albumName = `Album${album}`;
    let albumLength = songs[albumName].length;
    //if loop is true then continue in normal order
    if (loop) {
        if (index == albumLength - 1) {
            //If last song is being played
            index = 0;
        } else {
            index += 1;
        }
        setSong(index);
        setCounter(index);
        playAudio();
    } else {
        //else find a random index and play that song
        let randIndex = Math.floor(Math.random() * albumLength);
        setSong(randIndex);
        setCounter(randIndex);
        playAudio();
    }
};

//pause song
const pauseAudio = () => {
    audio.pause();
    pauseButton.classList.add("hide");
    playButton.classList.remove("hide");
};

//previous song ( you can't go back to a randomly played song)
const previousSong = () => {
    //getAlbumLength
    let albumName = `Album${album}`;
    let albumLength = songs[albumName].length;
    if (index > 0) {
        pauseAudio();
        index -= 1;
    } else {
        //if first song is being played
        index = albumLength - 1;
    }
    setSong(index);
    setCounter(index);
    playAudio();
};

//next song when current song ends
audio.onended = () => {
    nextSong();
};

//Shuffle songs
shuffleButton.addEventListener("click", () => {
    if (shuffleButton.classList.contains("active")) {
        shuffleButton.classList.remove("active");
        loop = true;
        // console.log("shuffle off");
    } else {
        shuffleButton.classList.add("active");
        loop = false;
        // console.log("shuffle on");
    }
});

//play button
playButton.addEventListener("click", playAudio);

//next button
nextButton.addEventListener("click", nextSong);

//pause button
pauseButton.addEventListener("click", pauseAudio);

//prev button
prevButton.addEventListener("click", previousSong);

//if user clicks on progress bar
isTouchDevice();
progressBar.addEventListener(events[deviceType].click, (event) => {
    //start of progressBar
    let coordStart = progressBar.getBoundingClientRect().left;
    //mouse click position
    let coordEnd = !isTouchDevice() ? event.clientX : event.touches[0].clientX;
    let progress = (coordEnd - coordStart) / progressBar.offsetWidth;

    //set width to progress
    currentProgress.style.width = progress * 100 + "%";

    //set time
    audio.currentTime = progress * audio.duration;

    //play
    audio.play();
    pauseButton.classList.remove("hide");
    playButton.classList.add("hide");
});

//update progress every second
setInterval(() => {
    currentTimeRef.innerHTML = timeFormatter(audio.currentTime);
    currentProgress.style.width =
        (audio.currentTime / audio.duration.toFixed(3)) * 100 + "%";
});

//update time
audio.addEventListener("timeupdate", () => {
    currentTimeRef.innerText = timeFormatter(audio.currentTime);
});

// play song frome the selected album
const playSong = (albumNum) => {
    let albumName = `Album${albumNum}`;
    let { name, link, artist, image } = songs[albumName][0];
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;
    //display duration when metadata loads
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };

    playAudio();
}

//handel keep the albume list open after close or chossing a song while albume list is opend
albumeListHandler = () => {
    if (albumView == 1 && isopen == true) {
        foldersContainer.classList.remove("hide");
        playlistContainer.classList.add("hide");
    } else {
        foldersContainer.classList.add("hide");
        playlistContainer.classList.remove("hide");
    }
}
//set song view after select the album
setSongView = (albumNum) => {
    let albumName = `Album${albumNum}`;
    let { name, link, artist, image } = songs[albumName][0];
    audio.src = link;
    songName.innerHTML = name;
    songArtist.innerHTML = artist;
    songImage.src = image;
    //display duration when metadata loads
    audio.onloadedmetadata = () => {
        maxDuration.innerText = timeFormatter(audio.duration);
    };
    foldersContainer.classList.add("hide");
    playlistContainer.classList.remove("hide");
    albumView = 0;
    albumeListHandler();
}


//Creates playlist depends on selected album
const initializePlaylist = (albumNum = 1) => {
    albumView = 1;
    playlistSongs.innerHTML = "";
    let albumName = `Album${albumNum}`;
    let albumLength = getAlbumLength(albumNum);
    for (let i = 0; i < albumLength; i++) {
        let { name, artist, image } = songs[albumName][i];
        playlistSongs.innerHTML += `<li class='playlistSong' onclick='setSong(${i}); playAudio(); setCounter(${i});'>
            <div class="playlist-image-container">
                <img src="${image}"/>
            </div>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                    ${name}
                </span>
                <span id="playlist-song-artist-album">
                    ${artist}
                </span>
            </div>
        </li>`;
    }
};

resetIndex = () => {
    index = 0;
}
// Creates folders
const initializeFolerslist = () => {
    albumView = 1;
    for (let i = 1; i <= numberOfAlbums; i++) {
        const [albumName, num] = setFolder(i)
        folders.innerHTML += `<li class='playlistSong' onclick='setAlbum(${i}); setSongView(${i});albumeListHandler(); setCounter(0); resetIndex();'>
            <div class="playlist-song-details">
                <span id="playlist-song-name">
                ${albumName}
                </span>
                <span id="playlist-song-artist-album">
                ${num}
                </span>
            </div>
        </li>`;
    }
};

//display playlist
playlistButton.addEventListener("click", () => {
    playlistContainer.classList.remove("hide");
    albumView = 1;
    albumeListHandler();
});

//display folders
foldersButton.addEventListener("click", () => {
    foldersContainer.classList.remove("hide");
    isopen = true;
});

//hide playlist
closeListButton.addEventListener("click", () => {
    if (isopen == true) {
        playlistContainer.classList.add("hide");
        albumView = 1;
        albumeListHandler();
    } else {
        playlistContainer.classList.add("hide");
    }

});

//hide folders list
closeFoldersButton.addEventListener("click", () => {
    foldersContainer.classList.add("hide");
    isopen = false;
});

window.onload = () => {
    //initially first song
    index = 0;
    setSong(index);
    //create playlist
    initializePlaylist();
    //create playlist
    initializeFolerslist();
    setCounter();

};