if(sessionStorage.getItem("email") == null)
{
    window.location.href = "UsersView.html";
}

// create all the cruises dynamically
const createCruises = (data) =>{
    console.log("in create cruises");
    for(i = 0; i < data.length; i++){
        let cruise = document.createElement("div");
        cruise.classList.add("details-container");
        cruise.style.borderWidth = "2px";
        cruise.innerHTML = `<div class="flex-row-container cruises-separation">
        <details-id-string class="add-border-between-sections">${data[i]["cruiseID"]}</details-id-string>
        <p class="no-details-info cruise-name add-border-between-sections">${data[i]["cruiseName"]}</p>
        <details-id-string class="add-border-between-sections" style="width: 20%;">in more details -></details-id-string>
        <button id="${"show-details" + i.toString()}" class="details-button no-details-info active-details-button">Details</button>
    </div>
    <div id="${"details" + i.toString()}" class="more-details" style="display: none;">
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">From</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">${data[i]["setOffLocation"]}</p>
        </div>
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">To</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">${data[i]["arriveLocation"]}</p>
        </div>
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">Set off time</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">${data[i]["setOffTime"]}</p>
        </div>
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">Time of arrival</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">${data[i]["arriveTime"]}</p>
        </div>
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">Captain name</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">${data[i]["captainName"]}</p>
        </div>
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">Normal class</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">Remaining: ${data[i]["normalClassTickets"]} | price: ${data[i]["normalClassPrice"] + "$"}</p>
        </div>
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">Business class</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">Remaining: ${data[i]["businessClassTickets"]} | price: ${data[i]["businessClassPrice"] + "$"}</p>
        </div>
        <div class="flex-row-container">
            <details-id-string class="add-border-between-sections more-details-text">Type</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">Some type idk what this is</p>
        </div>
        <p id="${"cancel-reservation-btn" + i.toString()}" class="cancel-btn">Cancel reservation</p>
    </div>
        `;

        document.getElementById("cruises").appendChild(cruise);
        //console.log(cruise);
        let detailBtn = document.getElementById("show-details" + i.toString());
        let detail = document.getElementById("details" + i.toString());
        console.log(document.getElementById("details" + i.toString()));
        detailBtn.addEventListener("click", () => {
            showMoreDetails(detail);
        });
        document.getElementById("cancel-reservation-btn" + i.toString()).addEventListener("click", ()=>{
            cancelReservation(i.toString());
        });
    };
};



// http GET all request function
const httpRequest = (url) => {
    fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            Email: sessionStorage.getItem("email"),
            Username: "s",
            Password: "s",
            Name: "s",
            LastName: "s",
            PhoneNumber: "s",
            PIN: "s",
            Adress: "s",
            isAdmin: false
        })
    }).then(response => {
        return response.json();
    }).then(responseData =>{
        createCruises(responseData);
    })
};



var lastDetailsButton = "";

//hide modal windows with more details
function hideMoreDetails(details){
    if(details.style.display == "block"){
        details.style.display = "none";
        modalBackground.style.opacity = "0";
        modalBackground.style.pointerEvents = "none";
    }
}

//show modal windows with more details
function showMoreDetails(details){
    if(details.style.display == "none"){
        details.style.display = "block";
        modalBackground.style.opacity = "0.7";
        modalBackground.style.pointerEvents = "auto";
        modalBackground.addEventListener("click", () => {
            hideMoreDetails(details)});
    }
}


httpRequest("https://localhost:7043/api/Reservation/GetReservations");
//createCruises(data);


var cruiseWindows = document.querySelectorAll(".details-container");
const modalBackground = document.getElementById("modal-background");

function cancelReservation(id)
{
    fetch("https://localhost:7043/api/Reservation/CancelReservation?id=" + id, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            Email: sessionStorage.getItem("email")
        })
    }).then(r=>{
        if(r["status"] == 200)
        {
            alert("Successfully canceled the cruise!")
        }
        else{ alert("Something went wrong)") }
    })
}