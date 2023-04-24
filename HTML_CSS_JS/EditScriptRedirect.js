if(sessionStorage.getItem("email") == null)
{
    window.location.href = "UsersView.html";
}
fetch("https://localhost:7043/api/User/Authorization", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
        Username: "s",
        Email: sessionStorage.getItem("email"),
        Password: "s",
        Name: "s",
        LastName: "s",
        PIN: "S",
        PhoneNumber: "3",
        Adress: "s",
        isAdmin: false
    })
}).then(r=>{
    if(r["status"] != 200)
    {
        document.querySelector("body").innerHTML = "Access is not granted. User is not authenticated. This page is meant to be used only by people with special permission!"
        
    }
})