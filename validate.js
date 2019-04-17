function validateform(index) {
    let error = false;

    if(!validate(index, "email") || !validate(index, "address") || !validate(index, "fname") || !validate(index, "lname") || !validate(index, "number"))
    error = true;

    return error;

}

function validate(e) {
    console.log(e)
    if(/email/gi.test(e.target.id)) {
        let email = document.getElementById(e.target.id);
        if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
            email.classList.remove("error")
            return true;}
        else {
            email.classList.add("error");
            return false;
        };
    } else if(/address/gi.test(e.target.id)) {
        let address = document.getElementById(e.target.id);
        if(!address.value || address.value.trim() === "") {address.classList.add("error")
            return false;
        }
        else {
            address.classList.remove("error");
            return true
        };
    } else if(/number/gi.test(e.target.id)) {
        let number = document.getElementById(e.target.id);
        if(!number.value || isNaN(number.value)) {number.classList.add("error")
            return false;
        }
        else {
            number.classList.remove("error");
            return true
        };
    } else if(/fname/gi.test(e.target.id)) {
        let fname = document.getElementById(e.target.id);
        if(!fname.value || fname.value.trim() === "") {fname.classList.add("error")
            return false
        } 
        else {
            fname.classList.remove("error");
            return true
        };
    }   else if(/lname/gi.test(e.target.id)) {
        let lname = document.getElementById(e.target.id);
        if(!lname.value || lname.value.trim() === "") {lname.classList.add("error") 
            return false;
        }
        else {
            lname.classList.remove("error");
            return true
        };
    }
}

// function escapeRegex(text) {
//     return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
//   }

