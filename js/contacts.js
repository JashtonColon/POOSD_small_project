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
                const actions = document.createElement('div');
        actions.className = 'contact-actions';

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Delete';
        deleteButton.setAttribute('aria-label', 'Delete ' + contact.firstName + ' ' + contact.lastName);
        deleteButton.addEventListener('click', function () {
            deleteContact(contact);
        });

                const editButton = document.createElement('button');
        editButton.type = 'button';
        editButton.textContent = 'Edit';
        editButton.setAttribute('aria-label', 'Edit ' + contact.firstName + ' ' + contact.lastName);
        editButton.addEventListener('click', function () {
            showEditForm(card, contact);
        });

        actions.append(editButton, deleteButton);
        card.append(info, actions);
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


const addForm = document.getElementById('add-contact-form');
const addStatus = document.getElementById('add-status');

addForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    const firstName = document.getElementById('contact-first-name').value.trim();
    const lastName = document.getElementById('contact-last-name').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const email = document.getElementById('contact-email').value.trim();

    addStatus.textContent = '';

    if (!firstName || !lastName || !phone || !email) {
        addStatus.textContent = 'Please fill in every field.';
        return;
    }

    addStatus.textContent = 'Adding...';

    try {
        await apiRequest('POST', 'contacts', {
            userId: user.id,
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            email: email
        });

        addStatus.textContent = `${firstName} ${lastName} added.`;
        addForm.reset();
        loadContacts();
    } catch (err) {
        addStatus.textContent = err.message;
    }
});


async function deleteContact(contact) {
    const name = contact.firstName + ' ' + contact.lastName;

    if (!confirm(`Delete ${name}? This cannot be undone.`)) {
        return;
    }

    try {
        await apiRequest('DELETE', 'contacts', { userId: user.id, contactId: contact.id });
        await loadContacts();
        contactStatus.textContent = `${name} deleted.`;
    } catch (err) {
        contactStatus.textContent = err.message;
    }
}

function showEditForm(card, contact) {
    card.innerHTML = '';

    const form = document.createElement('form');
    form.className = 'edit-form';
    form.noValidate = true;

    const fields = [
        { key: 'firstName', label: 'First name' },
        { key: 'lastName',  label: 'Last name' },
        { key: 'phone',     label: 'Phone' },
        { key: 'email',     label: 'Email' }
    ];

    fields.forEach(function (field) {
        const id = 'edit-' + field.key + '-' + contact.id;

        const label = document.createElement('label');
        label.htmlFor = id;
        label.textContent = field.label;

        const input = document.createElement('input');
        input.id = id;
        input.name = field.key;
        input.value = contact[field.key];

        form.append(label, input);
    });

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.textContent = 'Save';

    const cancelButton = document.createElement('button');
    cancelButton.type = 'button';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', function () {
        loadContacts();
    });

    form.append(saveButton, cancelButton);
    card.append(form);

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const firstName = form.elements.firstName.value.trim();
        const lastName = form.elements.lastName.value.trim();
        const phone = form.elements.phone.value.trim();
        const email = form.elements.email.value.trim();

        if (!firstName || !lastName || !phone || !email) {
            contactStatus.textContent = 'Please fill in every field.';
            return;
        }

        try {
            await apiRequest('PUT', 'contacts', {
                userId: user.id,
                contactId: contact.id,
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                email: email
            });

            await loadContacts();
            contactStatus.textContent = `${firstName} ${lastName} updated.`;
        } catch (err) {
            contactStatus.textContent = err.message;
        }
    });

    form.elements.firstName.focus();
}
