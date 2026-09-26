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

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const contactsList = document.getElementById('contacts-list');
const contactStatus = document.getElementById('contact-status');

async function loadContacts() {
    const term = searchInput.value.trim();
    contactStatus.textContent = 'Loading...';

    try {
        const data = await apiRequest('GET', 'contacts', { userId: user.id, search: term });
        showContacts(data.results);
        contactStatus.textContent = '';
    } catch (err) {
        contactStatus.textContent = err.message;
    }
}

function showContacts(contacts) {
    contactsList.innerHTML = '';

    if (contacts.length === 0) {
        contactsList.textContent = 'No contacts found.';
        return;
    }

    contacts.forEach(function (contact) {
        const card = document.createElement('div');
        card.className = 'contact-card';

        const info = document.createElement('div');
        info.className = 'contact-info';

        const name = document.createElement('h3');
        name.textContent = contact.firstName + ' ' + contact.lastName;

        const phone = document.createElement('p');
        phone.textContent = 'Phone: ' + contact.phone;

        const email = document.createElement('p');
        email.textContent = 'Email: ' + contact.email;

        info.append(name, phone, email);
        card.append(info);
        contactsList.append(card);
    });
}

searchForm.addEventListener('submit', function (event) {
    event.preventDefault();
    loadContacts();
});

if (user) {
    loadContacts();
}