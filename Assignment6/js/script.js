document.addEventListener("DOMContentLoaded",function(){
    document.querySelector('form').addEventListener("submit",(e)=>{
        e.preventDefault();
        let validform = false;
        let validName = false;
        let validEmail = false;
        let validVisit = false;
        let findVisit = false;
        let validSelect = false;
        let validDate = false;
        var fullname = document.querySelector('input[name="fname"]')

        var email = document.querySelector('input[name="email"]') 

        var firsttime = document.getElementById("yes");
        var notfirsttime = document.getElementById("no");

        var yes1Checkbox = document.getElementById("yes1");
        var yes2Checkbox = document.getElementById("yes2");
        var noCheckbox = document.getElementById("No");  

        var foundSelect = document.getElementById("page");

        var dateInput = document.getElementById('date');
        var reason = document.getElementById('textarea');

// warnings        

        var fullnameWarning = document.querySelector('.fullnamebox .warning');
        var emailWarning = document.querySelector('.emailbox .warning');
        var vistWarning = document.querySelector('.radiobox .warning');
        var findWarning = document.querySelector('.checkbox .warning');
        var howfindWarning = document.querySelector('.dropdownbox .warning');
        var dateWarning = document.querySelector('.datebox .warning');
        var formWarning = document.querySelector('.form-warning');
    
// name validation
        if(fullname.value.trim()===""){
            fullnameWarning.textContent="Please enter your name";
            fullnameWarning.style.display="block";
        }
        else{
            fullnameWarning.textContent = "";
            fullnameWarning.style.display = "none";
            validName=true;
        }
 // email validation
        
        if (email.value.trim() === "") {
            // If empty, display the warning message
            emailWarning.textContent = "Please enter your email address.";
            emailWarning.style.display = "block";

        } else if (!isValidEmail(email.value)) {
            // If invalid, display the warning message
            emailWarning.textContent = "Please enter a valid email address.";
            emailWarning.style.display = "block";

        } else {
            // If valid, clear the warning message and proceed with form submission
            emailWarning.textContent = "";
            emailWarning.style.display = "none";
            validEmail=true;

        }
// is visted first time or not
        if(firsttime.checked || notfirsttime.checked){
            vistWarning.textContent = "";
            vistWarning.style.display = "none";
            validVisit = true;
        }
        else{
            vistWarning.textContent = "Please select your answer";
            vistWarning.style.display = "block";
        }


// found anything

        if(yes1Checkbox.checked || yes2Checkbox.checked || noCheckbox.checked){
            findWarning.textContent = "";
            findWarning.style.display = "none";
            findVisit = true
        }
        else{
            findWarning.textContent = "Please select your answer";
            findWarning.style.display ="block"
        }

// how found
        if(foundSelect.value === ""){
            howfindWarning.textContent = "Please select your answer";
            howfindWarning.style.display="block";
        }
        else{
            howfindWarning.textContent = "";
            howfindWarning.style.display="none";
            validSelect=true
        }
//Date validation
        if (!dateInput.value) {
            dateWarning.textContent = "Please select a date";
            dateWarning.style.display = "block";
        } else {
            dateWarning.textContent = "";
            dateWarning.style.display = "none";
            validDate=true;
        }

        validform = validName && validEmail && validVisit && findVisit && validSelect && validDate
        if(validform){
            alert("Your details have been successfully stored in the local storage.Reload page to view");
            formWarning.style.display = "none"

            localStorage.setItem("fullName", fullname.value);
            localStorage.setItem("email",email.value);
            localStorage.setItem("firsttime",firsttime.checked);
            localStorage.setItem("notfirsttime",notfirsttime.checked);
            localStorage.setItem("yes1Checkbox",yes1Checkbox.checked);
            localStorage.setItem("yes2Checkbox",yes2Checkbox.checked);
            localStorage.setItem("noCheckbox",noCheckbox.checked);
            localStorage.setItem("foundSelect",foundSelect.value);
            localStorage.setItem("dateInput",dateInput.value);
            localStorage.setItem("reason",reason.value);


            fullname.value = ""
            email.value = ""
            firsttime.checked = false
            notfirsttime.checked = false
            yes1Checkbox.checked = false
            yes2Checkbox.checked = false
            noCheckbox.checked = false
            foundSelect.value = ""
            dateInput.value = ""
            reason.value = ""
        }
        else{
            formWarning.style.display="block";
        }
        

    })
})

function isValidEmail(email) {
    // Regular expression for email validation
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
function clearLocalStorage() {
    alert("localStorage has been cleared! Reload page");
    localStorage.clear();
    
}

document.addEventListener("DOMContentLoaded",function(){

    // accessing the localstorage
    var storedfullname = localStorage.getItem('fullName');
    var storedemail = localStorage.getItem('email');
    var storedfirsttime = localStorage.getItem('firsttime') === 'true';
    var storednotfirsttime = localStorage.getItem('notfirsttime') === 'true';
    var storedyes1Checkbox = localStorage.getItem('yes1Checkbox') === 'true';
    var storedyes2Checkbox = localStorage.getItem('yes2Checkbox') === 'true';
    var storednoCheckbox = localStorage.getItem('noCheckbox') === 'true';
    var storedfoundSelect = localStorage.getItem('foundSelect');
    var storeddateInput = localStorage.getItem('dateInput');
    var storedreason = localStorage.getItem('reason');
// accesssing

    document.querySelector('input[name="fname"]').value = storedfullname || '';
    document.querySelector('input[name="email"]').value = storedemail || '';
    document.getElementById("yes").checked = storedfirsttime;
    document.getElementById("no").checked=storednotfirsttime;
    document.getElementById("yes1").checked= storedyes1Checkbox;
    document.getElementById("yes2").checked= storedyes2Checkbox;
    document.getElementById("No").checked= storednoCheckbox;   
    document.getElementById("page").value = storedfoundSelect || '';
    document.getElementById('date').value=storeddateInput || '';
    document.getElementById('textarea').value = storedreason || '';
})