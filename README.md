# Social Networking Cop – Phase II

## Project Overview

**Social Networking Cop** is a browser-based application that promotes healthier screen time habits using a faux social media platform called **TimeSpace**. Users can log in, post updates, and receive alerts based on daily and weekly time usage. 

Phase II builds on the Phase I foundation with significant enhancements to the user interface, usability, and tracking functionality.

---

## Phase II Enhancements

- 💻 Redesigned and animated UI using modern CSS
- 👤 Username auto-fill on login for ease of use
- 📋 Improved visual feed layout and styled notifications
- 🕒 Refined timer logic and localStorage session persistence
- 📁 Session log file download on sign-out
- 🔁 Multi-user dropdown with live switching
- 🧪 Cleaner code structure for easier testing and expansion

---

## Project Structure

/SocialNetworkingCop
├── index.html # Login page with friendly UI and auto-fill
├── feed.html # Main feed with post box and timer display
├── app.js # JavaScript logic for timers, posts, and session logs
├── style.css # Responsive and animated styling
├── config.json # Optional metadata about the app features
├── README.md # This file
└── PhaseII_Source_Code_Document.docx # Formal report

---

## Setup Instructions

1. Clone or download the repository.
2. Open `index.html` in a modern browser (Chrome, Safari, Edge).
3. Enter a username to sign in.
4. Post a message and track your screen time.
5. Sign out to download a session log.

---

## Technologies Used

- **HTML5**
- **CSS3** with animations and transitions
- **JavaScript (ES6)**
- **LocalStorage API**
- **Visual Studio Code**

---

## Testing

- ✅ **Manual Black-Box Testing** for all login, time tracking, and alert features
- ✅ Verified session log generation and storage in localStorage
- ✅ Drop-down user switching tested across browser reloads
- ✅ Validated UI responsiveness and animations

---

## Known Limitations (Phase II)

- Local-only storage; no backend server
- No user authentication (by design)
- Single-browser scope for data persistence

---

## Contributors

- **Reid Buchanan** – Project Manager / Developer / Tester  
- **Lemar Llanes** – Lead Developer  
- **David Jarrett** – Testing Lead  

---

## License

For academic use only — CMSC 495 6982 Capstone in Computer Science, University of Maryland Global Campus, Summer 2025.
