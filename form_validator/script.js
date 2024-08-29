const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Show input success message
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

//Check email is valid
function checkEmail(input) {
  return String(input.value.trim())
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    ? showSuccess(input)
    : showError(input, 'Email is not valid');
}

// Check required fields
function checkRequired(inputArr) {
  inputArr.forEach((input) =>
    !input.value.trim()
      ? showError(input, `${input.labels[0].innerText} is  Required`)
      : showSuccess(input)
  );
}

// Check input length
function checkLength(input, min, max) {
  input.value.length < min
    ? showError(
        input,
        `${input.labels[0].innerText} must be at least ${min} characters`
      )
    : input.value.length > max
    ? showError(
        input,
        `${input.labels[0].innerText} must be less than ${max} characters`
      )
    : showSuccess(input);
}

// Check passwords match
function checkPasswordsMatch(input1, input2) {
  input1.value !== input2.value
    ? showError(input2, 'Passwords do not match')
    : showSuccess(input2);
}

//Event Listeners
form.addEventListener('submit', (e) => {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordsMatch(password, password2);
  console.log({
    username: username.value,
    email: email.value,
    password: password.value,
    password2: password2.value,
  });
});
