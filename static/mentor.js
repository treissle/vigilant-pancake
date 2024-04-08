
const starRatings = document.querySelectorAll(".star-rating");

starRatings.forEach((starRating) => {
  const stars = starRating.querySelectorAll(".star");

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      const selectedStars = starRating.querySelectorAll(".star");

      if (star.classList.contains("selected")) {
        selectedStars.forEach((selectedStar, selectedIndex) => {
          // Can toggle if statement, need to discuss in meeting what behavior we want
          // if (selectedIndex <= index) {
          selectedStar.classList.remove("selected");
          selectedStar.style.color = "#ccc";
          // }
        });
      } else {
        selectedStars.forEach((selectedStar, selectedIndex) => {
          if (selectedIndex <= index) {
            selectedStar.classList.add("selected");
            selectedStar.style.color = "green";
          }
        });
      }
    });

    star.addEventListener("mouseover", () => {
      const selectedStars = starRating.querySelectorAll(".star");
      if (!star.classList.contains("selected")) {
        for (let i = 0; i <= index; i++) {
          selectedStars[i].style.color = "#a9e5a9";
        }
      }
    });

    star.addEventListener("mouseout", () => {
      const selectedStars = starRating.querySelectorAll(".star");
      selectedStars.forEach((selectedStar, selectedIndex) => {
        if (!selectedStar.classList.contains("selected")) {
          selectedStar.style.color = selectedIndex <= index ? "#ccc" : "#ccc";
        }
      });
    });
  });
  // Select all tab buttons
  var tabButtons = document.querySelectorAll('.tabButton');

  // Function to remove active class from all tabs
  function deactivateAllTabs() {
    tabButtons.forEach(function(button) {
      button.classList.remove('activeTab');
    });
  }

  // Add click event listener to each tab button
  tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      // Deactivate all tabs first
      deactivateAllTabs();
      // Add the active class to the clicked tab
      button.classList.add('activeTab');
    });
  });
});

function changeTab(progressWidth) {
  var progressBarInner = document.querySelector('.progress-bar-inner');
  progressBarInner.style.width = progressWidth + '%';
  progressBarInner.textContent = 'Mentee Progress: ' + progressWidth + '%';
}

function logout() {
  const isConfirmed = confirm('Are you sure you want to log out?')

  if(isConfirmed){
    fetch('/logout', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      })
      .then(() => {
          window.location.href = '/login';
      })
      .catch(error => {
          console.error('Error:', error);
      });
  }
}
