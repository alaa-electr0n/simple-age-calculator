const cardBtn = document.querySelector(".card__btn");
const result = document.querySelector(".card__result");
const userInputs = document.querySelectorAll(".card__input");

//Data Validation
const isValidDay = (day) => {
  if (day && day > 0 && day <= 31) return true;
};

const isValidMonth = (month) => {
  if (month && month > 0 && month <= 12) return true;
};

const isValidYear = function (year) {
  const currentYear = new Date().getFullYear();
  if (year && year > 0 && year <= currentYear) return true;
  // console.log(year, currentYear);
};

const ValidateInputs = function (dayElement, monthElement, yearElement) {
  let isValideDate = [false, false, false];

  //validate the day input
  if (!isValidDay(dayElement.value)) {
    dayElement.classList.add("input__error-msg");
  } else {
    isValideDate[0] = true;
    dayElement.classList.remove("input__error-msg");
  }
  // validate the month input
  if (!isValidMonth(monthElement.value)) {
    monthElement.classList.add("input__error-msg");
  } else {
    isValideDate[1] = true;
    monthElement.classList.remove("input__error-msg");
  }
  // validate the year input
  if (!isValidYear(yearElement.value)) {
    yearElement.classList.add("input__error-msg");
  } else {
    isValideDate[2] = true;
    yearElement.classList.remove("input__error-msg");
  }

  // [true, true, true]
  return isValideDate.every((item) => item === true);
};

const calculateAge = function (year, month, day) {
  const today = new Date();
  const currentDay = today.getDate(); //retrieve the day
  const currentMonth = today.getMonth(); //retrieve the month
  const currentYear = today.getFullYear(); // retrieve the year;

  // covert the user inputs into "Date"
  const userDate = new Date(year, month - 1, day);
  let age = currentYear - userDate.getFullYear();
  let userMonths = currentMonth - userDate.getMonth();
  let userDay = currentDay - today.getDate();

  if (userMonths < 0 || (userMonths === 0 && userDay <= 0)) {
    age--;
  }

  return age;
};

//clearing Input Fields
const clearInputs = function () {
  userInputs.forEach((input) => {
    input.value = "";
  });
};

//Age Calculation
const calcAge = function () {
  // the input will be passed to a function
  const dayInput = document.querySelector("[name=day]");
  const monthInput = document.querySelector("[name=month]");
  const yearInput = document.querySelector("[name=year]");

  if (!ValidateInputs(dayInput, monthInput, yearInput)) {
    result.textContent = "--";
    return;
  } else {
    const userAge = calculateAge(
      yearInput.value,
      monthInput.value,
      dayInput.value
    );

    result.textContent = userAge.toString();
  }
  clearInputs();
};

// Event Listener to keyboard btn

cardBtn.addEventListener("click", calcAge);
userInputs.forEach((input) => {
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") calcAge();
  });
});
