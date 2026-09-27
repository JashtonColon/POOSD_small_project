const signinForm = document.getElementById("form-signin");

const signinStatus = document.getElementById("signin-status");

signinForm.addEventListener("submit", async function(event){
    event.preventDefault();
    

    const login = document.getElementById("signin-login").value.trim();
    const password = document.getElementById("signin-password").value;

   


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
        const user = await apiPost('login', { username: login, password: password });
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = 'contacts.html';
} catch (err){
    signinStatus.textContent = err.message;
}

}); 



