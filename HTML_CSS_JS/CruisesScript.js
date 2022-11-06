function showOrHide(){
    let details = document.getElementById("details1");
    if(details.style.display == "block"){
        details.style.display = "none";
    }
    else{
        details.style.display = "block";
    }
}

const detailsbtn = document.getElementById("details")
detailsbtn.addEventListener("click", showOrHide);