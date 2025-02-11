/**
 * @package     typeWriting
 * @description Lightweight JavaScript plugin for adding nice, customizable Typewriting effect using custom HTML5 attributes.
 * @author      Awran5 <github.com/awran5>
 * @version     1.0.1
 * @license     under MIT https://github.com/awran5/typewriting/blob/master/LICENSE
 * @see         <github.com/awran5/typewriting>
 * @tutorial    TraversyMedia https://www.youtube.com/watch?v=POX3dT-pB4E&t=307s
 */


class typeWriting {

    constructor(element) {
      this.element = element; // Selector
      this.words = JSON.parse(element.getAttribute('data-words')); // Input words
      this.speed = parseInt(element.getAttribute('data-speed'), 10) || 100; // fallback 100 ms
      this.delay = parseInt(element.getAttribute('data-delay'), 10) || 1000; // fallback 1000 ms
      this.loop = element.getAttribute('data-loop');
      this.char = ''; // word letters
      this.counter = 0; // loop counter
      this.isDeleting = false; // check when deleting letters
      this.type(); // Typing method
    }
  
    type() {
      // Set the words index.
      const index = this.loop === 'yes' ? this.counter % this.words.length : this.counter;
      // Get the full word
      const fullWord = this.words[index];
      // Typing speed
      let typeSpeed = this.speed;
  
      if (this.isDeleting) {
        // Divide speed by 2
        typeSpeed /= 2;
        // Add chars
        this.char = fullWord.substring(0, this.char.length - 1);
      } else {
        // Delete chars
        this.char = fullWord.substring(0, this.char.length + 1);
      }
      // Display on DOM
      this.element.innerHTML = `<span class="write">${this.char}</span><span class="blinking-cursor">|</span>`;
      // When word is completed
      if (!this.isDeleting && this.char === fullWord) {
        // break the loop before deletion.
        if (this.loop === "no" && this.counter >= this.words.length - 1) {
          return;
        }
        // Set char delete to true
        this.isDeleting = true;
        // Set time delay before new word
        typeSpeed = this.delay;
      } else if (this.isDeleting && this.char === '') {
        this.isDeleting = false;
        // Move to next word
        this.counter++;
      }
      // Set time out
      setTimeout(() => this.type(), typeSpeed);
  
    }
  
  }
  // Call the class on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', init)
  // Select all elements and trigger the class
  function init() {
    document.querySelectorAll('.typewrite').forEach(e => new typeWriting(e));
  }
// END OF TYPE WRITE JAVASCRIPT


// video section start
document.addEventListener('DOMContentLoaded', function() {
  const videoItems = document.querySelectorAll('.video-item');
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const closeModal = document.getElementById('close-modal');
  const prevButton = document.getElementById('prev-video');
  const nextButton = document.getElementById('next-video');
  let currentVideoIndex = -1;
  let originalVideoOrder = Array.from(videoItems);

  videoItems.forEach((item, index) => {
    const video = item.querySelector('video');

    item.addEventListener('mouseover', () => {
      // Show loading animation (if you have one, e.g., a spinner)
      var playPromise = video.play();

      if (playPromise !== undefined) {
        playPromise.then(_ => {
          // Automatic playback started!
          // Hide loading animation, show playing UI.
          video.style.boxShadow = '0 0 10px black';
        }).catch(error => {
          // Auto-play was prevented
          // Show paused UI or handle error.
          console.error('Play prevented: ', error);
        });
      }
    });

    item.addEventListener('mouseout', () => {
      video.pause();
      video.currentTime = 0;
      video.style.boxShadow = 'none';
    });

    item.addEventListener('click', () => {
      currentVideoIndex = index;
      openModal(video.src);
    });
  });

  closeModal.addEventListener('click', closeModalFunction);
  window.addEventListener('click', (event) => {
    if (event.target == modal) {
      closeModalFunction();
    }
  });

  prevButton.addEventListener('click', () => {
    currentVideoIndex--;
    if (currentVideoIndex < 0) {
      currentVideoIndex = videoItems.length - 1; // Wrap around to last item
    }
    updateModalVideo();
  });

  nextButton.addEventListener('click', () => {
    currentVideoIndex++;
    if (currentVideoIndex >= videoItems.length) {
      currentVideoIndex = 0; // Wrap around to first item
    }
    updateModalVideo();
  });

  function openModal(videoSrc) {
    modalVideo.src = videoSrc;
    // Show loading animation (if you have one, e.g., a spinner)
    var playPromise = modalVideo.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Hide loading animation, show playing UI.
        modal.style.display = 'flex';
      }).catch(error => {
        // Auto-play was prevented
        // Show paused UI or handle error.
        console.error('Play prevented: ', error);
      });
    }
  }

  function closeModalFunction() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0;
  }

  function updateModalVideo() {
    const newVideoSrc = videoItems[currentVideoIndex].querySelector('video').src;
    modalVideo.src = newVideoSrc;
    // Show loading animation (if you have one, e.g., a spinner)
    var playPromise = modalVideo.play();

    if (playPromise !== undefined) {
      playPromise.then(_ => {
        // Automatic playback started!
        // Hide loading animation, show playing UI.
      }).catch(error => {
        // Auto-play was prevented
        // Show paused UI or handle error.
        console.error('Play prevented: ', error);
      });
    }
  }
});


