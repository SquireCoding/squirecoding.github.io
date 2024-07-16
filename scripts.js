var using = '';
var craften = '';

document.getElementsByClassName('errorButton')[0].style.visibility='hidden';

if (getCookie('username')!=='') {
    console.log('Login info found!');
    passTo(getCookie('username'),getCookie('password'));
} else console.log("Login info not found.");

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
    let username = document.getElementById('user').value;
    let pass = document.getElementById('pass').value;
    passTo(username,pass);
    
}

function passTo(username,pass) {
    using = getName(username,pass);
    if (using!==null) {
        setCookie('username',username,1);
        setCookie('password',pass,1);
        loadBankPage();
    } else {
        document.getElementsByClassName('errorButton')[0].style.visibility='visible';
    }
}

function loadBankPage() {
    document.body.innerHTML=`
    <h1>Welcome, ${using}</h1> 
    <hr>
    <h2>Current Craften in Account: ${getCraften()}
    `;
}

function getName(user, pass) {
    if (user==='YBG_Gaming'&&ecb(pass)==='0101000001100101011000010110001101101000010000100110111101101101011000100110010101110010') {
        return 'YBG';
    }
    if (user='TheCaptain'&&ecb(pass)==='01101111011011100111100101101111011101010111001001101100011001010110011001110100') {
        return 'Cap';
    }
    return null;
}

function getCraften() {
    if (using==='YBG') return "33C";
    return "Error getting craften";
}
function getCards() {
    if (using==='YBG') {
        return `Debit Card`;
    }
}
