current = story[0];
setans();

function setans() {
	var leng = 0;
    document.getElementById("text").innerHTML = current.text;
    document.getElementById("answers").innerHTML = '';
    for (var l in current.answer) {
    	leng++;
    }
    for (var i = 1; i <= leng; i++) {
        document.getElementById("answers").innerHTML += "<div onclick='current = story["+current.jump[i]+"]; setans();'>"+current.answer[i]+"</div>";
    }
}