const user = JSON.parse(localStorage.getItem('user'));

if (!user) {
    window.location.replace('index.html');
} else {
    document.getElementById('welcome').textContent = `Signed in as ${user.firstName}`;
}

document.getElementById('signout-button').addEventListener('click', function () {
    localStorage.removeItem('user');
    window.location.replace('index.html');
});