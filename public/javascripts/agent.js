(function () {
    'use strict';

    let clients = document.querySelector("#myData");
    let policies = document.querySelector("#myData2");
    window.addEventListener('load', init);
    let btnAddClient = document.querySelector('#addClientB');
    let btnShowAddPolicy = document.querySelector('#showPolicyPopupB');
    let btnAddPolicy = document.querySelector('#addPolicyB');
    let popup = document.querySelector('#myModal');
    document
        .querySelector('#showPopupB')
        .addEventListener('click', ev => popup.style.display = 'block');

    document.querySelectorAll('#myData')
        .forEach(e => e.addEventListener("click", function() {
            // Here, `this` refers to the element the event was hooked on
            highlight_row();
        }));

/*    document
        .querySelector('#myData')
        .addEventListener('click', ev => policies.style.display = 'block');*/

    function init() {
        btnAddClient.addEventListener('click', addClient);
        btnShowAddPolicy.addEventListener('click', showAddPolicy);
  //      btnAddPolicy.addEventListener('click', addPolicy);
        refreshPage();
    }

    async function refreshPage() {
        try {
            let url = '/api/agent';
            const response = await fetch(url);
            if (!response.ok) throw response;
            let resp = await response.json()
            renderClients(resp, clients);
        } catch (e) {
            window.location.replace("/");
        }
    }

    function renderClients(records, table) {
        var table = table;
        console.log(table.id);
        //Table Header
        let headers = Object.keys(records[0]);
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of headers.slice(1,4)) {
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
            let id = 0;
            let row = table.insertRow();
            const values = Object.values(element)
            console.log(values);
            for (let index = 0; index <= values.length; index++) {
                if (index == 0) {
                }
                else if (index < values.length) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(values[index]);
                    cell.appendChild(text);
                }
                else {
                    let button = document.createElement('input');
                    button.setAttribute('type', 'button');
                    button.setAttribute('value', 'View Policies');
                    button.setAttribute('id', values[0]);
                    button.setAttribute('name', 'getPolicies');
                    button.setAttribute('class', 'getPolicies');
                    button.setAttribute('onclick', 'getPolicies(this)');
                    row.appendChild(button);
                    let button2 = document.createElement('input');
                    button2.setAttribute('type', 'button');
                    button2.setAttribute('value', 'Update Profile');
                    button2.setAttribute('name', values[0]);
                    button2.setAttribute('onclick', 'addPolicy(this)');
                    row.appendChild(button2);
                }
            }
        }
    }

    async function showAddPolicy() {
        //alert("Adding policy newPolicy" + this.name);
        let pForm = document.querySelector("#newPolicy");
        pForm.setAttribute("style", "display: block;")
    }
    async function addClient() {

        const url = "/api/clients";
        let data = {
            'username' : document.getElementById('fName').value,
            'password' : document.getElementById('fPassword').value,
            'email' : document.getElementById('fEmail').value,
            'role' : 'client',
            'metarole' : 2
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
        await fetch('/api/clients', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
                //'Content-Type': 'application/x-www-form-urlencoded',
            }
        });
        await refreshPage();
    }

}());

function renderPolicies(records, table) {
    var table = table;
    console.log(table.id);
    //Table Header
    console.log(records);
    document.getElementById('nPolicy').setAttribute("style", "display:block");

    if (records.length == 0 ) {
        table.innerHTML = "<label>No policies found</label>";
    } else {
        let headers = Object.keys(records[0]);
        let thead = table.createTHead();
        let row = thead.insertRow();
        for (let key of headers.slice(2,5)) {
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
            let id = 0;
            let row = table.insertRow();
            const values = Object.values(element)
            console.log(values);
            for (let index = 0; index <= values.length; index++) {
                if (index < 2) {
                }
                else if (index < values.length) {
                    let cell = row.insertCell();
                    let text = document.createTextNode(values[index]);
                    cell.appendChild(text);
                }
                else {
                    let button = document.createElement('input');
                    button.setAttribute('type', 'button');
                    button.setAttribute('value', 'Remove Policy');
                    button.setAttribute('id', values[0]);
                    button.setAttribute('onclick', 'deletePolicy(this)');
                    row.appendChild(button);
                }
            }
        }
    }
}





async function addPolicy(e) {
    const url = "/api/policies";
    let data = {
        'client': document.getElementById('myHidden').value,
        'name' : document.getElementById('fDesc').value,
        'type' : document.getElementById('pType').value,
        'valid' : document.getElementById('fvalid').value
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
    await fetch('/api/policies', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    await refreshPage();

}

async function deletePolicy(e) {
    const url = "/api/policies";
    let data = {
        'policyID': e.id
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
    fetch('/api/policies', {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
            //'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    location.reload();

}

async function getPolicies(e) {
    let policies = document.querySelector("#myData2");
    console.log(e.id);
    document.getElementById('myHidden').setAttribute("value", e.id);
    //document.getElementById('addPolicyB').setAttribute("name", e.id);
    const response2 = await fetch('/api/policies/' + e.id, { method: 'GET' });
    if (!response2.ok) throw response2;
    let resp2 = await response2.json()
    console.log(resp2);
    policies.innerHTML = "";
    renderPolicies(resp2, policies);
}

function highlight_row() {
    var table = document.getElementById('myData');
    var cells = table.getElementsByTagName('td');

    for (var i = 0; i < cells.length; i++) {
        // Take each cell
        var cell = cells[i];
        // do something on onclick event for cell
        cell.onclick = function () {
            // Get the row id where the cell exists
            var rowId = this.parentNode.rowIndex;

            var rowsNotSelected = table.getElementsByTagName('tr');
            for (var row = 0; row < rowsNotSelected.length; row++) {
                rowsNotSelected[row].style.backgroundColor = "";
                rowsNotSelected[row].classList.remove('selected');
            }
            var rowSelected = table.getElementsByTagName('tr')[rowId];
            rowSelected.style.backgroundColor = "yellow";
            rowSelected.className += " selected";
            var myButton = document.getElementsByName('getPolicies')[rowId-1];
            console.log(myButton.id);
            getPolicies(myButton);
        }
    }

}