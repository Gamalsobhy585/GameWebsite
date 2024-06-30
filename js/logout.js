function logout()
{
    localStorage.removeItem('loggedInUser');
    window.location.href='/GameWebsite/pages/login.html';
}