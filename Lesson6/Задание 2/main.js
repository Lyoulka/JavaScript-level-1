var totalCost;
window.onload = function(){
    var buttons = document.getElementsByClassName("button");
    var len = buttons.length;
    for (var i=0; i<len;i++){
    buttons[i].addEventListener("click",addToBox);
   
    }
}
var addToBox = function(event){
    if (totalCost == undefined){totalCost = 0}
    var addBox = document.createElement("div"),
    eventElement = event.target,
    namePart = eventElement.id.split("_"),
    box = document.getElementById("boxID");
    var nameProduct = document.getElementById("name_" + namePart[1]),
    priceProduct = document.getElementById("price_" + namePart[1]);
    var productCost = parseInt(priceProduct.innerHTML);
    totalCost += productCost;
    addBox.appendChild(nameProduct.cloneNode(true));
    addBox.appendChild(priceProduct.cloneNode(true));
    var total = document.createElement("div");
    total.innerHTML = "<p>Итого: " + totalCost + "</p>";
    addBox.appendChild(total);
    box.appendChild(addBox);
}