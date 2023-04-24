// create all the cruises dynamically
const createCruises = (data) =>{
    for(i = 0; i < data.length; i++){
        let cruise = document.createElement("div");
        cruise.classList.add("details-container");
        cruise.style.borderWidth = "2px";
        cruise.innerHTML = `<div class="flex-row-container cruises-separation" id="cruise${i.toString()}">
        <details-id-string class="add-border-between-sections ids">${data[i]["cruiseID"]}</details-id-string>
        <p class="no-details-info cruise-name add-border-between-sections company-names">${data[i]["cruiseName"]}</p>
        <details-id-string class="add-border-between-sections prices" style="width: 20%;">${data[i]["normalClassPrice"]}</details-id-string>
        <button id="${"show-details" + i.toString()}" class="details-button no-details-info active-details-button">Details</button>
    </div>
    <div id="${"details" + i.toString()}" class="more-details" style="display: none;">
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">From</details-id-string>
            <p class="no-details-info more-details-text" style="margin-left: 2px;">${data[i]["setOffLocation"]}</p>
        </div>
        <div class="flex-row-container info-separation">
            <details-id-string class="add-border-between-sections more-details-text">To</details-id-string>
            <p class="no-details-info more-details-text tos" style="margin-left: 2px;">${data[i]["arriveLocation"]}</p>
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
            <p class="no-details-info more-details-text cap-names" style="margin-left: 2px;">${data[i]["captainName"]}</p>
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
    };
};



// http GET all request function
const httpGetRequest = (url) => {
    fetch(url).then(response => {
        return response.json();
    }).then(responseData =>{
        createCruises(responseData);
    })
};



var lastDetailsButton = "";
// show or close modal windows with more details about a cruise
// function showOrHide(element){
//     var details = document.getElementById("details1");
//     if(details.style.display == "block"){
//         details.style.display = "none";
//         //document.getElementById("modal-background").style.display = "none";
//         modalBackground.style.opacity = "0";
//         modalBackground.style.pointerEvents = "none";
//         //modalBackground.style.userSelect = "none";
//     }
//     else{
//         details.style.display = "block";
//         //document.getElementById("modal-background").style.display = "block";
//         modalBackground.style.opacity = "0.7";
//         modalBackground.style.pointerEvents = "auto";
//         //modalBackground.style.userSelect = "auto";
//     }
// }

//hide modal windows with more details
function hideMoreDetails(details){
    //var details = document.getElementById(element);
    if(details.style.display == "block"){
        details.style.display = "none";
        //document.getElementById("modal-background").style.display = "none";
        modalBackground.style.opacity = "0";
        modalBackground.style.pointerEvents = "none";
        //modalBackground.style.userSelect = "none";
    }
}

//show modal windows with more details
function showMoreDetails(details){
    //var details = document.getElementById(element)
    if(details.style.display == "none"){
        details.style.display = "block";
        //document.getElementById("modal-background").style.display = "block";
        modalBackground.style.opacity = "0.7";
        modalBackground.style.pointerEvents = "auto";
        //lastDetailsButton = element;
        modalBackground.addEventListener("click", () => {
            hideMoreDetails(details)});
    }
}


httpGetRequest("https://localhost:7043/api/Cruise");
//createCruises(data);


var cruiseWindows = document.querySelectorAll(".details-container");
const modalBackground = document.getElementById("modal-background");



// function changeBoxSize(){
//     if(document.getElementsByClassName("details-container")[0].getAttribute(innerHeight) != document.getElementsByClassName("general-cruise-info")[0].getAttribute(innerHeight) && document.getElementById("details1").style.display == "none"){
//         document.getElementsByClassName("details-container")[0].style.height = document.getElementsByClassName("general-cruise-info")[0].getAttribute(innerHeight);
//         console.log("works");
//     }
//     console.log("in function");
// }

//modalBackground.addEventListener("click", hideMoreDetails);

let filters = document.querySelectorAll(".filters");
var chosenFilter;
var filtersToElementIds = {ID: "ids",
CompanyName: "company-names",
Price: "prices",
ArriveLocation: "tos",
CaptianName: "cap-names"
}
filters.forEach(el =>{
    el.addEventListener("click", ()=>{
        document.getElementById("chosen-filter").innerText = el.innerText;
        chosenFilter = document.querySelectorAll("." + filtersToElementIds[el.innerText]);
        document.getElementById("filters-container").style.display = "none";
    })
})

document.getElementById("chosen-filter").addEventListener("click", ()=>{
    let container = document.getElementById("filters-container")
    if(container.style.display == "none")
    {
        container.style.display = "flex";
    }
    else
    {
        container.style.display = "none";
    }
})

let filterSearch = document.getElementById("filter-search");
filterSearch.addEventListener("input", ()=>{
    console.log(chosenFilter[0]);
    for(i = 0; i < chosenFilter.length; i++)
    {
        if(document.getElementById("chosen-filter").innerText != "Price")
        {
            if(!chosenFilter[i].innerText.includes(filterSearch.value))
            {
                document.getElementById("cruise" + i.toString()).style.display = "none";
            }
            else{
                document.getElementById("cruise" + i.toString()).style.display = "flex";
            }
        }
        else
        {
            if(parseInt(chosenFilter[i].innerText) > parseInt(filterSearch.value))
            {
                document.getElementById("cruise" + i.toString()).style.display = "none";
            }
            else
            {
                document.getElementById("cruise" + i.toString()).style.display = "flex";
            }
        }
    }
})