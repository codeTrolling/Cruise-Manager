let formState = "sign in";
const signInBtn = document.getElementById("signin");
const signUpBtn = document.getElementById("signup");
let signIn = document.getElementById("form");
let signUp = document.getElementById("sign-up-form");
const resetPass = document.getElementById("reset-pass");
const borders = document.getElementById("input-borders");
const background = document.getElementById("background-img");
 
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

signInBtn.addEventListener("click", (event) => {switchBtwnLogins("0.5s ease-in-out", "translateX(0px)", signUpBtn, signInBtn, "rgb(0, 170, 255)", "0.3s", "1", "0.4s linear", "180px")})
signUpBtn.addEventListener("click", (event) => {switchBtwnLogins("0.5s ease-in-out", "translateX(-484px)", signInBtn, signUpBtn, "rgb(0, 170, 255)", "0s", "0", "0.4s linear", "490px")})

let inputs = document.querySelectorAll("input");

inputs.forEach(element => {
    element.addEventListener("focusin", (event) => focusForm("0.3s linear", "blur(5px)", "background-color 0.5s linear", "rgba(255, 248, 240, 1)"));
})

inputs.forEach(element => {
    element.addEventListener("focusout", (event) => focusForm("0.3s linear", "blur(0px)", "background-color 0.5s linear", "rgba(255, 248, 240, 0"));
})

// inputs.forEach(element => {
//     element.addEventListener("focusin", () => {
//         background.style.transition = "0.1s linear"
//         background.style.filter = "blur(5px)"
//         document.getElementById("input-borders").style.transition = "0.1s linear"
//         document.getElementById("input-borders").style.backgroundColor = "rgb(255, 248, 240)"
//     })
// });
 
// inputs.forEach(element => {
//     element.addEventListener("focusout", () => {
//         background.style.transition = "0.1s linear"
//         background.style.filter = "blur(0px)"
//         document.getElementById("input-borders").style.transition = "0.2s linear"
//         document.getElementById("input-borders").style.backgroundColor = "transparent"
//     })
// });

// signInBtn.addEventListener("click", () =>{
//  if(formState !== "sign in"){
//     signIn.style.transition = "0.5s ease-in-out";
//     signIn.style.transform = "translateX(0px)";
//     signUp.style.transition = "0.5s ease-in-out";
//     signUp.style.transform = "translateX(0px)";

//     signUpBtn.removeAttribute("style");
//     signInBtn.style.backgroundColor = "rgb(0, 170, 255)";
//     resetPass.style.transition = "0.2s";
//     resetPass.style.transitionDelay = "0.3s";
//     resetPass.style.opacity = "1";
//     formState = "sign in";
//  }
// })
 
// signUpBtn.addEventListener("click", () =>{
//     if(formState !== "sign up"){
//         signIn.style.transition = "0.5s ease-in-out";
//         signIn.style.transform = "translateX(-484px)";
//         signUp.style.transition = "0.5s ease-in-out";
//         signUp.style.transform = "translateX(-484px)";

//         signInBtn.removeAttribute("style");
//         signUpBtn.style.backgroundColor = "rgb(0, 170, 255)";
//         resetPass.style.transition = "0.2s";
//         resetPass.style.opacity = "0";
//         formState = "sign up";
//     }
//    })
//TODO: make it so sign up swipes to the left while sign in comes from the right and vice versa