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

  // Apply the formula.
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

  result = ((result % 7) + 7) % 7;
  // This line guarantees the result is always a positive number between 0 and 6.

  return result; // returns a number 0–6 representing the day of the week
}

function validateInputs(day, month, year, gender) {
  // functions for input validations
  // Checks all inputs are valid before calculating.
  // Returns an error message string if something is wrong, or null if all is fine.
  if (!day || !month || !year) {
    // The ! (NOT) operator makes a truthy value false and vice versa.
    // If day/month/year is empty or NaN (Not a Number), !day etc. will be true.
    // The || (OR) means: if ANY of these are missing, return the error message.
    return "Please fill in all three date fields — day, month and year.";
  }
  let isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  //   A year is a leap year if its divisible by 4 and not divisible by 100 OR its just divisivle by 400

  let daysInMonth = [
    31,
    isLeapYear ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  //   an array that holds the number of days in each month

  if (day < 1 || day > daysInMonth[month - 1]) {
    return "That month only has " + daysInMonth[month - 1] + " days";
  }

  if (month < 1 || month > 12) {
    // Check the month is valid (1 = January to 12 = December)
    return "Month must be between 1 and 12. Please check your entry.";
  }

  if (year < 1900 || year > 2026) {
    // Check the year is within a sensible range
    return "Please enter a year between 1900 and 2026.";
  }

  if (!gender) {
    // Check that a gender was selected — if nothing is selected, gender will be null
    return "Please select a gender — Male or Female.";
  }

  // If we reach this line all checks passed — return null to signal no errors
  return null;
}

// ── FUNCTION: showAlert ──
function showAlert(message) {
  let alertBox = document.getElementById("alertBox");
  // Makes the red alert box visible with an error message inside it
  // document.getElementById() finds the HTML element with that id attribute

  alertBox.textContent = message;
  // textContent sets the visible text inside the element

  alertBox.classList.add("visible");
  // classList.add() adds a CSS class to the element.
  // The "visible" class in our CSS changes display:none to display:block
}

// ── FUNCTION: hideAlert ──
function hideAlert() {
  // Hides the alert box and clears its message
  let alertBox = document.getElementById("alertBox");

  alertBox.textContent = "";
  // Clear the message text so nothing old shows if alert appears again

  alertBox.classList.remove("visible");
  // classList.remove() removes the CSS class — hiding the element again
}

// ── FUNCTION: displayResult ──
function displayResult(akanName, dayIndex, gender, day, month, year) {
  // Fills the result card with the calculated name and info, then shows it
  document.getElementById("resultName").textContent = akanName;
  // Put the Akan name into the big heading element

  document.getElementById("resultDay").textContent = dayNames[dayIndex];
  // Put the day name (e.g. "Friday") using our dayNames array and the dayIndex

  document.getElementById("resultGender").textContent =
    gender.charAt(0).toUpperCase() + gender.slice(1);
  // Capitalise the first letter of gender for display (e.g. "male" → "Male")
  // charAt(0) gets the first character
  // toUpperCase() makes it capital
  // slice(1) gets everything from the second character onwards
  // + joins them back into one string

  document.getElementById("resultDate").textContent =
    day + "/" + month + "/" + year;
  // Display the birthdate in DD/MM/YYYY format
  // + joins the numbers and slashes into one string

  document.getElementById("resultCard").classList.add("visible");
  // Show the result card by adding the "visible" class
  // Our CSS has .result-section.visible { display: block; } to make it appear
}

function resetForm() {
  // Clears all inputs and hides the result so the user can start again
  // Set each input's value back to an empty string — this clears the typed text
  document.getElementById("day").value = "";
  document.getElementById("month").value = "";
  document.getElementById("year").value = "";

  let genderButtons = document.querySelectorAll('input[name="gender"]');
  // Get ALL the gender radio buttons at once using querySelectorAll

  genderButtons.forEach(function (btn) {
    // Loop through each radio button and uncheck it
    btn.checked = false;
    // Setting .checked = false removes the selection
  });

  document.getElementById("resultCard").classList.remove("visible");
  // Hide the result card by removing the "visible" class

  hideAlert();
  // Hide and clear the error alert box by calling the hide alert function

  window.scrollTo({ top: 0, behavior: "smooth" });
  // Scroll smoothly back to the top of the page
  // window is the browser window object — scrollTo moves the scroll position
}

// ── EVENT LISTENER: Form Submission ──
document
  .getElementById("akanForm")
  // addEventListener tells JavaScript to watch for a specific event on an element.
  .addEventListener("submit", function (event) {
    // "submit" fires when the user clicks the submit button.
    event.preventDefault();
    // event.preventDefault() stops the browser from refreshing the page

    let day = parseInt(document.getElementById("day").value);
    let month = parseInt(document.getElementById("month").value);
    let year = parseInt(document.getElementById("year").value);
    // Get the values from the input fields.
    // parseInt() converts the string from the input into a real number.
    // Input values are always strings — without parseInt, "31" + 1 would give "311" not 32.

    let selectedGender = document.querySelector('input[name="gender"]:checked');
    // querySelector with 'input[name="gender"]:checked' finds whichever
    // radio button is currently selected. Returns null if neither is selected.

    let genderValue = selectedGender ? selectedGender.value : null;
    // Use a ternary operator to safely get the gender value.
    // Ternary syntax: condition ? valueIfTrue : valueIfFalse
    // If selectedGender is not null, get its .value ("male" or "female").
    // If it IS null (nothing selected), set genderValue to null.

    let errorMessage = validateInputs(day, month, year, genderValue);
    // Run all validation checks — returns an error message or null

    if (errorMessage !== null) {
      // If errorMessage is not null, there was an error — show it and stop
      showAlert(errorMessage); // display the error message in the alert box
      return; // return exits the function early — we stop here and don't continue
    }

    hideAlert();
    // Validation passed — hide any previous alert message

    let dayIndex = calculateDayOfWeek(day, month, year);
    // Calculate which day of the week the birthdate falls on
    // Returns 0 (Sunday) through 6 (Saturday)

    let akanName;
    if (genderValue === "male") {
      // Use an if/else statement to pick the right name based on gender.
      // maleNames[dayIndex] uses the day number to pick the correct name from the array.
      akanName = maleNames[dayIndex]; // e.g. maleNames[5] = "Kofi" for Friday
    } else {
      akanName = femaleNames[dayIndex]; // e.g. femaleNames[5] = "Afua" for Friday
    }

    displayResult(akanName, dayIndex, genderValue, day, month, year);
    // Display the result card with the Akan name and all related information
  });

// ── EVENT LISTENER: Reset Button ──
document.getElementById("resetBtn").addEventListener("click", function () {
  // Listen for a click on the "Try Another Date" button inside the result card.
  // When clicked, call resetForm() to clear everything and hide the result.
  resetForm(); // calls the reset function defined above
});
