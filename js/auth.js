const signinForm = document.getElementById("form-signin");

const signinStatus = document.getElementById("signin-status");

signinForm.addEventListener("submit", async function(event){
    event.preventDefault();
    signinStatus.textContent = 'Form Submitted';

    const login = document.getElementById("signin-login").value.trim();
    const password = document.getElementById("signin-password").value;

    signinStatus.textContent = `Username: ${login}, Password: ${password}`;


    signinStatus.textContent = "";

if(!login){
    signinStatus.textContent = ("Enter your username. ");
    return;
}

if(!password){
    signinStatus.textContent = "Enter your password. ";
    return;
}

signinStatus.textContent = "Signing in... ";

try{
    const user = await apiPost('login', { login: login, password: password });

    signinStatus.textContent = `Welcome, ${user.firstName}!`;
} catch (err){
    signinStatus.textContent = err.message;
}

}); 



