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

// Function to save checkbox states in localStorage
// Function to save checkbox states in localStorage
function saveCheckboxStates() {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const checkboxStates = {};

    checkboxes.forEach((checkbox, index) => {
        checkboxStates[`checkbox-${index}`] = checkbox.checked;
    });

    localStorage.setItem('checkboxStates', JSON.stringify(checkboxStates));
}

    
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
document.getElementById('date').textContent = currentMonday.toDateString();

// Restore checkbox states when the page loads
restoreCheckboxStates();

// Save checkbox states when any checkbox changes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox, index) => {
    checkbox.addEventListener('change', () => {
        saveCheckboxStates();
    });
});

// Schedule the function to check and clear checkboxes every Sunday night at 11:59 PM every Sunday
setInterval(checkAndClearOnSunday, 1000 * 60 * 60 * 24); // Check every 24 hours
