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
document.getElementById('date').textContent = currentMonday.toDateString();

// Call the function to check and clear checkboxes on page load
checkAndClearOnSunday();

// Schedule the function to check and clear checkboxes every Sunday night (assuming a specific time)
// This example schedules it to run at 11:59 PM every Sunday
setInterval(checkAndClearOnSunday, 1000 * 60 * 60 * 24); // Check every 24 hours


