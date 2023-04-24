if(sessionStorage.getItem("email") != null)
{
    document.getElementById("email").value = sessionStorage.getItem("email");
}

var type = document.getElementById("ticket-type");
var options = document.getElementById("options");
var normal = document.getElementById("nc");
var business = document.getElementById("bc");
type.addEventListener("click", () => {
    if(options.style.opacity == "1")
    {
        //options.style.display = "none";
        options.style.opacity = "0";
        options.style.pointerEvents = "none";
        options.style.transform = "translateY(-20px)";
        //type.removeAttribute("style");
        type.style.borderBottomWidth = "2px";
        type.style.borderRadius = "14px";
    }
    else{
        //options.style.display = "block";
        options.style.opacity = "1";
        options.style.pointerEvents = "auto";
        options.style.transform = "translateY(0px)";
        type.style.borderBottomWidth = "1px";
        type.style.borderRadius = "14px 14px 0px 0px";
    }
    // if(document.getElementById("options").style.display == "block")
    // {
    //     type.style.borderBottomWidth = "1px";
    //     type.style.borderRadius = "14px 14px 0px 0px";
    // }
    // else{
    //     type.removeAttribute("style");
    // }
})

function hideOptions()
{
    options.style.opacity = "0";
    options.style.pointerEvents = "none";
    options.style.transform = "translateY(-20px)";
    type.style.borderBottomWidth = "2px";
    type.style.borderRadius = "14px";
}

function getPriceOfCruise()
{
    let isItOk = true;
    fetch("https://localhost:7043/api/Reservation/GetPrice", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            firstName: "s",
            lastName: "s",
            email: "s",
            PIN: "s",
            nationality: "s",
            phone: "s",
            ticketClass: type.innerText,
            cruiseId: document.getElementById("cruise-id").value
        })
    }).then(r=>{
        if(r["status"] != 200)
        {
            isItOk = false;
        }
        return r.text();
    }).then(r=>{
        if(isItOk)
        {
            document.getElementById("price").value = r + "$";
        }
        else{
            alert("Cruise id has to be filled");
        }
    })
}

//change chosen ticket class and price based on the class
normal.addEventListener("click", ()=>{
    type.innerText = "Normal class";
    hideOptions();
    getPriceOfCruise();
})

//change chosen ticket class and price based on the class
business.addEventListener("click", () =>{
    type.innerText = "Business class";
    hideOptions();
    getPriceOfCruise();
})


//make a reservation by clicking the button
document.getElementById("submit-btn").addEventListener("click", ()=>{
    let fname = document.getElementById("fname");
    let lname = document.getElementById("lname");
    let email = document.getElementById("email");
    let phone = document.getElementById("phone");
    let pin = document.getElementById("PIN");
    let nationality = document.getElementById("nationality");
    let cid = document.getElementById("cruise-id");
    if(fname.value != "" && lname.value != "" && email.value != "" && phone.value != "" && pin.value != "" && nationality.value != "" && cid.value != "" && document.getElementById("price").value != "")
    {
        fetch("https://localhost:7043/api/Reservation", {
            method: "POST",
            headers: {"Content-type": "application/json"},
            body: JSON.stringify({
                firstName: fname.value,
                lastName: lname.value,
                email: email.value,
                PIN: pin.value,
                nationality: nationality.value,
                phone: phone.value,
                ticketClass: type.innerText,
                cruiseId: cid.value
            })
        }).then(r=>{
            if(r["status"] == 200)
            {
                alert("Successfully booked a cruise!");
            }
            else{ alert("Something went wrong. Perhaps you left a field unfilled or there are no remaining tickets."); }
        })
    }
})