// // contact form email validation and sending script 
// function validateAndSend() {
//   const emailInput = document.getElementById('Email');
//   const messageInput = document.getElementById('message');
//   const emailError = document.getElementById('emailError');
//   const messageError = document.getElementById('messageError');
//   const loadingIndicator = document.getElementById('loading');

//   const email = emailInput.value.trim();
//   const message = messageInput.value.trim();

//   const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//   if (!email) {
//       emailError.textContent = 'Please enter your email.';
//       emailInput.style.borderColor = 'red'; // Change border color to red
//       emailInput.focus();
//       return false; // Prevents form submission and page refresh
//   } else {
//       emailError.textContent = ''; // Clear the error message if valid
//       emailInput.style.borderColor = ''; // Reset border color
//   }

//   if (!emailPattern.test(email)) {
//       emailError.textContent = 'Please enter a valid email address.';
//       emailInput.style.borderColor = 'red'; // Change border color to red
//       emailInput.focus();
//       return false; // Prevents form submission and page refresh
//   } else {
//       emailError.textContent = ''; // Clear the error message if valid
//       emailInput.style.borderColor = ''; // Reset border color
//   }

//   if (!message) {
//       messageError.textContent = 'Please enter a message.';
//       messageInput.style.borderColor = 'red'; // Change border color to red
//       messageInput.focus();
//       return false; // Prevents form submission and page refresh
//   } else {
//       messageError.textContent = ''; // Clear the error message if valid
//       messageInput.style.borderColor = ''; // Reset border color
//   }

//   // Show the loading indicator
//   loadingIndicator.style.display = 'block';

//   // Simulate a delay to show the loading indicator for a moment
//   setTimeout(() => {
//       const subject = 'CLIENT INQUIRY';
//       const mailtoLink = `mailto:sarnjij@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

//       window.location.href = mailtoLink;

//       // Hide the loading indicator after the action is taken
//       loadingIndicator.style.display = 'none';
//   }, 5000); // 7 seconds delay for demonstration

//   return false; // Prevents form submission and page refresh
// }


// scroll to top button element
// Get the button element
var scrollTopBtn = document.getElementById("scrollTopBtn");

// Show the button when scrolling down
window.onscroll = function() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    scrollTopBtn.style.display = "block";
  } else {
    scrollTopBtn.style.display = "none";
  }
};

// Scroll to  top when the button is clicked
scrollTopBtn.onclick = function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
};

//my works section video slider display in small devices
document.addEventListener('DOMContentLoaded', function() {
  const videoItems = document.querySelectorAll('.video-item');
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const closeModal = document.getElementById('close-modal');
  const prevButtonSm = document.getElementById('prev-video-sm');
  const nextButtonSm = document.getElementById('next-video-sm');
  const scrollTopBtn = document.getElementById('scrollTopBtn'); // Assuming this is the scroll top button
  let currentVideoIndex = 0; // Start with the first video

  // Function to open the modal with the selected video
  function openModal(videoSrc) {
    modalVideo.src = videoSrc;
    modal.style.display = 'flex'; // Show the modal
    modalVideo.play(); // Play the video
  }

  // Function to close the modal
  function closeModalFunction() {
    modal.style.display = 'none';
    modalVideo.pause();
    modalVideo.currentTime = 0; // Reset video time
  }

  // Function to update the modal video source and play it
  function updateModalVideo() {
    const newVideoSrc = videoItems[currentVideoIndex].querySelector('video').src;
    modalVideo.src = newVideoSrc;
    modalVideo.play(); // Play the new video
  }

  // Add click event listeners to video items
  videoItems.forEach((item, index) => {
    const video = item.querySelector('video');

    item.addEventListener('click', () => {
      currentVideoIndex = index; // Set the current video index
      openModal(video.src); // Open modal with the selected video
    });
  });

  // Close modal when clicking the close button
  closeModal.addEventListener('click', closeModalFunction);

  // Previous button functionality
  prevButtonSm.addEventListener('click', () => {
    currentVideoIndex--; // Move to the previous video
    if (currentVideoIndex < 0) {
      currentVideoIndex = videoItems.length - 1; // Wrap around to the last video
    }
    updateModalVideo(); // Update the modal video
  });

  // Next button functionality
  nextButtonSm.addEventListener('click', () => {
    currentVideoIndex++; // Move to the next video
    if (currentVideoIndex >= videoItems.length) {
      currentVideoIndex = 0; // Wrap around to the first video
    }
    updateModalVideo(); // Update the modal video
  });
});

