function loadDoc(func, url) {
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.onload = function() {
        func(this);
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getEveryentries() {
    
}
