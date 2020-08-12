(function () {
    'use strict';

    let table = document.querySelector("#myData");
    window.addEventListener('load', init);

    function init() {
        refreshPage();
    }

    async function refreshPage() {
        try {
            let url = '/api/admin';
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
        for (let key of headers.slice(0,4)) {
            let th = document.createElement("th");
            let text = document.createTextNode(key.charAt(0).toUpperCase() + key.slice(1));
            th.appendChild(text);
            row.appendChild(th);
        }
        let th = document.createElement("th");
        let text = document.createTextNode("Action");
        th.appendChild(text);
        row.appendChild(th);
        //Table Data
        for (let element of records) {
            let row = table.insertRow();
            const values = Object.values(element)
            for (let index = 0; index < values.length; index++) {
                let cell = row.insertCell();
                let text = document.createTextNode(values[index]);
                cell.appendChild(text);
            }
            let cell = row.insertCell();
            let btn = document.createElement("BUTTON");
            btn.innerHTML = "Update Profile";
            cell.appendChild(btn);
        }
    }
}());

async function transferAgent() {
    const url = "/api/agent";
    let data = {
        'oldID' : document.getElementById('oldID').value,
        'newID' : document.getElementById('newID').value,
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
    fetch('/api/agent', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    location.reload();
}
