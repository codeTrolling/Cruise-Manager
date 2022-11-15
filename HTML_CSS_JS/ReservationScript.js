let type = document.getElementById("ticket-type");
type.addEventListener("click", () => {
    if(document.getElementById("options").style.display == "block")
    {
        document.getElementById("options").style.display = "none";
    }
    else{
        document.getElementById("options").style.display = "block";
    }
    if(document.getElementById("options").style.display == "block")
    {
        type.style.borderBottomWidth = "1px";
        type.style.borderRadius = "14px 14px 0px 0px";
    }
    else{
        type.removeAttribute("style");
    }
})