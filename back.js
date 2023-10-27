// Function to get the current Monday of the week
function getCurrentMonday() {
  const today = new Date();
  const dayOfWeek = today.getUTCDay(); // 0 for Sunday, 1 for Monday, and so on
  const daysUntilMonday = dayOfWeek === 1 ? 0 : 1 - dayOfWeek;
  today.setUTCDate(today.getUTCDate() + daysUntilMonday);
  return today;
}

// Function to clear all checkboxes
function clearCheckboxes() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = false;
  });
}

// Function to check and clear checkboxes on Sunday night
function checkAndClearOnSunday() {
  const today = new Date();
  if (today.getUTCDay() === 0) {
    // It's Sunday, clear checkboxes
    clearCheckboxes();
  }
}

// Display the current Monday of the week
const currentMonday = getCurrentMonday();
document.getElementById("date").textContent = currentMonday.toDateString();

// Schedule the function to check and clear checkboxes every Sunday night at 11:59 PM every Sunday
setInterval(checkAndClearOnSunday, 1000 * 60 * 60 * 24); // Check every 24 hours

/***************************************************************
 *
 *
 ****************************************************************/

let isAuthenticated = false; // Flag to track authentication status

// Function to authenticate the user
function authenticateUser(username, password) {
  const validUsername = 'MSUFCU';
  const validPassword = 'Intern2023';

  return username === validUsername && password === validPassword;
}

// Function to handle login button click
document.getElementById('loginButton').addEventListener('click', function () {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginStatus = document.getElementById('loginStatus');
  const tableContainer = document.getElementById('table-container');
  const loginContainer = document.getElementById('login-container');
  const showPasswordCheckbox = document.getElementById('showPassword');
  const checkboxes = document.querySelectorAll('input[type="checkbox']');

  if (authenticateUser(username, password)) {
    isAuthenticated = true; // Set authentication flag to true
    loginStatus.textContent = 'Login successful.';
    tableContainer.classList.remove('blur'); // Remove blur
    loginContainer.style.display = 'none'; // Hide the login form
    showPasswordCheckbox.style.display = 'none'; // Hide the Show Password checkbox
    // Enable checkboxes
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = false;
    });
  } else {
    isAuthenticated = false; // Set authentication flag to false
    loginStatus.textContent = 'Invalid username or password. Please try again.';
    // Disable checkboxes
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = true;
    });
  }
});

// Function to save checkbox states in localStorage
function saveCheckboxStates() {
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const checkboxStates = {};

  checkboxes.forEach((checkbox, index) => {
    checkboxStates[`checkbox-${index}`] = checkbox.checked;
  });

  localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

// Function to restore checkbox states from localStorage
function restoreCheckboxStates() {
  const checkboxStates = JSON.parse(localStorage.getItem('checkboxStates'));

  if (checkboxStates) {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox, index) => {
      const state = checkboxStates[`checkbox-${index}`];
      if (state !== undefined) {
        checkbox.checked = state;
      }
    });
  }
}

// Restore checkbox states when the page loads
restoreCheckboxStates();

// Save checkbox states when any checkbox changes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    saveCheckboxStates();
  });
});

// Function to show or hide the table based on authentication status
function toggleTableVisibility() {
  const tableContainer = document.getElementById('table-container');
  if (!isAuthenticated) {
    tableContainer.classList.add('blur'); // Add blur if not authenticated
  }
}

// Call the toggleTableVisibility function to initialize table visibility
toggleTableVisibility();
