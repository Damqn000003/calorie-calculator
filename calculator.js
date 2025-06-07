document.getElementById("calorieForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const sex = document.getElementById("sex").value;
  const age = parseInt(document.getElementById("age").value);
  const weight = parseFloat(document.getElementById("weight").value);
  const height = parseFloat(document.getElementById("height").value);
  const activity = document.getElementById("activity").value;

  if (!validateInput(age) || !validateInput(weight) || !validateInput(height)) {
    alert("Моля, въведете валидни положителни стойности.");
    return;
  }

  const bmr = calculateBMR(sex, weight, height, age);
  const totalCalories = getCaloriesForActivity(bmr, activity);
  const advice = getAdvice(totalCalories);

  showResult(totalCalories, advice);
});

function calculateBMR(sex, weight, height, age) {
  if (sex === "male") {
    return 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age);
  } else {
    return 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age);
  }
}

function getCaloriesForActivity(bmr, activityLevel) {
  const factors = {
    "sedentary": 1.2,
    "light": 1.375,
    "moderate": 1.55,
    "active": 1.725,
    "very active": 1.9
  };
  return bmr * (factors[activityLevel] || 1);
}

function getAdvice(calories) {
  const lose = Math.round(calories - 300);
  const gain = Math.round(calories + 300);
  return `За поддържане: ${Math.round(calories)} kcal/ден\n` +
         `За отслабване: ~${lose} kcal/ден\n` +
         `За покачване: ~${gain} kcal/ден`;
}

function showResult(calories, advice) {
  const resultBox = document.getElementById("resultBox");
  const resultText = document.getElementById("calorieResult");
  resultText.textContent = advice;
  resultBox.style.display = "block";
}

function validateInput(value) {
  return !isNaN(value) && value > 0;
}