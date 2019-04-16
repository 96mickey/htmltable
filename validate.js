function validateform(index) {
    let error = false;

    if(!validate(index, "email") || !validate(index, "address") || !validate(index, "fname") || !validate(index, "lname") || !validate(index, "number"))
    error = true;

    return error;

}

function validate(index, type) {
    switch (type) {
        case "email":
        let email = document.getElementById(`input_email_${index}`);
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            email.classList.remove("error")
            return true;}
        else {
            email.classList.add("error");
            return false;
        };
        case "address":
        let address = document.getElementById(`input_address_${index}`);
        if(!address.value || address.value.trim() === "") {address.classList.add("error")
            return false;
        }
        else {
            address.classList.remove("error");
            return true
        };
        case "number":
        let number = document.getElementById(`input_number_${index}`);
        if(!number.value || isNaN(number.value)) {number.classList.add("error")
            return false;
        }
        else {
            number.classList.remove("error");
            return true
        };
        case "fname": 
        let fname = document.getElementById(`input_fname_${index}`);
        if(!fname.value || fname.value.trim() === "") {fname.classList.add("error")
            return false
        } 
        else {
            fname.classList.remove("error");
            return true
        };
        case "lname":
        let lname = document.getElementById(`input_lname_${index}`);
        if(!lname.value || lname.value.trim() === "") {lname.classList.add("error") 
            return false;
        }
        else {
            lname.classList.remove("error");
            return true
        };
        default:
        return false
    }
}
