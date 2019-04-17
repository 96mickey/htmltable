
let body = document.body
let button = document.getElementById("changeColor");
let table = document.getElementById("tablebody");
button.onclick = LoadData;

function refreshData() {
    LoadData();
}

function LoadData() {
    //setting up the basic view
    let items = [...data];
    let itemsToDisplay = items.map((item, index) => {
        return (`<tr key=${index} id="row_${index}">
        <td id="fname_${index}">
        <div id="value_fname_${index}">
        ${item["First Name"]}
        </div>
        </td>
        <td id="mname_${index}">
        <div id="value_mname_${index}">
        ${item["Middle Name"]}
        </div>
        </td>
        <td id="lname_${index}">
        <div id="value_lname_${index}">
        ${item["Last Name"]}
        </div>
        </td>
        <td id="email_${index}">
        <div id="value_email_${index}">
        ${item["Email"]}
        </div>
        </td>
        <td id="number_${index}">
        <div id="value_number_${index}">
        ${item["Phone Number"]}
        </div>
        </td>
        <td id="address_${index}">
        <div id="value_address_${index}">
        ${item["Address"]}
        </div>
        </td>
        <td id="edit_${index}"><button class="btn btn-secondary" onclick="editRow(${index})">edit</button></td>
        <td ><button class="btn btn-danger" onclick="deleteRow(${index})">delete</button></td>
        </tr>`)
    })
    table.innerHTML = itemsToDisplay.join("");
    button.value = "Refresh data"
    button.onclick = refreshData;
}

function deleteRow(index) {
    let row = document.getElementById(`row_${index}`);
    row.parentNode.removeChild(row);
}

function editRow(index) {
    let elements = callElements(index, ""); 
    let {fname, mname, lname, email, number, address} = elements;

    let editbtn = document.getElementById(`edit_${index}`);

    let elementsToHide = callElements(index, "value_");
    let {fname:showfname, lname:showlname, mname:showmname, email:showemail, number:shownumber, address:showaddress} = elementsToHide;
    //hiding the elements of the table
    Object.entries(elementsToHide).forEach(entry => {
        entry[1].classList.add("hide");
        });

    //changing the row to input fields. setting up the initial value
    fname.innerHTML = `${fname.innerHTML} <input type="text" value="${showfname.innerText.trim()}" id="input_fname_${index}"></input>`;
    lname.innerHTML = `${lname.innerHTML}<input type="text" value="${showlname.innerText.trim()}" id="input_lname_${index}"></input>`;
    mname.innerHTML = `${mname.innerHTML}<input type="text" value="${showmname.innerText.trim()}" id="input_mname_${index}"></input>`;
    email.innerHTML = `${email.innerHTML}<input type="text" value="${showemail.innerText.trim()}" onchnage="validateemail(${index})" id="input_email_${index}"></input>`;
    number.innerHTML = `${number.innerHTML}<input type="text" value="${shownumber.innerText.trim()}" id="input_number_${index}"></input>`;
    address.innerHTML = `${address.innerHTML}<input type="text" value="${showaddress.innerText.trim()}" id="input_address_${index}"></input>`;
    editbtn.innerHTML = `<button class="btn btn-outline-success" onclick="save(${index})">Save</button><button class="btn btn-outline-warning" onclick="cancel(${index})">Cancel</button>`;

    //adding event to validate the input fields
    let inputelements = callElements(index, "input_"); 
    let {fname:inputfname, lname:inputlname, email:inputemail, number:inputnumber, address:inputaddress} = inputelements;
    inputfname.addEventListener("input", validate)
    inputlname.addEventListener("input", validate)
    inputemail.addEventListener("input", validate)
    inputnumber.addEventListener("input", validate)
    inputaddress.addEventListener("input", validate)
}

function cancel(index) {
    let cancelVal = callElements(index, "input_");

    //removing event listeners
    Object.entries(cancelVal).forEach(entry => {
        entry[1].removeEventListener("input", validate)
        entry[1].parentNode.removeChild(entry[1]);
        });
    
    //removing hide class (to see the actual content)
    let removeHideClass = callElements(index, "value_");
    Object.entries(removeHideClass).forEach(entry => {
        entry[1].classList.remove("hide");
        });
        
    //getting back the edit button
    document.getElementById(`edit_${index}`).innerHTML = `<button class="btn btn-secondary" onclick="editRow(${index})">edit</button>`
}

function save(index) {
    // if(validateform(index)) {
    //     alert("Check the values in the form.")
    // } else {
        let elements = callElements(index, "input_");
        let {fname, mname, lname, email, number, address} = elements;
        
        //removing input fields
        Object.entries(elements).forEach(entry => {
            entry[1].removeEventListener("input", validate)
            entry[1].parentNode.removeChild(entry[1]);
            });
        //getting back the hidden data
        let removeHideClass = callElements(index, "value_");
        Object.entries(removeHideClass).forEach(entry => {
            entry[1].classList.remove("hide");
            });

            let {
                    fname: resetfname,
                    lname: resetlname, 
                    mname: resetmname, 
                    email: resetemail, 
                    number: resetnumber, 
                    address: resetaddress
                } = removeHideClass;
        //replacing the value with new values on save
        resetfname.innerHTML = fname.value;
        resetlname.innerHTML = lname.value;
        resetmname.innerHTML = mname.value;
        resetemail.innerHTML = email.value;
        resetnumber.innerHTML = number.value;
        resetaddress.innerHTML = address.value;
        //finally getting the edit button back
        document.getElementById(`edit_${index}`).innerHTML = `<button class="btn btn-secondary" onclick="editRow(${index})">edit</button>`
    // }
    
}

//general way for selecting elements to iterate over
function callElements(index, str) {
    let obj = {}
    obj.fname = document.getElementById(`${str}fname_${index}`);
    obj.lname = document.getElementById(`${str}lname_${index}`);
    obj.mname = document.getElementById(`${str}mname_${index}`);
    obj.email = document.getElementById(`${str}email_${index}`);
    obj.address = document.getElementById(`${str}address_${index}`);
    obj.number = document.getElementById(`${str}number_${index}`);

    return obj;
}



