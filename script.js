// Arrays holding the Akan names indexed by day number.
// Position 0 = Sunday, 1 = Monday ... 6 = Saturday.
// We use the day number calculated from the formula to pick the right name.
let maleNames = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
let femaleNames = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

// Array of day names in the same order — used to display the day on the result card
let dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Array of cultural meanings for each day — same order as above
let dayMeanings = [
  "Sunday-born souls are known for their peace, spirituality and strong sense of self.",
  "Monday-born souls are calm, quiet and deeply dependable — pillars of their community.",
  "Tuesday-born souls are passionate, energetic and full of inner fire.",
  "Wednesday-born souls are curious, adaptable and gifted communicators.",
  "Thursday-born souls are generous, noble and natural leaders.",
  "Friday-born souls are loving, creative and bring beauty wherever they go.",
  "Saturday-born souls are resilient, hardworking and deeply grounded.",
];

function calculateDayOfWeek(day, month, year) {
  // Takes a day, month and year and returns which day of the week it falls on.
  // Returns a number: 0 = Sunday, 1 = Monday ... 6 = Saturday.

  let CC = Math.floor(year / 100);
  // CC = the first two digits of the year
  // Math.floor() rounds DOWN to the nearest whole number
  // e.g. year 1989: 1989 / 100 = 19.89 → Math.floor gives 19

  let YY = year % 100;
  // YY = the last two digits of the year
  // e.g. year 1989: 1989 % 100 = 89
  // The % operator gives the REMAINDER after dividing

  // Apply the formula from the project spec.
  let result =
    (Math.floor(CC / 4) -
      2 * CC -
      1 + // part 1: CC/4 - 2*CC - 1 (century adjustment)
      Math.floor((5 * YY) / 4) + // part 2: (5*YY)/4 (year within century)
      Math.floor((26 * (month + 1)) / 10) + // part 3: (26*(MM+1))/10 (month adjustment)
      day) % // part 4: DD (the day of the month)
    // Each Math.floor() rounds down the result of that part.
    7; // % 7 converts the total into a day number between 0 and 6

  result = ((result % 7) + 7) % 7;
  // This line guarantees the result is always a positive number between 0 and 6.
  // The formula can sometimes produce a negative number in JavaScript.

  return result; // returns a number 0–6 representing the day of the week
}

function showAlert(message) {
  // Makes the red alert box visible with an error message inside it

  let alertBox = document.getElementById("alertBox");
  // document.getElementById() finds the HTML element with that id attribute

  alertBox.textContent = message;
  // textContent sets the visible text inside the element

  alertBox.classList.add("visible");
  // classList.add() adds a CSS class to the element.
  // The "visible" class in our CSS changes display:none to display:block
}

function hideAlert() {
  let alertBox = document.getElementById("alertBox");
  // Hides the alert box and clears its message

  alertBox.textContent = "";
  // Clear the message text so nothing old shows if alert appears again

  alertBox.classList.remove("visible");
  // classList.remove() removes the CSS class — hiding the element again
}

function highlightTableRow(dayIndex) {
  // Adds a highlight border to the correct row in the Akan names table

  let rows = document.querySelectorAll(".akan-table tbody tr");
  // Here we grab every <tr> inside the table body
  // querySelectorAll() returns ALL elements matching the CSS selector

  rows.forEach(function (row) {
    // Loop through every row and remove any previous highlight
    row.classList.remove("highlight");
  });

  rows[dayIndex].classList.add("highlight");
  // Add the highlight class to only the row matching our day
  // dayIndex is 0–6 and the rows are also in order 0–6 (Sunday to Saturday)
}

function displayResult(akanName, dayIndex, gender, day, month, year) {
  // Fills the result card with the calculated name and info, then shows it

  document.getElementById("resultName").textContent = akanName;
  // Put the Akan name into the big heading element

  document.getElementById("resultDay").textContent = dayNames[dayIndex];
  // Put the day name (e.g. "Friday") using our dayNames array and the dayIndex

  document.getElementById("resultGender").textContent =
    // Capitalise the first letter of gender for display (e.g. "male" → "Male")
    gender.charAt(0).toUpperCase() + gender.slice(1);
  // charAt(0) gets the first character
  // toUpperCase() makes it capital
  // slice(1) gets everything from the second character onwards
  // + joins them back into one string

  document.getElementById("resultDate").textContent =
    day + "/" + month + "/" + year;
  // Display the birthdate in DD/MM/YYYY format
  // + joins the numbers and slashes into one string

  document.getElementById("resultMeaning").textContent = dayMeanings[dayIndex];
  // Display the cultural meaning for that day from our dayMeanings array

  document.getElementById("resultCard").classList.add("visible");
  // Show the result card by adding the "visible" class
  // Our CSS has .result-section.visible { display: block; } to make it appear

  highlightTableRow(dayIndex);
  // Highlight the matching row in the names table
}

function resetForm() {
  // Clears all inputs and hides the result so the user can start again

  document.getElementById("day").value = "";
  document.getElementById("month").value = "";
  document.getElementById("year").value = "";
  // Set each input's value back to an empty string — this clears the typed text

  let genderButtons = document.querySelectorAll('input[name="gender"]');
  // Get ALL the gender radio buttons at once using querySelectorAll

  genderButtons.forEach(function (btn) {
    btn.checked = false;
    // Loop through each radio button and uncheck it
    // Setting .checked = false removes the selection
  });

  document.getElementById("resultCard").classList.remove("visible");
  // Hide the result card by removing the "visible" class

  hideAlert();
  // Hide and clear the error alert box

  let rows = document.querySelectorAll(".akan-table tbody tr");
  rows.forEach(function (row) {
    row.classList.remove("highlight");
    // Remove the highlight from all table rows
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
  // Scroll smoothly back to the top of the page
  // window is the browser window object — scrollTo moves the scroll position
}

document
  .getElementById("akanForm")
  .addEventListener("submit", function (event) {
    // addEventListener tells JavaScript to watch for a specific event on an element.
    // "submit" fires when the user clicks the submit button.

    event.preventDefault();
    // event.preventDefault() stops the browser's default form behaviour.
    // By default, submitting a form refreshes the whole page — we don't want that.

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
    // If selectedGender is not null, get its .value ("male" or "female").
    // If it IS null (nothing selected), set genderValue to null.

    let errorMessage = validateInputs(day, month, year, genderValue);
    // Run all validation checks — returns an error message or null

    if (errorMessage !== null) {
      // If errorMessage is not null, there was an error — show it and stop
      showAlert(errorMessage); // display the error message in the alert box
      return; // return exits the function early — we stop here and don't continue
    }

    let dayIndex = calculateDayOfWeek(day, month, year);
    // Calculate which day of the week the birthdate falls on
    // Returns 0 (Sunday) through 6 (Saturday)

    let akanName;
    if (genderValue === "male") {
      akanName = maleNames[dayIndex]; // e.g. maleNames[5] = "Kofi" for Friday
    } else {
      akanName = femaleNames[dayIndex]; // e.g. femaleNames[5] = "Afua" for Friday
      // Use an if/else statement to pick the right name based on gender.
      // === is strict equality — checks both value AND type.
      // maleNames[dayIndex] uses the day number to pick the correct name from the array.
    }

    displayResult(akanName, dayIndex, genderValue, day, month, year);
    // Display the result card with the Akan name and all related information
  });

document.getElementById("resetBtn").addEventListener("click", function () {
  resetForm(); // calls the reset function defined above
  // Listen for a click on the "Try Another Date" button inside the result card.
  // When clicked, call resetForm() to clear everything and hide the result.
});
