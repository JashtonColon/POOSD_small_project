const registerForm = document.getElementById('form-register');
const registerStatus = document.getElementById('register-status');

registerForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('reg-first').value.trim();
    const lastName = document.getElementById('reg-last').value.trim();
    const login = document.getElementById('reg-login').value.trim();
    const password = document.getElementById('reg-password').value;

    registerStatus.textContent="";

    if(!firstName || !lastName || !login || !password){
        registerStatus.textContent= "Please fill in every field.";
        return;
    }

    if(password.length < 8){
        registerStatus.textContent = "Password must be atleast 8 characters.";
        return;
    }

    registerStatus.textContent= "Creating account...";


    try{
        const user = await apiPost('register', {
            firstName: firstName,
            lastName: lastName,
            username: login,
            password: password
        });

        localStorage.setItem('user', JSON.stringify(user));
        window.location.href= 'contacts.html';
    }catch(err){
        registerStatus.textContent = err.message;
    }
});