document.addEventListener("DOMContentLoaded", () => {
  console.log("filmgalaxy JS imported successfully!");

  function makeActive() {
    const selector = ".nav-link";
    const elems = Array.from(document.querySelectorAll(selector));
    elems.forEach((elem) => {
      if (window.location.href.endsWith(elem.href)) {
        elem.classList.add("active");
      } else {
        elem.classList.remove("active");
      }
    });
  }

  function isAtLeastOneChecked(name) {
    let checkboxes = Array.from(document.getElementsByName(name));
    return checkboxes.some((e) => e.checked);
  }

  function validateCreateFestivalForm() {
    const formFestival =
      document.getElementById("formCreateFestival") ||
      document.getElementById("formEditFestival");
    if (formFestival) {
      formFestival.onsubmit = () => {
        let elem;
        if (!isAtLeastOneChecked("acceptedCategories")) {
          elem = document.getElementsByName("acceptedCategories").item(0);
          elem.focus();
          // elem.setCustomValidity("Please select at least one option");
          // elem.setCustomValidity("");
        } else if (!isAtLeastOneChecked("acceptedLength")) {
          elem = document.getElementsByName("acceptedLength").item(0);
          elem.focus();
        } else {
          return true;
        }
        return false;
      };
    }
  }

  function validateSignupPasswords() {
    const password = document.getElementById("password");
    const pwdConfirmation = document.getElementById("pwdConfirmation");

    function validatePassword() {
      if (password.value != pwdConfirmation.value) {
        pwdConfirmation.setCustomValidity("Passwords Don't Match");
      } else {
        pwdConfirmation.setCustomValidity("");
      }
    }

    password.onchange = validatePassword;
    pwdConfirmation.onkeyup = validatePassword;
  }

  makeActive();
  validateCreateFestivalForm();
  validateSignupPasswords();
});
