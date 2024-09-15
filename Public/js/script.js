
// const newImage = document.createElement('img');


// newImage.src = ''; 


// newImage.alt = 'Description of the image'; 


// const container = document.getElementById('container'); 


// container.appendChild(newImage);

//ship ups java script 
let player; // Variable to hold the YouTube player

// Function to open the modal and load the YouTube video
function openModal() {
  document.getElementById("myModal").style.display = "flex";

  // If the YouTube player is not initialized, create it
  if (!player) {
    player = new YT.Player("youtubeVideo", {
      videoId: "/movie/19404",
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }
}
window.addEventListener("load", function () {
  document.querySelector(".close").addEventListener("click", closeModal);
});

// Function to close the modal and stop the YouTube video
function closeModal() {
  document.getElementById("myModal").style.display = "none";
  if (player) {
    player.stopVideo();
  }
}

// Function called when the YouTube player is ready
function onPlayerReady(event) {
  event.target.playVideo();
}

// Function called when the YouTube player's state changes
function onPlayerStateChange(event) {}

