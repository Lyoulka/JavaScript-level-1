 var images = document.getElementsByTagName('img');
  var numPic = 1;
window.onload = function () {
   var arrowL = document.getElementById('arrowL');
   var arrowR = document.getElementById('arrowR');
   for (var i = 0; i < images.length; i++) {
      images[i].addEventListener('click',changeBigPicture);
  arrowL.addEventListener('click',slideLeft);
  arrowR.addEventListener('click',slideRight);
  }
};
 function changeBigPicture(event) {
  var appDiv = document.getElementById('big_picture');
  console.log(appDiv);
  appDiv.innerHTML = '';
  var eventElement = event.target;
  var imageNamePart = eventElement.id.split('_'); 
  var src = 'img/big/' + imageNamePart[1] + '.jpg';
  console.log(numPic);
   var imageDOMElement = document.createElement('img');
  imageDOMElement.className = "image";
  imageDOMElement.src = src;
  imageDOMElement.onerror = function(){
  alert('При загрузке изображения произошла ошибка!');
  }
  appDiv.appendChild(imageDOMElement);  
}
 function slideLeft(){
   var appDiv = document.getElementById('big_picture');
    appDiv.innerHTML = '';
    if (numPic < 2){numPic = images.length} else {numPic--} 
    var src = 'img/big/' + numPic + '.jpg'; 
    var imageDOMElement = document.createElement('img'); 
    imageDOMElement.className = 'image';
     imageDOMElement.src = src;
    imageDOMElement.onerror = function(){
        alert('При загрузке изображения произошла ошибка!');
    }
    appDiv.appendChild(imageDOMElement);
    console.log(numPic);
}
 function slideRight(){
    var appDiv = document.getElementById('big_picture'); 
      appDiv.innerHTML = '';
      if (numPic >= images.length){numPic = 1} else {numPic++} 
      var src = 'img/big/' + numPic + '.jpg'; 
      var imageDOMElement = document.createElement('img'); 
      imageDOMElement.className = "image";
      imageDOMElement.src = src;
      imageDOMElement.onerror = function(){
         alert("При загрузке изображения произошла ошибка!");
     }
     appDiv.appendChild(imageDOMElement);
     console.log(numPic);
}