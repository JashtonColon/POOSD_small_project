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

    throw new Error("Fake API doesn't know the endpoint " + endpoint);
    
}

