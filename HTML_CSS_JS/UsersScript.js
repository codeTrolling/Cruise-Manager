// redirect if user has already signed in
if(sessionStorage.getItem("email") != null){ window.location.href = "MyReservationsView.html"; }

let formState = "sign in";
const signInBtn = document.getElementById("signin");
const signUpBtn = document.getElementById("signup");
let signIn = document.getElementById("form");
let signUp = document.getElementById("sign-up-form");
const resetPass = document.getElementById("reset-pass");
const borders = document.getElementById("input-borders");
const background = document.getElementById("background-img");
 
//Switch between sign in and sign up
function switchBtwnLogins(moveTime, moveDistance, btnToRmv, btnToAdd, color, resDelay, resOpacity, borderTime, borderWidth){
    signIn.style.transition = moveTime;
    signIn.style.transform = moveDistance;
    signUp.style.transition = moveTime;
    signUp.style.transform = moveDistance;
    
    btnToRmv.removeAttribute("style");
    btnToAdd.style.backgroundColor = color;
    if(resOpacity == "1")
    {
        resetPass.style.pointerEvents = "auto";
        resetPass.style.userSelect = "auto";
    }
    else
    {
        resetPass.style.pointerEvents = "none";
        resetPass.style.userSelect = "none"
    }
    resetPass.style.transition = "0.2s";
    resetPass.style.transitionDelay = resDelay;
    resetPass.style.opacity = resOpacity;
    borders.style.transition = borderTime;
    borders.style.height = borderWidth;
}

function focusForm(backgroundTime, backgroundBlur, formBackgroundTime, formBackgroundColor){
    background.style.transition = backgroundTime;
    background.style.filter = backgroundBlur;
    borders.style.transition = formBackgroundTime;
    borders.style.backgroundColor = formBackgroundColor;
}

signInBtn.addEventListener("click", (event) => {switchBtwnLogins("0.5s ease-in-out", "translateX(0px)", signUpBtn, signInBtn, "rgb(0, 170, 255)", "0.3s", "1", "0.4s linear", "220px")})
signUpBtn.addEventListener("click", (event) => {switchBtwnLogins("0.5s ease-in-out", "translateX(-484px)", signInBtn, signUpBtn, "rgb(0, 170, 255)", "0s", "0", "0.4s linear", "510px")})

let inputs = document.querySelectorAll("input");

inputs.forEach(element => {
    element.addEventListener("focusin", (event) => focusForm("0.3s linear", "blur(5px)", "background-color 0.5s linear", "rgba(255, 248, 240, 1)"));
})

inputs.forEach(element => {
    element.addEventListener("focusout", (event) => focusForm("0.3s linear", "blur(0px)", "background-color 0.5s linear", "rgba(255, 248, 240, 0"));
})

const signInSubmitBtn = document.getElementById("isubmit-btn");
const signUpSubmitBtn = document.getElementById("usubmit-btn");

signInSubmitBtn.addEventListener("click", () =>{
    let email = document.getElementById("iuname");
    let pass = document.getElementById("ipass");
    let statusCheck;
    if(email.value != "" && pass.value != "")
    {
        fetch("https://localhost:7043/api/User/signin", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                Username: email.value,
                Email: email.value,
                Password: pass.value
            })
        }).then(r=>{
            statusCheck = true;
            if(r["status"] != 200)
            {
                alert("Wrong credentials");
                statusCheck = false;
            }
            return r.text();
        }).then(r=>{
            if(statusCheck)
            {
                sessionStorage.setItem("email", r);
                window.location.href = "MyReservationsView.html";
            }
        })
    }
}) //add cookie or sth idk but do something with it

signUpSubmitBtn.addEventListener("click", () =>{
    let username = document.getElementById("uuname");
    let password = document.getElementById("upass");
    let email = document.getElementById("uemail");
    let firstName = document.getElementById("ufname");
    let lastName = document.getElementById("ulname");
    let pin = document.getElementById("uPIN");
    let phone = document.getElementById("uphone");
    let adress = document.getElementById("uadress");
    if(username.value != "" && password.value != "" && email.value != "" && firstName.value != "" && lastName.value != "" && pin.value != "" && phone.value != "" && adress.value != "")
    {
        fetch("https://localhost:7043/api/User", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                Username: username.value,
                Password: password.value,
                Email: email.value,
                Name: firstName.value,
                LastName: lastName.value,
                PIN: pin.value,
                PhoneNumber: phone.value,
                Adress: adress.value
            })
        }).then(response =>{
            if(response["status"] == 200)
            {
                alert("Successfully entered the database. Welcome aboard!")
                sessionStorage.setItem("email", email.value);
                window.location.href = "MyReservationsView.html";
            }
            else
            {
                alert("Something went wrong.")
            }
        })
    }
    else{ alert("All fields must be filled in!"); }
})