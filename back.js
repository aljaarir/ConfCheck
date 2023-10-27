 // Function to handle clicking the first element (text) in a row
function handleTextClick(event) {
  const target = event.target;
  if (target.type === 'checkbox') return; // Skip handling if a checkbox was clicked

  const row = target.closest('tr'); // Find the parent row
  if (row) {
    const checkboxes = row.querySelectorAll('.checkbox');
    const firstCheckbox = checkboxes[0];

    // Toggle the state of the first checkbox to control the entire row
    firstCheckbox.checked = !firstCheckbox.checked;

    // Set the state of all other checkboxes in the row to match the first checkbox
    for (let i = 1; i < checkboxes.length; i++) {
      checkboxes[i].checked = firstCheckbox.checked;
    }
  }
}

// Add a click event listener to the table to handle clicking the first element (text) in a row
document.querySelector('table').addEventListener('click', handleTextClick);
