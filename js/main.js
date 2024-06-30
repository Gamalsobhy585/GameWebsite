
let userName = document.getElementById('name');
let emailInput = document.getElementById('email');
let passwordInput =document.getElementById('password');
let registerBtn= document.getElementById('registerBtn')
let agreeTermCheckbox = document.getElementById('agree-term');
let usersContainer = JSON.parse(localStorage.getItem('loginUsers')) || [];
(function($) {

    $(".toggle-password").click(function() {

        $(this).toggleClass("zmdi-eye zmdi-eye-off");
        var input = $($(this).attr("toggle"));
        console.log(input);
        if (input.attr("type") == "password") {
          input.attr("type", "text");
        } else {
          input.attr("type", "password");
        }
      });

})(jQuery);




registerBtn.addEventListener('click', function(event) {
    event.preventDefault();
    let errors = [];
    if (!validateUser("name")) {
        errors.push("Username must contain 3 characters or more, Spaces not allowed ");
    }
    if (!validateUser("email")) {
        errors.push("Email must be valid");
    }
    if (!validateUser("password")) {
        errors.push("Password must be at least 8 characters long and contain an upper case letter, a lower case letter, a number, and a special character");
    }
    if (!agreeTermCheckbox.checked) {
        errors.push("You must agree to the terms of service");
    }

    if (errors.length === 0) {
        console.log('All validations passed');
        if (!isEmailAlreadyRegistered(emailInput.value)) {
            if (!isUserNameToken(userName.value)) {
                addUser();
                window.open("/BatGamerzone/pages/login.html", "_self");                 } 
                 else {
                Swal.fire({
                    icon: "warning",
                    title: "Oops...",
                    text: "This username is already used. Please sign up with another username.",
                });
            }
        } else {
            Swal.fire({
                icon: "warning",
                title: "Oops...",
                text: "This email is already registered. Please use a different email.",
            });
        }
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            html: `<ul>${errors.map(error => `<li>${error}</li>`).join('')}</ul>`
        });
    }
});







function validateUser(field) {
    let regex = {
        name : /^[a-zA-Z0-9_-]{3,15}$/ ,
        email :  /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/, 
        password :/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/ ,
    }


    let input = document.getElementById(field);
    if (regex[field].test(input.value)) {
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
        return true;
    } else {
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
        return false;
    }
}

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hash = await crypto.subtle.digest('SHA-256', data);
    return hex(hash);
}

function hex(buffer) {
    const hexCodes = [];
    const view = new DataView(buffer);
    for (let i = 0; i < view.byteLength; i += 4) {
        const value = view.getUint32(i);
        const stringValue = value.toString(16);
        const padding = '00000000';
        const paddedValue = (padding + stringValue).slice(-padding.length);
        hexCodes.push(paddedValue);
    }
    return hexCodes.join("");
}
function clearForm() {
    userName.value = '';
    emailInput.value = '';
    passwordInput.value = '';
}
async function addUser() {
    let hashedPassword = await hashPassword(passwordInput.value);
    let user = {
        userName: userName.value,
        email: emailInput.value,
        password: hashedPassword
    };
    usersContainer.push(user);
    localStorage.setItem('loginUsers', JSON.stringify(usersContainer));
    console.log('user is added');
    clearForm();
}
function isEmailAlreadyRegistered(email) {
    return usersContainer.some(user => user.email === email);
}
function isUserNameToken(userName) {
    return usersContainer.some(user => user.userName === userName);
}



document.addEventListener('DOMContentLoaded', function() {
    if (isLoggedIn()) {
        window.location.href = '/pages/home.html'; 
    }
  });
  function isLoggedIn() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    return loggedInUser !== null;
  }