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
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');

  if (authenticateUser(username, password)) {
    loginStatus.textContent = 'Login successful.';
    tableContainer.classList.remove('blur'); // Remove blur
    loginContainer.style.display = 'none'; // Hide the login form
    showPasswordCheckbox.style.display = 'none'; // Hide the Show Password checkbox
    // Enable checkboxes
    checkboxes.forEach((checkbox) => {
      checkbox.disabled = false;
    });
  } else {
    loginStatus.textContent = 'Invalid username or password. Please refresh the page and try again.';
    // Add blur and disable checkboxes
    tableContainer.classList.add('blur');
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

// Function to manually save checkbox states when h1 is clicked
document.querySelector('h1').addEventListener('click', () => {
  saveCheckboxStates();
});

// Restore checkbox states when the page loads
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

restoreCheckboxStates(); // Restore checkbox states when the page loads

// Save checkbox states when any checkbox changes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
  checkbox.addEventListener('change', () => {
    saveCheckboxStates();
  });
});

// Auto-save checkbox states every 30 seconds
setInterval(saveCheckboxStates, 1000 * 2);

// Function to handle clicking the first element (text) in a row
function handleTextClick(event) {
  const target = event.target;
  if (target.type === 'checkbox') return; // Skip handling if a checkbox was clicked

  const row = target.closest('tr'); // Find the parent row
  if (row) {
    const checkboxes = row.querySelectorAll('input[type="checkbox"]');
    const firstCheckbox = checkboxes[0];

    // Set the state of all checkboxes in the row to match the first checkbox
    checkboxes.forEach((checkbox) => {
      checkbox.checked = firstCheckbox.checked;
    });
  }
}

// Add a click event listener to the table to handle clicking the first element (text) in a row
document.querySelector('table').addEventListener('click', handleTextClick);