// Check if the screen width is mobile
function isMobile() {
    return window.innerWidth <= 600;
}

// Adjust the openModal function to ensure the video plays correctly
function openModal(videoSrc) {
    if (isMobile()) {
        modalVideo.src = videoSrc; // Set the video source
        modalVideo.pause(); // Pause any currently playing video
        modalVideo.currentTime = 0; // Reset the video time
        var playPromise = modalVideo.play();

        if (playPromise !== undefined) {
            playPromise.then(_ => {
                modal.style.display = 'flex'; // Show the modal
            }).catch(error => {
                console.error('Play prevented: ', error);
            });
        }
    }
}

// Update the scrollVideoGrid function to ensure correct video display
function scrollVideoGrid(direction) {
    if (isMobile()) {
        const videoGrid = document.querySelector('.video-grid');
        const itemWidth = videoItems[0].clientWidth + 20; // item width + margin
        let scrollPosition = videoGrid.scrollLeft + (direction * itemWidth);
        const maxScrollPosition = videoGrid.scrollWidth - videoGrid.clientWidth;

        // Wrap around if we reach the end or start
        if (scrollPosition < 0) {
            scrollPosition = maxScrollPosition;
        } else if (scrollPosition > maxScrollPosition) {
            scrollPosition = 0;
        }

        videoGrid.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });

        // Update the currentVideoIndex based on the new scroll position
        const newCenterIndex = Math.round(scrollPosition / itemWidth);
        currentVideoIndex = newCenterIndex;
    }
}

// Initialize the video slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoItems = document.querySelectorAll('.video-item');
    const modal = document.getElementById('video-modal');
    const modalVideo = document.getElementById('modal-video');
    const closeModal = document.getElementById('close-modal');
    const prevButtonSm = document.getElementById('prev-video-sm');
    const nextButtonSm = document.getElementById('next-video-sm');
    let currentVideoIndex = 0; // Start with the first video

    // Function to open the modal with the selected video
    function openModal(videoSrc) {
        modalVideo.src = videoSrc;
        modal.style.display = 'flex'; // Show the modal
        modalVideo.play(); // Play the video
    }

    // Function to close the modal
    function closeModalFunction() {
        modal.style.display = 'none';
        modalVideo.pause();
        modalVideo.currentTime = 0; // Reset video time
    }

    // Function to update the modal video source and play it
    function updateModalVideo() {
        const newVideoSrc = videoItems[currentVideoIndex].querySelector('video').src;
        modalVideo.src = newVideoSrc;
        modalVideo.play(); // Play the new video
    }

    // Add click event listeners to video items
    videoItems.forEach((item, index) => {
        const video = item.querySelector('video');

        item.addEventListener('click', () => {
            currentVideoIndex = index; // Set the current video index
            openModal(video.src); // Open modal with the selected video
        });
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', closeModalFunction);

    // Previous button functionality
    prevButtonSm.addEventListener('click', () => {
        currentVideoIndex--; // Move to the previous video
        if (currentVideoIndex < 0) {
            currentVideoIndex = videoItems.length - 1; // Wrap around to the last video
        }
        updateModalVideo(); // Update the modal video
    });

    // Next button functionality
    nextButtonSm.addEventListener('click', () => {
        currentVideoIndex++; // Move to the next video
        if (currentVideoIndex >= videoItems.length) {
            currentVideoIndex = 0; // Wrap around to the first video
        }
        updateModalVideo(); // Update the modal video
    });
});














