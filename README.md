# Kenyan Elections 2024 - IEBC Electronic Voting System

This project is a web-based electronic voting system for the 2024 Kenyan elections, supporting a streamlined voting flow through different election positions (President, Governor, Senator, and MP). It provides users with a secure and interactive voting experience.

## Project Structure

- **Frontend**: `index.html`, `css/styles.css`
- **Backend**: Mongo database, API endpoint to record votes (`http://localhost:3000/vote`)
- **Libraries**: [Chart.js](https://www.chartjs.org/) for chart rendering, JavaScript for dynamic content and voting flow logic

## Features

- **Interactive Voting Flow**: Guides voters through the election of President, Governor, Senator, and MP.
- **Confirmation Modal**: Ensures that voters confirm their candidate selection before submitting.
- **Progress Bar**: Visually represents the voter’s progress through the different election positions.
- **Dynamic Redirection**: Redirects the user to the results page once voting is completed.

## Installation

1. **Clone the repository**:

   ```bash
   git clone 
   cd your-repo-name
   ```

2. **Install the backend dependencies** (if applicable):

   ```bash
   npm install
   ```

3. **Start the backend server**:

   ```bash
   node server.js
   ```

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
- **Confirm Vote**: `confirmVote()` function sends a `POST` request to the backend to record the vote. On success, the next section is displayed.
- **Progress Bar**: Updates based on the user’s progress.
- **Redirect to Results**: After completing all votes, the user is redirected to `result.html`.

### Backend API

- **Endpoint**: `POST /vote`
  - Accepts a JSON body with `candidate` as the name of the selected candidate.
  - Example request:
    ```json
    {
      "candidate": "Raila Odinga"
    }
    ```

## Requirements

- [Node.js](https://nodejs.org/) and npm for backend server
- A modern web browser

## Future Enhancements

- **Admin Dashboard**: A backend interface to monitor live results and voter turnout.
- **Data Encryption**: Add encryption to securely handle sensitive data.
- **Multi-language Support**: Translate the interface into multiple languages for wider accessibility.
