/*****************************************************
 * Global Variables
 ****************************************************/
const name = getElById("name");
const email = getElById("mail");
const legend = getElsBySelector(".activities legend")[0];
const cc = getElById("cc-num");
cc.maxLength = 16;
const cvv = getElById("cvv");
cvv.maxLength = 3;
const zip = getElById("zip");
zip.maxLength = 16;

/*****************************************************
 * Initial Focus
 ****************************************************/

name.focus();

/*****************************************************
 * Other Job Field
 ****************************************************/

// hide and set to only show if "other" is selected
const other = getElById("other");
const job = getElById("title");

//initially hides "other" field
hide(other);

// shows or hides "other" field based on selected option
job.addEventListener("change", e => {
  job[job.selectedIndex].value === "other" ? show(other) : hide(other);
});

/*****************************************************
 * T-shirt Section
 ****************************************************/
const colorsDiv = getElById("colors-js-puns");
const colors = getElById("color").options;
const design = getElById("design");
// initially hides color options
hide(colorsDiv);

// shows the color options when a design is selected and removes "select theme" option
// changes which colors display based on theme chosen
design.addEventListener("change", e => {
  // Removes Select Theme as an option
  if (design.options[0].innerText === "Select Theme") {
    design.options[0].remove();
  }

  // displays Color options
  show(colorsDiv);

  for (let i = 0; i < colors.length; i++) {
    // chooses which 3 options to display based on theme chosen
    if (design.selectedIndex === 0) {
      if (i < 3) {
        show(colors[i]);
      } else {
        hide(colors[i]);
      }
    } else {
      if (i > 2) {
        show(colors[i]);
      } else {
        hide(colors[i]);
      }
    }
  }

  // based on theme chosen, adds or removes the selected option
  design.selectedIndex === 0
    ? colors[0].setAttribute("selected", true)
    : colors[0].removeAttribute("selected");
  design.selectedIndex === 1
    ? colors[3].setAttribute("selected", true)
    : colors[3].removeAttribute("selected");
});

/*****************************************************
 * Activities Section
 ****************************************************/
const boxes = getElsBySelector('input[type="checkbox');
const activities = getElByClass("activities")[0];
// Adds the Total Div
const totalDisplay = newElement("span");
addClass("total", totalDisplay);
let total = 0;
totalDisplay.innerText = `Total: $${total}`;
activities.append(totalDisplay);

activities.addEventListener("change", e => {
  const target = e.target;
  const targetDate = target.getAttribute("data-day-and-time");

  // if target was checked, adds cost to total, otherwise, subtracts it.
  target.checked
    ? (total += parseInt(target.getAttribute("data-cost")))
    : (total -= parseInt(target.getAttribute("data-cost")));
  totalDisplay.innerText = `Total: $${total}`;

  // Determines which boxes should be enabled/disabled
  boxes.forEach(box => {
    if (target !== box) {
      if (targetDate === box.getAttribute("data-day-and-time")) {
        if (target.checked) {
          box.setAttribute("disabled", true);
          addClass("disabled", box.parentElement);
        } else {
          box.removeAttribute("disabled");
          removeClass("disabled", box.parentElement);
        }
      }
    }
  });
});

/*****************************************************
 * Payment Section
 ****************************************************/
const paymentSelect = getElById("payment");
const ccDiv = getElById("credit-card");
const paypalDiv = getElById("paypal");
const bitcoinDiv = getElById("bitcoin");

//only shows ccDiv initially
hide(paypalDiv);
hide(bitcoinDiv);

//removes Select Payment method, sets credit card to selected.
paymentSelect.options[0].remove();
paymentSelect.options[0].setAttribute("selected", true);

//based on which method is selected, shows the correct div
paymentSelect.addEventListener("change", e => {
  hide(paypalDiv);
  hide(bitcoinDiv);
  hide(ccDiv);
  switch (paymentSelect.selectedIndex) {
    case 0:
      show(ccDiv);
      break;
    case 1:
      show(paypalDiv);
      break;
    case 2:
      show(bitcoinDiv);
      break;
  }
});

