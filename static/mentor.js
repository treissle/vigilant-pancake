const starRatings = document.querySelectorAll(".star-rating");

starRatings.forEach((starRating) => {
  const stars = starRating.querySelectorAll(".star");

  stars.forEach((star, index) => {
    star.addEventListener("click", () => {
      handleStarClick(starRating, star, index);
    });

    star.addEventListener("mouseover", () => {
      handleStarMouseover(starRating, star, index);
    });

    star.addEventListener("mouseout", () => {
      handleStarMouseout(starRating, star, index);
    });
  });
});

function handleStarClick(starRating, star, index) {
  const selectedStars = starRating.querySelectorAll(".star");
  if (star.classList.contains("selected")) {
    selectedStars.forEach((selectedStar, selectedIndex) => {
      if (selectedIndex <= index) {
        selectedStar.classList.remove("selected");
        selectedStar.style.color = "#ccc";
      }
    });
  } else {
    selectedStars.forEach((selectedStar, selectedIndex) => {
      if (selectedIndex <= index) {
        selectedStar.classList.add("selected");
        selectedStar.style.color = "green";
      }
    });
  }
}

function handleStarMouseover(starRating, star, index) {
  const selectedStars = starRating.querySelectorAll(".star");
  if (!star.classList.contains("selected")) {
    for (let i = 0; i <= index; i++) {
      selectedStars[i].style.color = "#a9e5a9";
    }
  }
}

function handleStarMouseout(starRating, star, index) {
  const selectedStars = starRating.querySelectorAll(".star");
  selectedStars.forEach((selectedStar, selectedIndex) => {
    if (!selectedStar.classList.contains("selected")) {
      selectedStar.style.color = "#ccc";
    }
  });
}

// Tab Functionality
var tabButtons = document.querySelectorAll('.tabButton');

tabButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    deactivateAllTabs();
    button.classList.add('activeTab');
    // Assuming you have a way to identify which mentee is associated with this tab:
    const menteeName = button.getAttribute('data-mentee-name');
    if (menteeName) {
      updateMeetingsDisplay(menteeName);
    }
  });
});

function deactivateAllTabs() {
  tabButtons.forEach(function(button) {
    button.classList.remove('activeTab');
  });
}

function logout() {
  const isConfirmed = confirm('Are you sure you want to log out?');
  if (isConfirmed) {
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


const meetingsData = {
  "Aniket": [
    {"date": "2024-04-08", "description": " 12pm: Meeting with Aniket"},
    {"date": "2024-04-15", "description": " 12pm: Meeting with Aniket"},
    {"date": "2024-04-22", "description": " 12pm: Meeting with Aniket"},
    {"date": "2024-04-29", "description": " 12pm: Meeting with Aniket"}
   
  ],
  "Sachi": [
    {"date": "2024-04-11", "description": " 2pm: Meeting with Sachi"},
    {"date": "2024-04-18", "description": " 2pm: Meeting with Sachi"},
    {"date": "2024-04-25", "description": " 2pm: Meeting with Sachi"}

  ],
  "Lizzie": [
  {"date": "2024-04-09", "description": " 9am: Meeting with Lizzie"},
  {"date": "2024-04-16", "description": " 9am: Meeting with Lizzie"},
  {"date": "2024-04-23", "description": " 9am: Meeting with Lizzie"},
  {"date": "2024-04-30", "description": " 9am: Meeting with Lizzie"}
    ],
  "Tom": [
  {"date": "2024-04-12", "description": " 10am: Meeting with Tom"},
  {"date": "2024-04-19", "description": " 10am: Meeting with Tom"},
  {"date": "2024-04-26", "description": " 10am: Meeting with Tom"}
    ],

  "Dr.Nichols": [ 
  {"date": "2024-04-10", "description": " 1pm: Meeting with Dr.Nichols"},
  {"date": "2024-04-17", "description": " 1pm: Meeting with Dr.Nichols"},
  {"date": "2024-04-24", "description": " 1pm: Meeting with Dr.Nichols"}
    ],
  "Dr.Mazzola": [ 
  {"date": "2024-04-12", "description": " 10am: Meeting with Dr.Mazzola"},
  {"date": "2024-04-19", "description": " 10am: Meeting with Dr.Mazzola"},
  {"date": "2024-04-26", "description": " 10am: Meeting with Dr.Mazzola"}
    ]
};
const menteeProgress = {
  "Aniket": 30,
  "Sachi": 40,
  "Lizzie": 50,
  "Tom": 70,
  "Youjin": 0,
  "Dr.Nichols" : 50,
  "Dr.Mazzola" : 50,
};

function updateMeetingsDisplay(menteeName) {
  console.log('Selected Mentee:', menteeName);

  const calendarDays = document.querySelectorAll('.calendar ul li');

  calendarDays.forEach(day => {
    const detailSpan = day.querySelector('.meeting-detail');
    if (detailSpan) {
      detailSpan.textContent = '';
    }
  });

  if (meetingsData.hasOwnProperty(menteeName)) {
    const meetings = meetingsData[menteeName];
    console.log('Meetings for', menteeName + ':', meetings);

    meetings.forEach(meeting => {
      const dayElement = Array.from(calendarDays).find(day =>
        day.querySelector('time').getAttribute('datetime') === meeting.date
      );
      if (dayElement) {
        let detailSpan = dayElement.querySelector('.meeting-detail');
        if (!detailSpan) {
          detailSpan = document.createElement('span');
          detailSpan.className = 'meeting-detail';
          dayElement.appendChild(detailSpan);
        }
        detailSpan.textContent = meeting.description;
        const progressBarInner = document.querySelector('.progress-bar-inner');
        const progressBar = document.querySelector('.progress-bar');
        const progressPercentage = menteeProgress[menteeName] || 0; // Default to 0 if not found

        if (menteeName == "Dr.Nichols" || menteeName == "Dr.Mazzola"){
          progressBarInner.style.width = `${progressPercentage}%`;
          progressBarInner.textContent = `${progressPercentage}%`;
        }
        else{
          if (progressPercentage != 0){
            progressBarInner.style.width = `${progressPercentage}%`;
          }
          else {
            progressBarInner.style.width = '20%';
          }
          progressBarInner.textContent = `Mentee Progress: ${progressPercentage}%`;
        }
    
      }
      
    });
  }
}

function redirectToDirectory() {
  var url = "/directory"; 
  var win = window.open(url, '_blank');
  win.focus();
}


function sendMessage () {
  alert('Message Sent to their Slack');
  document.getElementById('textarea').value = '';
}