var validateform = index => {
  let error = false;

  if (
    !validate(index, "email") ||
    !validate(index, "address") ||
    !validate(index, "fname") ||
    !validate(index, "lname") ||
    !validate(index, "number")
  )
    error = true;

  return error;
};

var validate = e => {
  if (e.target.type === "email") {
    let email = document.getElementById(e.target.id);
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
      email.classList.remove("error");
      return true;
    } else {
      email.classList.add("error");
      return false;
    }
  } else if (e.target.type === "text") {
    let inputVal = document.getElementById(e.target.id);
    if (!inputVal.value || inputVal.value.trim() === "") {
      inputVal.classList.add("error");
      return false;
    } else {
      inputVal.classList.remove("error");
      return true;
    }
  } else if (e.target.type === "number") {
    let number = document.getElementById(e.target.id);
    if (!number.value || isNaN(number.value)) {
      number.classList.add("error");
      return false;
    } else {
      number.classList.remove("error");
      return true;
    }
  }
};
