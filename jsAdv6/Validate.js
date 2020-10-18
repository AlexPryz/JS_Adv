window.addEventListener("load", init, false);

function init() {
    form1.userName.onchange = nameOnChange;
    form1.email.onchange = emailOnChange;
    form1.zip.onchange = zipcodeOnChange;
    form1.onsubmit = onsubmitHandler;
}


function validate(elem, pattern) {
    var res = pattern.test(elem.value);
    if (res === false) {
        elem.className = "invalid";
    } else {
        elem.className = "valid";
    }
}

function nameOnChange() {
    var pattern = /\S/;
    validate(this, pattern);
}

function emailOnChange() {
    var pattern = /\b[a-z0-9._]+@[a-z0-9.-]+\.[a-z]{2,4}\b/i;
    validate(this, pattern);
}

function zipcodeOnChange() {
    var pattern = /\d{5}/;
    validate(this, pattern);
}

function onsubmitHandler(event) {
    var invalid = false;
    for (var i = 0; i < form1.elements.length; ++i) {
        if (form1.elements[i].className == "invalid") {
            invalid = true;
        }
    }

    if (invalid) {
        alert("Допущены ошибки при заполнении формы.");
        event.preventDefault();
    }
}