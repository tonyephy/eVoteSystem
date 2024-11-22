# Kenyan Elections 2024 - IEBC Electronic Voting System

This project is a web-based electronic voting system for the 2024 Kenyan elections, supporting a streamlined voting flow through different election positions (President, Governor, Senator, and MP). It provides users with a secure and interactive voting experience.

## Live Demo

Check out the live demo here: [eVoteSystem on GitHub Pages](https://tonyephy.github.io/eVoteSystem/)

This project is a web-based electronic voting system for the 2024 Kenyan elections, supporting a streamlined voting flow through different election positions (President, Governor, Senator, and MP). It provides users with a secure and interactive voting experience.

## Project Structure

- **Frontend**: `index.html`, `css/styles.css`
- **Backend**: Firebase Firestore, API endpoint to record votes
- **Libraries**: [Chart.js](https://www.chartjs.org/) for chart rendering, JavaScript for dynamic content and voting flow logic, Firebase for data storage and user authentication

## Features

- **Interactive Voting Flow**: Guides voters through the election of President, Governor, Senator, and MP.
- **Confirmation Modal**: Ensures that voters confirm their candidate selection before submitting.
- **Progress Bar**: Visually represents the voter’s progress through the different election positions.
- **Dynamic Redirection**: Redirects the user to the results page once voting is completed.
- **Firebase Authentication**: Secure login and sign-up via Firebase Authentication.
- **Real-Time Database**: Voting data is stored and updated in Firebase Firestore in real-time.

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/tonyephy/eVoteSystem.git
   cd your-repo-name
   ```

2. **Install the backend dependencies** (if applicable):

   This project uses Firebase directly on the frontend, so no backend server setup is required.

3. **Set up Firebase**:

   - Create a Firebase project on [Firebase Console](https://console.firebase.google.com/).
   - Replace the Firebase configuration object in your frontend code with your own Firebase config.
   - Ensure Firestore is enabled in your Firebase project.

4. **Open the frontend**:

   - Open `index.html` in a browser.

## Usage

1. Open the webpage to begin voting.
2. Select a candidate in each category by clicking the “KURA” button.
3. Confirm the vote in the modal popup.
4. Continue to the next section after confirming each vote.
5. Once all sections are complete, the system will redirect to `result.html` to show election results.

## Code Overview

### HTML Structure

- **Header**: Displays the title and the voting progress bar.
- **Voting Sections**: Each election position (President, Governor, Senator, MP) has a dedicated section with candidates listed as cards.
- **Modal**: A popup to confirm a vote for the selected candidate.

### JavaScript Logic

- **Voting Flow**: `positions` array controls the voting flow between positions. Each confirmed vote updates `currentPosition` and triggers `switchSection()` to display the next voting section.
- **Confirm Vote**: `confirmVote()` function sends a `POST` request to Firebase to record the vote. On success, the next section is displayed.
- **Progress Bar**: Updates based on the user’s progress.
- **Redirect to Results**: After completing all votes, the user is redirected to `result.html`.

### Firebase Setup

- **Firebase Configuration**: Set up Firebase Authentication and Firestore.
- **Storing Votes**: Each vote is stored in Firebase Firestore under collections corresponding to election positions (`presidential`, `gubernatorial`, `senatorial`, `mp`).
- **Real-Time Updates**: Firestore updates in real-time to show voting results as they are recorded.

### Firebase Authentication

- **Sign-Up/Sign-In**: Firebase Authentication is used to handle user registration and login, ensuring secure access to the voting system.

## Requirements

- [Node.js](https://nodejs.org/) for local server (optional, if you want to run backend locally)
- [Firebase](https://firebase.google.com/) account
- A modern web browser

## Future Enhancements

- **Admin Dashboard**: A backend interface to monitor live results and voter turnout.
- **Data Encryption**: Add encryption to securely handle sensitive data.
- **Multi-language Support**: Translate the interface into multiple languages for wider accessibility.

---