/*****************************************************
 * Validation Functions
 ****************************************************/

const validations = {
  // checks only for length
  nameValid: function() {
    removeError("nameError");
    if (name.value.length < 2) {
      addClass("error", name);
      setError(name, "Name must be at least 2 characters", "nameError");
      return false;
    } else {
      removeClass("error", name);
      return true;
    }
  },

  emailValid: function() {
    // Checks for length, then if it meets the regex
    removeError("emailError");

    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email.value.length === 0) {
      addClass("error", email);
      setError(email, "Email Required", "emailError");
      return false;
    } else if (!regex.test(email.value)) {
      addClass("error", email);
      setError(email, "Email must be valid format", "emailError");
      return false;
    } else {
      removeClass("error", email);
    }
  },

  // cycles through all check boxes, if it's checked, it changes flag to true
  activitiesValid: function() {
    removeError("activityError");
    let activityFlag = false;
    boxes.forEach(box => {
      if (box.checked) {
        activityFlag = true;
      }
    });
    if (!activityFlag) {
      setError(legend, "Please select at least 1 activity", "activityError");
    }
    return activityFlag;
  },
  // 3 credit card validations.  Checks if there is a value or if it passes regex test
  ccNumValid: function() {
    removeError("ccError");
    const regex = /\d{13,16}$/;

    if (cc.value.length === 0) {
      setError(cc, "Credit Card Number required", "ccError");
      addClass("error", cc);
      return false;
    } else if (!regex.test(cc.value)) {
      setError(cc, "Must be 13 - 16 numbers", "ccError");
      addClass("error", cc);
      return false;
    } else {
      removeClass("error", cc);
      return true;
    }
  },
  ccCvvValid: function() {
    removeError("cvvError");
    const regex = /\d{3}/;

    if (cvv.value.length === 0) {
      setError(cvv, "Cvv required", "cvvError");
      addClass("error", cvv);
      return false;
    } else if (!regex.test(cvv.value)) {
      setError(cvv, "Must be 3 numbers", "cvvError");
      addClass("error", cvv);
      return false;
    } else {
      removeClass("error", cvv);
      return true;
    }
  },
  ccZipValid: function() {
    removeError("zipError");
    const regex = /\d{5}/;

    if (zip.value.length === 0) {
      setError(zip, "Zip required", "zipError");
      addClass("error", zip);
      return false;
    } else if (!regex.test(zip.value)) {
      setError(zip, "Must be 5 numbers", "zipError");
      addClass("error", zip);
      return false;
    } else {
      removeClass("error", zip);
      return true;
    }
  }
};

/*****************************************************
 * Real-time Validations
 ****************************************************/
// Listens to each of the required fields and calls validations

name.addEventListener("keyup", e => {
  validations.nameValid();
});

email.addEventListener("keypress", e => {
  validations.emailValid();
});

cc.addEventListener("keyup", e => {
  validations.ccNumValid();
});

cvv.addEventListener("keyup", e => {
  validations.ccCvvValid();
});

zip.addEventListener("keyup", e => {
  validations.ccZipValid();
});

activities.addEventListener("change", e => {
  // only runs validations if the activity already has an error from submitting
  // this will remove the error once a box is checked
  const error = getElById("activityError");
  if (error) {
    validations.activitiesValid();
  }
});

/*****************************************************
 * Submit
 ****************************************************/
const form = getElsBySelector("form")[0];
form.addEventListener("submit", e => {
  // runs validation on required fields and pushes the returned boolean to flag
  // if flag contains a "false", then it prevent form from submitting.
  let flag = [];
  flag.push(validations.nameValid());
  flag.push(validations.emailValid());
  flag.push(validations.activitiesValid());
  const payMethod = paymentSelect[paymentSelect.selectedIndex].value;
  if (payMethod === "credit card") {
    flag.push(validations.ccNumValid());
    flag.push(validations.ccZipValid());
    flag.push(validations.ccCvvValid());
  }
  if (flag.indexOf(false) > -1) {
    e.preventDefault();
  }
});
