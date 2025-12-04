
//For Activity Buttons
    const escapebtn = document.getElementById("escapebtn");
    const minibtn = document.getElementById("minibtn");
    const golfbtn = document.getElementById("golfbtn");

//Get IDs/Variables for form Questions
    const signUpForm = document.getElementById("signUpForm");
    const formTitle = document.getElementById("formTitle");
    const namesInput = document.getElementById("namesInput");
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const ageInput = document.getElementById("ageInput");
    const age = document.getElementById("age");
    const dateOfVisit = document.getElementById("dateOfVisit");
    const groupSize = document.getElementById("groupSize");
    const groupSizeLabel = document.getElementById("groupSizeLabel");
    const groupSizeAll = document.getElementById("groupSizeAll");
    const submission = document.getElementById("submission");

//Variable to track what form is being used
    let formType = localStorage.getItem("formType") || "golfSimulator";

//Lists to Store Signups
    let golfSimulatorSignUps = JSON.parse(localStorage.getItem("golfSimulatorSignUpsList")) || [];
    let escapeRoomSignUps = JSON.parse(localStorage.getItem("escapeRoomSignUpsList")) || [];
    let miniGolfSignUps = JSON.parse(localStorage.getItem("miniGolfSignUpsList")) || [];

//==========================================================================
//-------------------Updates Form Questions when Page Loads-----------------
//==========================================================================
document.addEventListener("DOMContentLoaded", function() {
    updateFormQuestions();

    //======================================================================
    //-----------------Calls Functions to get SignUp values-----------------
    //======================================================================
    signUpForm.addEventListener("submit", (event) => {
        // Stop the page from reloading
        event.preventDefault();
        getValues();
    });
});


//==========================================================================
//-------------------------Activities Page Buttons--------------------------
//------------------Stores signup type and goes to form page----------------
//==========================================================================
    if (escapebtn) {
        escapebtn.addEventListener("click", function() {
            localStorage.setItem("formType", "escapeRoom");
            window.location.href = "form.html";
        });
    }

    if (minibtn) {
        minibtn.addEventListener("click", function() {
            localStorage.setItem("formType", "miniGolf");
            window.location.href = "form.html";
        });
    }

    if (golfbtn) {
        golfbtn.addEventListener("click", function() {
            localStorage.setItem("formType", "golfSimulator");
            window.location.href = "form.html";
        });
    }



//==========================================================================
//----------------------Update Form Questions Function---------------------
//==========================================================================
function updateFormQuestions(){
    groupSize.hidden = true;
    ageInput.hidden = false;
    if (formType == "miniGolf"){
        groupSize.hidden = false;
        ageInput.hidden = true;
        formTitle.textContent = "Mini Golf Reservation"
        groupSizeLabel.textContent = "Enter Group Size 1-10:";
    } else if (formType == "escapeRoom") {
        groupSize.hidden = false;
        ageInput.hidden = true;
        formTitle.textContent = "Escape Room Reservation";
        groupSizeLabel.textContent = "Enter Group Size 2-6:";
    } else {
        formTitle.textContent = "Golf Simulator Reservation";
    }
};


//==========================================================================
//--------------------Function to Get Values from Form ---------------------
//==========================================================================
function getValues(){
    let firstNameValue = firstName.value;
    let lastNameValue = lastName.value;
    let dateValue = dateOfVisit.value;
    let groupSizeValue = groupSizeAll.value;
    let ageValue = age.value;
    let tempSignUp = [];
    let submissionConfirmation = "Thank you "+firstNameValue+" "+lastNameValue+". We look forward to seeing you on "+dateValue+".";
    tempSignUp.push(firstNameValue);
    tempSignUp.push(lastNameValue);
    if (formType == "golfSimulator"){
        tempSignUp.push(ageValue);
        tempSignUp.push(dateValue);
        golfSimulatorSignUps.push(tempSignUp);
        localStorage.setItem("golfSimulatorSignUpsList", JSON.stringify(golfSimulatorSignUps));
        submission.textContent = submissionConfirmation;
    } else if (formType == "escapeRoom"){
        tempSignUp.push(groupSizeValue);
        tempSignUp.push(dateValue);
        escapeRoomSignUps.push(tempSignUp);
        localStorage.setItem("escapeRoomSignUpsList", JSON.stringify(escapeRoomSignUps));
        submission.textContent = submissionConfirmation;
    } else if (formType == "miniGolf"){
        tempSignUp.push(groupSizeValue);
        tempSignUp.push(dateValue);
        miniGolfSignUps.push(tempSignUp);
        localStorage.setItem("miniGolfSignUpsList", JSON.stringify(miniGolfSignUps));
        submission.textContent = submissionConfirmation;
    }
};