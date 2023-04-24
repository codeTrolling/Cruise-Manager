const formContainer = document.getElementById("form-container");
const formSlider = document.getElementById("form-slider");
const addMethod = document.getElementById("add-method-btn");
const editMethod = document.getElementById("edit-method-btn");
const deleteMethod = document.getElementById("delete-method-btn")
const addSubmitBtn = document.getElementById("add-submit-btn");
const editSubmitBtn = document.getElementById("edit-submit-btn");
const deleteSubmitBtn = document.getElementById("delete-submit-btn");

function changeBetweenMethods(containerHeight, sliderPos)
{
    formContainer.style.height = containerHeight;
    formSlider.style.transform = "translateY(" + sliderPos + ")";
}

addMethod.addEventListener("click", () =>{
    addMethod.style.background = "rgb(0, 170, 255)";
    editMethod.removeAttribute("style");
    deleteMethod.removeAttribute("style");
    changeBetweenMethods("600px", "0");
})

addSubmitBtn.addEventListener("click", (event) =>{
    let name = document.getElementById("name");
    let setOffLoc = document.getElementById("set-off-location");
    let arriveLoc = document.getElementById("arrive-location");
    let setOffT = document.getElementById("set-off-time");
    let arriveT = document.getElementById("arrive-time");
    let capName = document.getElementById("captain-name");
    let normalTickets = document.getElementById("normal-class-tickets");
    let businessTickets = document.getElementById("business-class-tickets");
    let normalPrice = document.getElementById("normal-class-price");
    let businessPrice = document.getElementById("business-class-price");
    if(name.value != "" && setOffLoc.value != "" && arriveLoc.value != "" && setOffT.value != "" && arriveT.value != "" && capName.value != "" && normalTickets.value != "" && businessTickets.value != "" && normalPrice.value != "" && businessPrice.value != "")
    {
        addCruise(name.value, setOffLoc.value, arriveLoc.value, setOffT.value, arriveT.value, capName.value, normalTickets.value, businessTickets.value, normalPrice.value, businessPrice.value);
    }
    else { alert("Fill in the fields!"); }
})

editMethod.addEventListener("click", () =>{
    editMethod.style.background = "rgb(0, 170, 255)";
    addMethod.removeAttribute("style");
    deleteMethod.removeAttribute("style");
    changeBetweenMethods("660px", "-640px");
})

editSubmitBtn.addEventListener("click", (event) =>{
    let id = document.getElementById("cruise-id");
    let name = document.getElementById("ename");
    let setOffLoc = document.getElementById("eset-off-location");
    let arriveLoc = document.getElementById("earrive-location");
    let setOffT = document.getElementById("eset-off-time");
    let arriveT = document.getElementById("earrive-time");
    let capName = document.getElementById("ecaptain-name");
    let normalTickets = document.getElementById("enormal-class-tickets");
    let businessTickets = document.getElementById("ebusiness-class-tickets");
    let normalPrice = document.getElementById("enormal-class-price");
    let businessPrice = document.getElementById("ebusiness-class-price");
    if(id.value != "" && name.value != "" && setOffLoc.value != "" && arriveLoc.value != "" && setOffT.value != "" && arriveT.value != "" && capName.value != "" && normalTickets.value != "" && businessTickets.value != "" && normalPrice.value != "" && businessPrice.value != "")
    {
        editCruise(id.value, name.value, setOffLoc.value, arriveLoc.value, setOffT.value, arriveT.value, capName.value, normalTickets.value, businessTickets.value, normalPrice.value, businessPrice.value);
    }
    else { alert("Fill in the fields!"); }
})

deleteMethod.addEventListener("click", () =>{
    deleteMethod.style.background = "rgb(0, 170, 255)";
    addMethod.removeAttribute("style");
    editMethod.removeAttribute("style");
    changeBetweenMethods("120px", "-1330px");
})

deleteSubmitBtn.addEventListener("click", (event) =>{
    let id = document.getElementById("delete-cruise-id");
    if(id.value != "")
    {
        deleteCruise(id.value);
    }
    else { alert("Fill in the field!"); }
})

function addCruise(name, setOffLoc, arriveLoc, setOffT, arriveT, capName, normalTickets, businessTickets, normalPrice, businessPrice)
{
    fetch("https://localhost:7043/api/Cruise", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            cruiseName: name,
            setOffLocation: setOffLoc,
            arriveLocation: arriveLoc,
            setOffTime: setOffT,
            arriveTime: arriveT,
            captainName: capName,
            normalClassTickets: parseInt(normalTickets),
            businessClassTickets: parseInt(businessTickets),
            normalClassPrice: parseInt(normalPrice),
            businessClassPrice: parseInt(businessPrice)
        })
    }).then(r => {
        if(r["status"] == 200) { alert("Successfully added a cruise!"); }
        else { alert("Something went wrong: " + r["statusText"]); console.log(r); }
    })
}

function editCruise(id, name, setOffLoc, arriveLoc, setOffT, arriveT, capName, normalTickets, businessTickets, normalPrice, businessPrice)
{
    fetch("https://localhost:7043/api/Cruise", {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            cruiseId: parseInt(id),
            cruiseName: name,
            setOffLocation: setOffLoc,
            arriveLocation: arriveLoc,
            setOffTime: setOffT,
            arriveTime: arriveT,
            captainName: capName,
            normalClassTickets: parseInt(normalTickets),
            businessClassTickets: parseInt(businessTickets),
            normalClassPrice: parseInt(normalPrice),
            businessClassPrice: parseInt(businessPrice)
        })
    }).then(r => {
        if(r["status"] == 200) { alert("Successfully edited a cruise!"); }
        else { alert("Something went wrong: " + r["statusText"]); }
    })
}

function deleteCruise(id)
{
    fetch("https://localhost:7043/api/Cruise/Delete?cruiseID=" + id, {
        method: "DELETE"
    })
    .then(response =>{
        if(response["status"] == 200)
        {
            alert("Successfully deleted the cruise!")
        }
        else{ alert("Something went wrong!"); }
    })
}