function ecb(inputString) {
    const binaryArray = [];
    for (let i = 0; i < inputString.length; i++) {
        const charCode = inputString.charCodeAt(i);
        const binaryChar = charCode.toString(2).padStart(8, '0');
        binaryArray.push(binaryChar);
    }
    return binaryArray.join('');
}

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function run() {
    let ec = ecb('PeachBomber');
    document.getElementById('part').innerHTML=ec;

}

function processData() {
    let user = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    console.log(user+', '+pass);
}
