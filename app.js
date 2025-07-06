let startTime;
let timerInterval;
let logData = "";

// Called on login page
function signIn() {
  const username = document.getElementById("username").value;
  if (!username) {
    alert("Please enter a username.");
    return;
  }

  startTime = new Date();
  logData = `User '${username}' signed in at: ${startTime.toLocaleString()}\n`;

  // Add user to list if not already in it
  let users = JSON.parse(localStorage.getItem("userList") || "[]");
  if (!users.includes(username)) {
    users.push(username);
    localStorage.setItem("userList", JSON.stringify(users));
  }

  localStorage.setItem("startTime", startTime);
  localStorage.setItem("username", username);

  window.location.href = "feed.html";
}

// Start timer on feed page
function startFeedTimer() {
  checkResetCumulativeTime();

  const savedTime = localStorage.getItem("startTime");
  const username = localStorage.getItem("username");
  if (!savedTime || !username) {
    window.location.href = "index.html";
    return;
  }

  startTime = new Date(savedTime);
  timerInterval = setInterval(() => checkScreenTime(username), 1000);
}

// Check session time and cumulative time
function checkScreenTime(username) {
  const now = new Date();
  const elapsedSeconds = Math.floor((now - startTime) / 1000);
  const totalTime = getCumulativeTime() + elapsedSeconds;

  const minutes = Math.floor(elapsedSeconds / 60);
  const seconds = elapsedSeconds % 60;

  const screenTimeDisplay = document.getElementById("screenTime");
  if (screenTimeDisplay) {
    screenTimeDisplay.textContent = `Screen time: ${minutes}m ${seconds}s (Total today: ${Math.floor(totalTime / 60)}m ${totalTime % 60}s)`;
  }

  // At exactly 20 minutes (1200s) into session
  if (elapsedSeconds === 1200) {
    const message = "⏰ You’ve reached your daily screentime limit — consider taking a break!";
    alert(message);
    addFeedNotification(message);

    logData += `Screen time reached: ${minutes}m ${seconds}s\n`;
    logData += `${message}\n`;
  }

  // Check cumulative limit every second
  checkCumulativeLimit(totalTime);
}

// Cumulative screentime helpers
function getCumulativeTime() {
  return parseInt(localStorage.getItem("cumulativeTime") || "0");
}

function setCumulativeTime(seconds) {
  localStorage.setItem("cumulativeTime", seconds);
}

// Reset cumulative time daily
function checkResetCumulativeTime() {
  const lastDate = localStorage.getItem("lastDate");
  const today = new Date().toDateString();
  if (lastDate !== today) {
    setCumulativeTime(0);
    localStorage.setItem("lastDate", today);
    localStorage.removeItem("weeklyLimitReached");
  }
}

// Check cumulative time against 2-hour limit
function checkCumulativeLimit(totalTime) {
  if (totalTime >= 7200 && !localStorage.getItem("weeklyLimitReached")) {
    localStorage.setItem("weeklyLimitReached", "true");

    const message = "🚨 You have exceeded your weekly screentime limit. Please log off and enjoy your week!!";

    logData += `${message}\n`;

    alert(message);

    signOut(); // Force sign out after acknowledgment
  }
}

// Download log file
function downloadLog(data, username) {
  const blob = new Blob([data], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${username}_session_log.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// Sign out, save log, cumulative time
function signOut() {
  clearInterval(timerInterval);

  const now = new Date();
  const username = localStorage.getItem("username") || "Unknown";
  const savedTime = localStorage.getItem("startTime");
  const elapsedSeconds = savedTime ? Math.floor((now - new Date(savedTime)) / 1000) : 0;
  const cumulativeSeconds = getCumulativeTime() + elapsedSeconds;

  setCumulativeTime(cumulativeSeconds);

  logData += `Session Ended: ${now.toLocaleString()}\n`;
  logData += `Session Duration: ${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s\n`;
  logData += `Cumulative Time Today: ${Math.floor(cumulativeSeconds / 60)}m ${cumulativeSeconds % 60}s\n`;

  downloadLog(logData, username);

  localStorage.removeItem("startTime");
  localStorage.removeItem("username");

  window.location.href = "index.html";
}

// Add post to feed
function addPost() {
  const content = document.getElementById("postContent").value.trim();
  if (!content) {
    alert("Please enter a message before posting.");
    return;
  }

  const postDiv = document.createElement("div");
  postDiv.className = "post";

  const metaDiv = document.createElement("div");
  metaDiv.className = "meta";
  metaDiv.textContent = `${localStorage.getItem("username")} · ${new Date().toLocaleTimeString()}`;

  const contentP = document.createElement("p");
  contentP.textContent = content;

  postDiv.appendChild(metaDiv);
  postDiv.appendChild(contentP);

  const feed = document.getElementById("feed");
  feed.insertBefore(postDiv, feed.firstChild);

  document.getElementById("postContent").value = "";
}

// Add system notification to feed
function addFeedNotification(message) {
  const feed = document.getElementById("feed");
  const postDiv = document.createElement("div");
  postDiv.className = "post";

  const metaDiv = document.createElement("div");
  metaDiv.className = "meta";
  metaDiv.textContent = `TimeSpace Notice · ${new Date().toLocaleTimeString()}`;

  const contentP = document.createElement("p");
  contentP.textContent = message;

  postDiv.appendChild(metaDiv);
  postDiv.appendChild(contentP);

  feed.insertBefore(postDiv, feed.firstChild);
}

// Add user to user list (non-active)
function addUser() {
  const newUser = prompt("Enter new username to add:");
  if (!newUser) {
    alert("No username entered.");
    return;
  }

  let users = JSON.parse(localStorage.getItem("userList") || "[]");
  if (users.includes(newUser)) {
    alert("User already exists.");
    return;
  }

  users.push(newUser);
  localStorage.setItem("userList", JSON.stringify(users));

  alert(`User '${newUser}' added to the user list.`);
  updateUserDropdown();
}

// View registered users
function viewUsers() {
  let users = JSON.parse(localStorage.getItem("userList") || "[]");
  if (users.length === 0) {
    alert("No users added yet.");
    return;
  }
  alert("Registered users:\n" + users.join("\n"));
}

// Populate user dropdown
function updateUserDropdown() {
  const dropdown = document.getElementById("userDropdown");
  if (!dropdown) return;

  dropdown.innerHTML = "";

  let users = JSON.parse(localStorage.getItem("userList") || "[]");
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user;
    option.textContent = user;
    if (user === localStorage.getItem("username")) {
      option.selected = true;
    }
    dropdown.appendChild(option);
  });
}

// Change active user via dropdown
function changeUser() {
  const selectedUser = document.getElementById("userDropdown").value;
  if (selectedUser) {
    localStorage.setItem("username", selectedUser);
    document.getElementById("usernameDisplay").textContent = `Signed in as ${selectedUser}`;
    alert(`Now acting as '${selectedUser}'`);
  }
}