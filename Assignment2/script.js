var buton = document.getElementById("btn");


function openpopup() {
    var pop = document.querySelector(".popup");
    pop.classList.add("showpopup");
    var bton = document.getElementById("btn");
    bton.classList.add("hidebtn");
}


function closepopup(){
    var pop = document.querySelector(".popup"); // Selecting the first element with the class "popup"
    pop.classList.remove("showpopup"); 
    var btn = document.getElementById("btn");
    var bton = document.getElementById("btn");
    bton.classList.remove("hidebtn");
}
