(function () {
    'use strict';

    let table = document.querySelector("table");
    window.addEventListener('load', init);

    function init() {
        refreshPage();
    }

    async function refreshPage() {
        try {
            let url = '/api/disclosures';
            const response = await fetch(url);
            if (!response.ok) throw response;
            let resp = await response.json()
            renderPage(resp);
        } catch (e) {
            window.location.replace("/");
        }
    }

    function renderPage(records) {
        //Table Header
        let headers = Object.keys(records[0]);
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of headers.slice(1,5)) {
            let th = document.createElement("th");
            let text = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
            th.appendChild(text);
            row.appendChild(th);
        }
        //Table Data
            for (let element of records) {
                let row = table.insertRow();
                const values = Object.values(element)
                for (let index = 1; index < values.length; index++) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(values[index]);
                    cell.appendChild(text);
                }
            }
    }
}());


async function createNoD() {
    const url = "/api/disclosures";
    let data = {
        'client' : document.getElementById('clientID').value,
        'email' : document.getElementById('email').value,
        'token' : document.getElementById('token').value,
        'valid' : document.getElementById('valid').value
    };
    const other_params = {
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body : data,
        method : "POST",
        mode : "cors"
    };
    fetch('/api/disclosures', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    location.reload();
}
