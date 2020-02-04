/*******************************
  HELPER FUNCTIONS
 ******************************/
// @param {string} el - type of element to create
function newElement(el) {
  return document.createElement(el);
}

// @param id - id of element to get
function getElById(id) {
  return document.getElementById(id);
}

// @param cls - cls of element to get
function getElByClass(cls) {
  return document.getElementsByClassName(cls);
}

// @param selector - select of elements to get
function getElsBySelector(selector) {
  return document.querySelectorAll(selector);
}

// @param cls - class to add
// @param el - element to add class to
function addClass(cls, el) {
  el.classList.add(cls);
}

// @param cls - class to remove
// @param el - element to remove class to
function removeClass(cls, el) {
  el.classList.remove(cls);
}

// @param el - element to display
function show(el) {
  el.style.display = "";
}

// @param el - element to hide
function hide(el) {
  el.style.display = "none";
}

// @param el {string} - element to append error to
// @param errMsg {string} message to display
// @param id {string} id to add to error p
function setError(el, errMsg, id) {
  const error = newElement("p");
  addClass("error", error);
  error.id = id;
  error.innerText = errMsg;
  el.after(error);
}

// @param id {string} id of elemement to remove
function removeError(id) {
  const el = getElById(id);
  if (el) {
    el.remove();
  }
}
