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
loginBtn = document.getElementById('signinBtn');

loginBtn.addEventListener('click', async function(e) {
  e.preventDefault();
  loginEmail = document.getElementById('loginEmail').value;
  loginPassword = document.getElementById('password').value;
  let usersContainer = JSON.parse(localStorage.getItem('loginUsers')) || [];
  let user = usersContainer.find(user => user.email === loginEmail);
  if (user) {
    let hashedPassword = await hashPassword(loginPassword);  
    if (user.password === hashedPassword) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      window.location.href = '/GameWebsite/pages/home.html';  }
      else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid password!'
        });
        console.log('Invalid Password');
    }
} else {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'User not found!'
    });
    console.log('User not found');
}
});
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
document.addEventListener('DOMContentLoaded', function() {
  if (isLoggedIn()) {
    window.location.href = '/GameWebsite/pages/home.html'; 
  }
});
function isLoggedIn() {
  const loggedInUser = localStorage.getItem('loggedInUser');
  return loggedInUser !== null;
}