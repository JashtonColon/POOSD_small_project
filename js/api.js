const API_BASE = '/LAMPAPI';

const USE_FAKE_DATA = true;

async function apiPost(endpoint, payload) {

    if(USE_FAKE_DATA){
        return fakeApi(endpoint, payload);
       }

    const url = `${API_BASE}/${endpoint}.php`;

    const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await response.json();

    if(data.error){
        throw new Error(data.error);
    }

    return data;
    
}

/*                        Temporary data until real API works               */

async function fakeApi(endpoint, payload) {

    await new Promise(function (resolve) {setTimeout(resolve, 400);});

    if(endpoint==='login'){
        if(payload.login==="Knight" && payload.password === "Test1234"){
            return { id: 1, firstName: "Mehmood", lastName: "Khan", error: ""};
        }
        throw new Error('Username or password is incorrect.');
    }

    throw new Error("Fake API doesn't know the endpoint " + endpoint);
    
}

