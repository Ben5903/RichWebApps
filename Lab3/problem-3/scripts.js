// Get references to HTML elements using their IDs
const searchButton = document.getElementById("search_button"); // Search button
const usernameInput = document.getElementById("username"); // Input for GitHub username
const resultContainer = document.getElementById("results"); // Container to display results
const profilePic = document.getElementById("profile-pic"); // User's profile picture
const nameElement = document.getElementById("name"); // User's name or login
const userInfo = document.getElementById("user-info"); // User's additional information
const reposList = document.getElementById("repos"); // List of user's repositories
const errorMessage = document.getElementById("error-message"); // Error message

resultContainer.style.display = "none";

// Add a click event listener to the search button
searchButton.addEventListener("click", () => {
    // Get the trimmed value of the input field
    const username = usernameInput.value.trim();
    if (username) {
        // If a username is provided, fetch user info
        fetchUserInfo(username);
    }
});

// Function to fetch user information from the GitHub API
async function fetchUserInfo(username) {
    // Try to make a GET request to the GitHub API
    try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (userResponse.status === 404) {
            // If the user is not found, display an error message
            errorMessage.textContent = "User not found. Please enter a valid GitHub username";
            resultContainer.style.display = "none"; // Hide the result container
            return;
        } else if (userResponse.ok) {
            // If the request is successful, parse the JSON response
            const userData = await userResponse.json();
            // Fetch user's repositories
            const reposResponse = await fetch(userData.repos_url);
            const reposData = await reposResponse.json();
            // Display user info and repositories
            displayUserInfo(userData, reposData);
            errorMessage.style.display = "none"; // Hide the error message
            return;
        }
    } catch (error) {
        console.error("Error fetching user info:", error);
    }
}

// Function to display user information and repositories
function displayUserInfo(userData, reposData) {
    // Set the user's profile picture
    profilePic.src = userData.avatar_url;
    // Display the user's name or login
    nameElement.textContent = userData.name || userData.login;

    // Create elements for user information
    const usernameDisplay = document.createElement("p");
    const emailElement = document.createElement("p");
    const locationElement = document.createElement("p");
    const gistsElement = document.createElement("p");

    // Populate user information elements
    usernameDisplay.textContent = `Username: ${userData.login || 'N/A'}`
    emailElement.textContent = `Email: ${userData.email || 'N/A'}`;
    locationElement.textContent = `Location: ${userData.location || 'N/A'}`;
    gistsElement.textContent = `Number of Gists: ${userData.public_gists}`;

    // Clear existing user info
    userInfo.innerHTML = "";

    // Append user information elements to the user info container
    userInfo.appendChild(usernameDisplay);
    userInfo.appendChild(emailElement);
    userInfo.appendChild(locationElement);
    userInfo.appendChild(gistsElement);

    // Display repositories
    reposList.innerHTML = "";
    if (reposData.length === 0) {
        // If the user has no repositories
        reposList.innerHTML = "<li>No repositories available.</li>";
    } else {
        // Iterate through the user's repositories and display them
        for (const repo of reposData) {
            const repoItem = document.createElement("li");
            repoItem.innerHTML = `<strong>${repo.name}</strong>: ${repo.description || 'No description available'}`;
            reposList.appendChild(repoItem);
        }
    }

    // Scroll box for more than 5 repos
    if (reposData.length > 5) {
        reposList.style.maxHeight = "200px";
    } else {
        reposList.style.maxHeight = "none";
    }

    // Show the result container
    resultContainer.style.display = "flex";
}