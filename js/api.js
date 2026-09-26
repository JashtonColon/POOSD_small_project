const API_BASE = '/LAMPAPI';

const USE_FAKE_DATA = true;

async function apiRequest(method, endpoint, payload) {

    if (USE_FAKE_DATA) {
        return fakeApi(method, endpoint, payload);
    }

    let url = `${API_BASE}/${endpoint}.php`;
    const options = { method: method, headers: {} };

    if (method === 'GET' || method === 'DELETE') {
        url += '?' + new URLSearchParams(payload).toString();
    } else {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(payload);
    }

    const response = await fetch(url, options);
    const data = await response.json();

    if (data.error) {
        throw new Error(data.error);
    }

    return data;
}

async function apiPost(endpoint, payload) {
    return apiRequest('POST', endpoint, payload);
}

/*                        Temporary data until real API works               */

let fakeContacts = [
    { id: 1, userId: 1, firstName: 'John',   lastName: 'Smith', phone: '(123) 456-7890', email: 'jsmith@email.com',       dateCreated: '2026-09-20' },
    { id: 2, userId: 1, firstName: 'Jordan', lastName: 'Jones', phone: '(941) 456-7890', email: 'jordan.jones@email.com', dateCreated: '2026-09-21' },
    { id: 3, userId: 1, firstName: 'Sarah',  lastName: 'Jobs',  phone: '(941) 456-0010', email: 'sarah.jobs@email.com',   dateCreated: '2026-09-22' },
    { id: 4, userId: 2, firstName: 'Jim',    lastName: 'Pop',   phone: '(123) 456-6767', email: 'jpop@email.com',         dateCreated: '2026-09-23' }
];
let nextContactId = 5;

async function fakeApi(method, endpoint, payload) {

    await new Promise(function (resolve) {setTimeout(resolve, 400);});

    if(endpoint==='login'){
        if(payload.username==="Knight" && payload.password === "Test1234"){
            return { id: 1, firstName: "Mehmood", lastName: "Khan", error: ""};
        }
        throw new Error('Username or password is incorrect.');
    }

    if(endpoint==='register'){
        if(payload.username==='Knight'){
            throw new Error("Username already taken.");
        }
        return{id : 2, firstName: payload.firstName, lastName: payload.lastName, error: ""};
    }
        if (endpoint === 'contacts' && method === 'GET') {
        const term = (payload.search || '').toLowerCase();

        const results = fakeContacts.filter(function (c) {
            return c.userId === Number(payload.userId) &&
                (c.firstName.toLowerCase().includes(term) ||
                 c.lastName.toLowerCase().includes(term));
        });

        return { results: results };
    }

        if (endpoint === 'contacts' && method === 'POST') {
        const contact = {
            id: nextContactId,
            userId: Number(payload.userId),
            firstName: payload.firstName,
            lastName: payload.lastName,
            phone: payload.phone,
            email: payload.email,
            dateCreated: new Date().toISOString().slice(0, 10)
        };

           

        nextContactId = nextContactId + 1;
        fakeContacts.push(contact);

        return { id: contact.id, firstName: contact.firstName, lastName: contact.lastName };
    }

     if (endpoint === 'contacts' && method === 'DELETE') {
        fakeContacts = fakeContacts.filter(function (c) {
            return !(c.id === Number(payload.contactId) && c.userId === Number(payload.userId));
        });
        return {};
    }

    throw new Error("Fake API doesn't know the endpoint " + endpoint);
    
}

