// ============================================
//   AKAN NAME GENERATOR — script.js
// ============================================

// ── AKAN NAMES DATA ──

let maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
let femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];
// Arrays holding the Akan names indexed by day number.
// Position 0 = Sunday, 1 = Monday ... 6 = Saturday.
// We use the day number calculated from the formula to pick the right name.

let dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
// Array of day names in the same order — used to display the day on the result card

let dayMeanings = [
    "Sunday-born souls are known for their peace, spirituality and strong sense of self.",
    "Monday-born souls are calm, quiet and deeply dependable — pillars of their community.",
    "Tuesday-born souls are passionate, energetic and full of inner fire.",
    "Wednesday-born souls are curious, adaptable and gifted communicators.",
    "Thursday-born souls are generous, noble and natural leaders.",
    "Friday-born souls are loving, creative and bring beauty wherever they go.",
    "Saturday-born souls are resilient, hardworking and deeply grounded.",
];
// Array of cultural meanings for each day — same order as above

function calculateDayOfWeek(day, month, year) {
    // function used to calculate the day of the week
    // Takes a day, month and year and returns which day of the week it falls on.
    // Returns a number: 0 = Sunday, 1.....
    let CC = Math.floor(year / 100);
    // CC = the first two digits of the year
    // Math.floor() rounds DOWN to the nearest whole number
    // e.g. year 1989: 1989 / 100 = 19.89 → Math.floor gives 19

    let YY = year % 100;
    // YY = the last two digits of the year
    // The % operator gives the REMAINDER after dividing
    // e.g. year 1989: 1989 % 100 = 89

  // Apply the formula from the project spec.
  // Each Math.floor() rounds down the result of that part.
  // The final % 7 gives a number from 0 to 6 (the day of the week).
  let result =
    (Math.floor(CC / 4) -
      2 * CC -
      1 + // part 1: CC/4 - 2*CC - 1 (century adjustment)
      Math.floor((5 * YY) / 4) + // part 2: (5*YY)/4 (year within century)
      Math.floor((26 * (month + 1)) / 10) + // part 3: (26*(MM+1))/10 (month adjustment)
      day) % // part 4: DD (the day of the month)
    7; // % 7 converts the total into a day number between 0 and 6

  // The formula can sometimes produce a negative number in JavaScript.
  // This line guarantees the result is always a positive number between 0 and 6.
  // ((result % 7) + 7) % 7 is a standard safe modulus pattern for this.
  result = ((result % 7) + 7) % 7;

  return result; // returns a number 0–6 representing the day of the week
}

function validateInputs(day, month, year, gender) {
    // functions for input validations
    // Checks all inputs are valid before calculating.
    // Returns an error message string if something is wrong, or null if all is fine.
  // The ! (NOT) operator makes a truthy value false and vice versa.
  // If day/month/year is empty or NaN (Not a Number), !day etc. will be true.
  // The || (OR) means: if ANY of these are missing, return the error message.
  if (!day || !month || !year) {
    return "Please fill in all three date fields — day, month and year.";
  }

  // Check the day is within a valid range (1 to 31)
  // The || (OR) means: if EITHER condition is true, the day is invalid
  if (day < 1 || day > 31) {
    return "Day must be between 1 and 31. Please check your entry.";
  }

  // Check the month is valid (1 = January to 12 = December)
  if (month < 1 || month > 12) {
    return "Month must be between 1 and 12. Please check your entry.";
  }

  // Check the year is within a sensible range
  if (year < 1900 || year > 2025) {
    return "Please enter a year between 1900 and 2025.";
  }

  // Check that a gender was selected — if nothing is selected, gender will be null
  if (!gender) {
    return "Please select a gender — Male or Female.";
  }

  // If we reach this line all checks passed — return null to signal no errors
  return null;
}

// ── FUNCTION: showAlert ──
// Makes the red alert box visible with an error message inside it
function showAlert(message) {
  // document.getElementById() finds the HTML element with that id attribute
  let alertBox = document.getElementById("alertBox");

  // textContent sets the visible text inside the element
  alertBox.textContent = message;

  // classList.add() adds a CSS class to the element.
  // The "visible" class in our CSS changes display:none to display:block
  alertBox.classList.add("visible");
}

// ── FUNCTION: hideAlert ──
// Hides the alert box and clears its message
function hideAlert() {
  let alertBox = document.getElementById("alertBox");

  // Clear the message text so nothing old shows if alert appears again
  alertBox.textContent = "";

  // classList.remove() removes the CSS class — hiding the element again
  alertBox.classList.remove("visible");
}

