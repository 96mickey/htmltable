let button = document.getElementById("changeColor");
let table = document.getElementById("tablebody");

var refreshData = () => {
    loadData();
}

var loadData = () => {
    //setting up the basic view
    let items = [...data];

    let itemsToDisplay = makeLayout(items);
    
    table.innerHTML = itemsToDisplay.join("");
    button.value = "Refresh data"
    button.onclick = refreshData;
}

button.onclick = loadData;

var deleteRow = index => {
    let row = document.getElementById(`row_${index}`);
    row.parentNode.removeChild(row);
}

var editRow = index => {
    let elements = callElements(index, ""); 
    let {fname, mname, lname, email, number, address} = elements;

    let editbtn = document.getElementById(`edit_${index}`);

    //hiding the elements of the table
    //and changing the row to input fields. setting up the initial value
    //and adding event to validate the input fields
    let regex = /\_(.*?)\_/;
    Object.entries(elements).forEach(entry => {
        entry[1].children[0].classList.add("hide");
        let strforclass = regex.exec(entry[1].children[0].id)
        entry[1].innerHTML = `${entry[1].innerHTML} <input type="text" value="${entry[1].children[0].innerText.trim()}" id="input_${strforclass[1]}_${index}"></input>`;
        entry[1].children[1].addEventListener("input", validate)
    });

    //changing the button
    editbtn.innerHTML = `<button class="btn btn-outline-success" onclick="save(${index})">Save</button><button class="btn btn-outline-warning" onclick="cancel(${index})">Cancel</button>`;
}

var cancel = index => {
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

var save = index => {
    // if(validateform(index)) {
    //     alert("Check the values in the form.")
    // } else {
        let elements = callElements(index, "input_");
        let {fname, mname, lname, email, number, address} = elements;
        
        //removing input fields and event listeners
        Object.entries(elements).forEach(entry => {
            console.log(entry[1])
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
var callElements = (index, classprefix) => {
    let obj = {}
    obj.fname = document.getElementById(`${classprefix}fname_${index}`);
    obj.lname = document.getElementById(`${classprefix}lname_${index}`);
    obj.mname = document.getElementById(`${classprefix}mname_${index}`);
    obj.email = document.getElementById(`${classprefix}email_${index}`);
    obj.address = document.getElementById(`${classprefix}address_${index}`);
    obj.number = document.getElementById(`${classprefix}number_${index}`);

    return obj;
}

var makeLayout = items => {
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

    return itemsToDisplay;
} 



