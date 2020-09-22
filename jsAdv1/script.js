var counter = 0;

function selectFirst() {
    var listOfItems = document.getElementsByTagName("li");
    for (var j = 0; j < listOfItems.length; j++) {
        listOfItems[j].style.color = "black";
    }
    document.getElementById('list').firstElementChild.style.color = "red";
    counter = 0;

}

function selectLast() {
    var listOfItems = document.getElementsByTagName("li");
    for (var j = 0; j < listOfItems.length; j++) {
        listOfItems[j].style.color = "black";
    }
    document.getElementById('list').lastElementChild.style.color = "red";
    counter = listOfItems.length - 1;
}

function selectNext() {
    var listOfItems = document.getElementsByTagName("li");
    for (var j = 0; j < listOfItems.length; j++) {
        listOfItems[j].style.color = "black";
    }
    counter = counter + 1;
    if (counter >= listOfItems.length) {
        counter = 0;
    }
    listOfItems[counter].style.color = "red";

}

function selectPrevious() {
    var listOfItems = document.getElementsByTagName("li");
    for (var j = 0; j < listOfItems.length; j++) {
        listOfItems[j].style.color = "black";
    }
    counter = counter - 1;
    if (counter < 0) {
        counter = listOfItems.length - 1;
    }
    listOfItems[counter].style.color = "red";


}

function add(form) {
    if (form.input.value) {
        var newItem = document.createElement("li");
        newItem.innerHTML = form.input.value;
        document.getElementById("list").appendChild(newItem);
    }
}

function remove() {
    var listOfItems = document.getElementById("list");
    var removedChild = listOfItems.lastChild;
    listOfItems.removeChild(removedChild);
}

function addBefore(form) {
    if (form.input.value) {
        var firstInList = document.getElementById('list').firstElementChild;
        var newItem = document.createElement("li");
        newItem.innerHTML = form.input.value;
        document.getElementById("list").insertBefore(newItem, firstInList);
    }
}