// ── FUNCTION: highlightTableRow ──
// Adds a highlight border to the correct row in the Akan names table
function highlightTableRow(dayIndex) {
  // querySelectorAll() returns ALL elements matching the CSS selector
  // Here we grab every <tr> inside the table body
  let rows = document.querySelectorAll(".akan-table tbody tr");

  // Loop through every row and remove any previous highlight
  // This ensures only one row is highlighted at a time
  rows.forEach(function (row) {
    row.classList.remove("highlight");
  });

  // Add the highlight class to only the row matching our day
  // dayIndex is 0–6 and the rows are also in order 0–6 (Sunday to Saturday)
  rows[dayIndex].classList.add("highlight");

  // Scroll smoothly so the highlighted row is visible on screen
  rows[dayIndex].scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ── FUNCTION: displayResult ──
// Fills the result card with the calculated name and info, then shows it
function displayResult(akanName, dayIndex, gender, day, month, year) {
  // Put the Akan name into the big heading element
  document.getElementById("resultName").textContent = akanName;

  // Put the day name (e.g. "Friday") using our dayNames array and the dayIndex
  document.getElementById("resultDay").textContent = dayNames[dayIndex];

  // Capitalise the first letter of gender for display (e.g. "male" → "Male")
  // charAt(0) gets the first character
  // toUpperCase() makes it capital
  // slice(1) gets everything from the second character onwards
  // + joins them back into one string
  document.getElementById("resultGender").textContent =
    gender.charAt(0).toUpperCase() + gender.slice(1);

  // Display the birthdate in DD/MM/YYYY format
  // + joins the numbers and slashes into one string
  document.getElementById("resultDate").textContent =
    day + "/" + month + "/" + year;

  // Display the cultural meaning for that day from our dayMeanings array
  document.getElementById("resultMeaning").textContent = dayMeanings[dayIndex];

  // Show the result card by adding the "visible" class
  // Our CSS has .result-section.visible { display: block; } to make it appear
  document.getElementById("resultCard").classList.add("visible");

  // Highlight the matching row in the names table
  highlightTableRow(dayIndex);
}

// ── FUNCTION: resetForm ──
// Clears all inputs and hides the result so the user can start again
function resetForm() {
  // Set each input's value back to an empty string — this clears the typed text
  document.getElementById("day").value = "";
  document.getElementById("month").value = "";
  document.getElementById("year").value = "";

  // Get ALL the gender radio buttons at once using querySelectorAll
  let genderButtons = document.querySelectorAll('input[name="gender"]');

  // Loop through each radio button and uncheck it
  // Setting .checked = false removes the selection
  genderButtons.forEach(function (btn) {
    btn.checked = false;
  });

  // Hide the result card by removing the "visible" class
  document.getElementById("resultCard").classList.remove("visible");

  // Hide and clear the error alert box
  hideAlert();

  // Remove the highlight from all table rows
  let rows = document.querySelectorAll(".akan-table tbody tr");
  rows.forEach(function (row) {
    row.classList.remove("highlight");
  });

  // Scroll smoothly back to the top of the page
  // window is the browser window object — scrollTo moves the scroll position
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── EVENT LISTENER: Form Submission ──
// addEventListener tells JavaScript to watch for a specific event on an element.
// "submit" fires when the user clicks the submit button.
document
  .getElementById("akanForm")
  .addEventListener("submit", function (event) {
    // event.preventDefault() stops the browser's default form behaviour.
    // By default, submitting a form refreshes the whole page — we don't want that.
    // This lets us handle everything with JavaScript instead.
    event.preventDefault();

    // Get the values from the input fields.
    // parseInt() converts the string from the input into a real number.
    // Input values are always strings — without parseInt, "31" + 1 would give "311" not 32.
    let day = parseInt(document.getElementById("day").value);
    let month = parseInt(document.getElementById("month").value);
    let year = parseInt(document.getElementById("year").value);

    // querySelector with 'input[name="gender"]:checked' finds whichever
    // radio button is currently selected. Returns null if neither is selected.
    let selectedGender = document.querySelector('input[name="gender"]:checked');

    // Use a ternary operator to safely get the gender value.
    // Ternary syntax: condition ? valueIfTrue : valueIfFalse
    // If selectedGender is not null, get its .value ("male" or "female").
    // If it IS null (nothing selected), set genderValue to null.
    let genderValue = selectedGender ? selectedGender.value : null;

    // Run all validation checks — returns an error message or null
    let errorMessage = validateInputs(day, month, year, genderValue);

    // If errorMessage is not null, there was an error — show it and stop
    if (errorMessage !== null) {
      showAlert(errorMessage); // display the error message in the alert box
      return; // return exits the function early — we stop here and don't continue
    }

    // Validation passed — hide any previous alert message
    hideAlert();

    // Calculate which day of the week the birthdate falls on
    // Returns 0 (Sunday) through 6 (Saturday)
    let dayIndex = calculateDayOfWeek(day, month, year);

    // Use an if/else statement to pick the right name based on gender.
    // === is strict equality — checks both value AND type.
    // maleNames[dayIndex] uses the day number to pick the correct name from the array.
    let akanName;
    if (genderValue === "male") {
      akanName = maleNames[dayIndex]; // e.g. maleNames[5] = "Kofi" for Friday
    } else {
      akanName = femaleNames[dayIndex]; // e.g. femaleNames[5] = "Afua" for Friday
    }

    // Display the result card with the Akan name and all related information
    displayResult(akanName, dayIndex, genderValue, day, month, year);
  });

// ── EVENT LISTENER: Reset Button ──
// Listen for a click on the "Try Another Date" button inside the result card.
// When clicked, call resetForm() to clear everything and hide the result.
document.getElementById("resetBtn").addEventListener("click", function () {
  resetForm(); // calls the reset function defined above
});
