function logout()
{
    localStorage.removeItem('loggedInUser');
    window.location.href='/pages/login.html';
}