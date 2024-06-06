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
          video.play();
          video.style.boxShadow = '0 0 10px black';
      });

      item.addEventListener('mouseout', () => {
          video.pause();
          video.currentTime = 0;
          video.style.boxShadow = 'none';
      });

      item.addEventListener('click', () => {
          currentVideoIndex = index;
          openModal(video.src);
          item.style.display = 'none'; // Hide the video item div when modal opens
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
          currentVideoIndex = videoItems.length - 1;
      }
      updateModalVideo();
  });

  nextButton.addEventListener('click', () => {
      currentVideoIndex++;
      if (currentVideoIndex >= videoItems.length) {
          currentVideoIndex = 0;
      }
      updateModalVideo();
  });

  function openModal(videoSrc) {
      modalVideo.src = videoSrc;
      modal.style.display = 'flex';
      modalVideo.play();
  }

  function closeModalFunction() {
      modal.style.display = 'none';
      modalVideo.pause();
      modalVideo.currentTime = 0;
      videoItems.forEach(item => item.style.display = ''); // Show all video item divs when modal closes
      originalVideoOrder.forEach(item => item.parentElement.appendChild(item)); // Restore original order
  }

  function updateModalVideo() {
      const newVideoSrc = videoItems[currentVideoIndex].querySelector('video').src;
      modalVideo.src = newVideoSrc;
      modalVideo.play();
  }
});


// contact form email validation and sending script 
function validateAndSend() {
  const emailInput = document.getElementById('Email');
  const messageInput = document.getElementById('message');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const loadingIndicator = document.getElementById('loading');

  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email) {
      emailError.textContent = 'Please enter your email.';
      emailInput.style.borderColor = 'red'; // Change border color to red
      emailInput.focus();
      return false; // Prevents form submission and page refresh
  } else {
      emailError.textContent = ''; // Clear the error message if valid
      emailInput.style.borderColor = ''; // Reset border color
  }

  if (!emailPattern.test(email)) {
      emailError.textContent = 'Please enter a valid email address.';
      emailInput.style.borderColor = 'red'; // Change border color to red
      emailInput.focus();
      return false; // Prevents form submission and page refresh
  } else {
      emailError.textContent = ''; // Clear the error message if valid
      emailInput.style.borderColor = ''; // Reset border color
  }

  if (!message) {
      messageError.textContent = 'Please enter a message.';
      messageInput.style.borderColor = 'red'; // Change border color to red
      messageInput.focus();
      return false; // Prevents form submission and page refresh
  } else {
      messageError.textContent = ''; // Clear the error message if valid
      messageInput.style.borderColor = ''; // Reset border color
  }

  // Show the loading indicator
  loadingIndicator.style.display = 'block';

  // Simulate a delay to show the loading indicator for a moment
  setTimeout(() => {
      const subject = 'CLIENT INQUIRY';
      const mailtoLink = `mailto:sarnjij@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

      window.location.href = mailtoLink;

      // Hide the loading indicator after the action is taken
      loadingIndicator.style.display = 'none';
  }, 10000); // 10 seconds delay for demonstration

  return false; // Prevents form submission and page refresh
}




// scroll up button element
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

// Scroll to the top when the button is clicked
scrollTopBtn.onclick = function() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE, and Opera
};




// javascript for my works section video slider display in small devices
document.addEventListener('DOMContentLoaded', function() {
  const videoGrid = document.querySelector('.video-grid');
  const videoItems = document.querySelectorAll('.video-item');
  const prevButtonSm = document.getElementById('prev-video-sm');
  const nextButtonSm = document.getElementById('next-video-sm');
  const videoSection = document.getElementById('my-works-section');

  let currentIndex = 0;

  prevButtonSm.addEventListener('click', () => {
      if (currentIndex > 0) {
          currentIndex--;
          scrollToVideo(currentIndex);
      }
  });

  nextButtonSm.addEventListener('click', () => {
      if (currentIndex < videoItems.length - 1) {
          currentIndex++;
          scrollToVideo(currentIndex);
      }
  });

  function scrollToVideo(index) {
      const videoItem = videoItems[index];
      videoItem.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      playVideo(index);
  }

  function playVideo(index) {
      videoItems.forEach((item, i) => {
          const video = item.querySelector('video');
          if (i === index) {
              video.play();
          } else {
              video.pause();
              video.currentTime = 0;
          }
      });
  }

  videoItems.forEach((item, index) => {
      const video = item.querySelector('video');
      const playButton = item.querySelector('.play-button');

      item.addEventListener('mouseover', () => {
          video.play();
          video.style.boxShadow = '0 0 10px black';
      });

      item.addEventListener('mouseout', () => {
          video.pause();
          video.currentTime = 0;
          video.style.boxShadow = 'none';
      });

      playButton.addEventListener('click', (e) => {
          e.stopPropagation(); // Prevent triggering the parent click event
          currentIndex = index; // Update current index
          if (video.paused) {
              video.play();
          } else {
              video.pause();
          }
      });
  });

  function checkVisibility() {
      const rect = videoSection.getBoundingClientRect();
      const viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      const isVisible = !(rect.bottom < 0 || rect.top - viewHeight >= 0);

      if (isVisible) {
          prevButtonSm.style.display = 'flex';
          nextButtonSm.style.display = 'flex';
      } else {
          prevButtonSm.style.display = 'none';
          nextButtonSm.style.display = 'none';
      }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility(); // Initial check
});







