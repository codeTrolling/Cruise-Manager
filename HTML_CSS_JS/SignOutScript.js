let btn = document.getElementById("sign-out");
btn.addEventListener("click", ()=>{
    if(sessionStorage.getItem("email") == null)
    {
        alert("You are not signed in already.");
    }
    else
    {
        sessionStorage.removeItem("email");
        alert("Signed out")
    }
})