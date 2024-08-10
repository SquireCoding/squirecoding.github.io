var using = '';
var craften = '';
var tscore = 0;
var business = false;
var modified = 0;
var transferPerson = 'YBG';

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
    tscore = getTScore();
    modified=0;
    document.body.innerHTML=`
    <h1> Welcome, ${using}</h1> <div class="topcorner" class="logout"><button class="btn" onclick="logout()">Log Out</button></div>
    <hr>
    <h2> Current T Score (Last Updated 8/8/2024): ${tscore}</h2>
    <br>
    <h2 id="craftenCount"> Current Craften in Account: ${getCraften()}</h2>
    <br>
    <h2> Cards: ${getCards()}</h2>
    <br>
    <button class="wider" onclick="loadTransferPage()">Request Craften Transfer</button>
    `;
    if (getPurchases()!=null) {
        document.body.innerHTML+='<br><h2 class="good">Account History:</h2><br><h3> - Transaction benefactor; Amount; Balance After Transaction</h3>'
        let purs = getPurchases();
        let actions = [''];
        for (let i = 0; i<purs.length; i++) {
            if (purs[i].dep) modified+=purs[i].getValue(); else modified-=purs[i].getValue();
            actions.push(purs[i].getHtmlRep(modified));
        }
        actions.reverse();
        for (let i = 0; i<purs.length; i++) {
            document.body.innerHTML+=actions[i];
        }
        document.getElementById('craftenCount').innerHTML=` Current Craften in Account: ${modified}`;
    } else {
        document.body.innerHTML+='<br><h3 class="green">You have no recorded purchases.</h3>'
    }
}

function logout() {
    setCookie('username','',0);
    setCookie('password','',0);
    location.reload();
}

function getName(user, pass) {
    if (user==='YBG_Gaming'&&ecb(pass)==='0101000001100101011000010110001101101000010000100110111101101101011000100110010101110010') {
        return 'YBG';
    }
    if (user==='TheCaptain'&&ecb(pass)==='01101111011011100111100101101111011101010111001001101100011001010110011001110100') {
        return 'Cap';
    }
    if (user==='[E]'&&ecb(pass)==='011001100110110001111001011000100111010101110100011101000110010101110010') {
        return '[E]';
    }
    if (user==='EvilFellow'&&ecb(pass)==='01100011011100100110100101101101011010010110111001100001011011000110110001111001') {
        return 'Bad Guy';
    }
    if (user==='unicorns!'&&ecb(pass)==='011010010110110001101111011101100110010101110100011010000110010101101101') {
        return 'SparklePony';
    }
    if (user==='reallySquire'&&ecb(pass)==='0100110001101111011001110110100101101110') {
        return 'Squire';
    }
    if (user==='threeD'&&ecb(pass)==='0110110101101111011100100111010001101001011011010110010101110010011101000111001001101001') {
        return 'MortalTripod';
    }
    if (user==='veryspeedy'&&ecb(pass)==='011000100110010101101011011010110110000101101000') {
        return 'SpeedyBek';
    }
    if (user==='Deatheye'&&ecb(pass)==='01110100011010000110010101100010011011110111001101110011') {
        return 'Deatheye';
    }
    if (user==='smarty'&&ecb(pass)==='011010110111001001101001011100110111000001111001') {
        return 'SMARTS';
    }
    if (user==='Carrie'&&ecb(pass)==='01100101011011100110011101101100011000010110111001100100') {
        return 'Carrie';
    }

    return null;
}
function getTScore() {
    if (using==='YBG') return 16;
    if (using==='Cap') return 5;
    if (using==='Carrie') return 12;
    if (using==='SMARTS') return 12;
    if (using==='[E]') return 5;
    if (using==='Bad Guy') return 9;
    if (using==='Deatheye') return 10;
    if (using==='MortalTripod') return 11;
    if (using==='SpeedyBek') return 10;
    if (using==='SparklePony') return 17;
    if (using==='Squire') return 21;
    return "Error getting T score";
}
function getCraften() {
    if (using==='YBG') return "83";
    if (using==='Cap') return "1";
    if (using==='Carrie') return "15";
    if (using==='SMARTS') return "33";
    if (using==='[E]') return "12";
    if (using==='Bad Guy') return "You do not have an account.";
    if (using==='Deatheye') return "You do not have an account.";
    if (using==='MortalTripod') return "123";
    if (using==='SpeedyBek') return "11";
    if (using==='SparklePony') return "231";
    if (using==='Cookies by Candlelight - Business') return '5';
    if (using==='The Golden Silohoutte - Business') return '0';
    return "Error getting craften";
}

function getStartingCraften() {
    if (using==='YBG') return 83;
    if (using==='Cap') return 1;
    if (using==='Carrie') return 15;
    if (using==='SMARTS') return 33;
    if (using==='[E]') return 12;
    if (using==='Bad Guy') return 0;
    if (using==='Deatheye') return 0;
    if (using==='MortalTripod') return 123;
    if (using==='SpeedyBek') return 11;
    if (using==='SparklePony') return 231;
    return "Error getting craften";
}
function getHashPass() {
    if (using==='YBG') return "0101000001100101011000010110001101101000010000100110111101101101011000100110010101110010";
    if (using==='Cap') return "01101111011011100111100101101111011101010111001001101100011001010110011001110100";
    if (using==='Carrie') return "01100101011011100110011101101100011000010110111001100100";
    if (using==='SMARTS') return "011010110111001001101001011100110111000001111001";
    if (using==='[E]') return "011001100110110001111001011000100111010101110100011101000110010101110010";
    if (using==='Bad Guy') return "01100011011100100110100101101101011010010110111001100001011011000110110001111001";
    if (using==='Deatheye') return "01110100011010000110010101100010011011110111001101110011";
    if (using==='MortalTripod') return "0110110101101111011100100111010001101001011011010110010101110010011101000111001001101001";
    if (using==='SpeedyBek') return "011000100110010101101011011010110110000101101000";
    if (using==='SparklePony') return "011010010110110001101111011101100110010101110100011010000110010101101101";
    if (using==='Squire') return "Cheater."
    return "Error getting security code.";
}

function getCards() {
    let returned = '';

    if (using==='YBG') returned= getCardItem("Normal Debit Card",'Active')+getCardItem("Normal Credit Card",'Active');
    if (using==='Cap') returned= "- You have no active cards.";
    if (using==='Carrie') returned= "- You have no active cards.";
    if (using==='SMARTS') returned= "- You have no active cards.";
    if (using==='[E]') returned= "- You have no active cards.";
    if (using==='Bad Guy') returned= "You do not have an account.";
    if (using==='Deatheye') returned= "You do not have an account.";
    if (using==='MortalTripod') returned= getCardItem("Normal Debit Card",'Active');
    if (using==='SpeedyBek') returned= "- You have no active cards.";
    if (using==='SparklePony') returned= getCardItem("Normal Debit Card",'Active')+getCardItem("Business Debit Card",'Active');
    if (using==='Squire') returned= getCardItem("Normal Debit Card",'Active');
    if (returned!=="You do not have an account.") {
        returned+='<br> - <a class="green" onclick="loadNewCards()">Order New Cards</a>';
    }
    return returned;
}

function getCardItem(name,active) {
    return `<br> - ${name} - ${active}     -   ${getCancelButton(name,using)}`;
}

function getCancelButton(card, name) {
    return `<a class='red' href="mailto:fillthisin?subject=Cancel Card, ${name}, ${card}&body=This is an automated request to email Squire to inform him to cancel ${card}. Please fill out his email address and send this.">Cancel "${card}"</a>`;
}

function getEmailLink(subject, body) {
    return `mailto:fillthisin?subject=${subject}&body=${body}, authentication code=${getHashPass()}`;
}

function getCardButton(cardname) {
    return `<a href="${getEmailLink('Requesting New Card, '+using+', '+removeAfterBrTag(cardname)+'','This is an automated request for a '+removeAfterBrTag(cardname)+'')}"><button class="wider">${cardname}</button></a>`;
}

function getPersonButton(cardname) {
    return `<a href="${getEmailLink('Craften transfer request: '+using+ ' to ' + cardname, 'This a request for a transfer of AMOUNTHERE.')}"><button class="wider">${cardname}</button></a>`;
}

function getCardFailButton(cardname) {
    return `<a><button class="widerred">Insufficient T Score - ${cardname}</button></a>`;
}

function removeAfterBrTag(inputString) {
    const brIndex = inputString.indexOf('<br>');
    if (brIndex !== -1) {
        return inputString.substring(0, brIndex);
    }
    return inputString;
}

function getPurchases() {
    if (using==='YBG') return [new Purchase(-getStartingCraften(), 'Starting Balance'), new Purchase(50,'SQTech Mail Order'),new Purchase(-58,'In Person Deposit')];
    if (using==='Cap') return null;
    if (using==='Carrie') return null;
    if (using==='SMARTS') return null;
    if (using==='[E]') return null;
    if (using==='Bad Guy') return null;
    if (using==='Deatheye') return null;
    if (using==='MortalTripod') return null;
    if (using==='SpeedyBek') return null;
    if (using==='SparklePony') return [new Purchase(-231, 'Starting Balance'), new Purchase(128, 'SQTech Mail Order'), new Purchase(-10,'SQTech Inc'),new Purchase(-20,'SQTech Inc'),new Purchase(5,'SQTech Inc'),new Purchase(5,'TRANSFER TO "Cookies by Candlelight"')];
    if (using==='Squire') return "Cheater."
    return "Error getting security code.";
}

function loadTransferPage() {
    let finito = `<h1>Select account, then fill out amount in email.</h1> <div class="topcorner" class="logout"><button class="btn" onclick="loadBankPage()">Back</button></div>
    <hr>`;

    let accs = ["YBG",'Cap',"Carrie","SMARTS",'[E]','MortalTripod','SpeedyBek',"SparklePony",'Squire','The Golden Silhouette - Business','Cookies by Candlelight - Business'];


    for (let i = 0; i<accs.length; i++) {
        if (using==='YBG') transferPerson = 'Cap';
        if (accs[i]!==using) {
            let normcred = getPersonButton(accs[i]);
            finito+='<br><br>'+normcred;
        }
    }
    //finito+=`<br><br><h2 id="person">Person to transfer to: ${transferPerson}.</h3><br>`;
    document.body.innerHTML=finito;
}

function getTransferAmount() {
    return document.getElementById('quantity').innerHTML;
}

function loadNewCards() {
    let normdeb = getCardButton('Normal Debit Card');
    if (tscore<4) {
        normdeb = getCardFailButton('Normal Debit Card');
    }
    
    let finito = `<h1> Select New Cards, ${using} (T Score: ${tscore})</h1> <div class="topcorner" class="logout"><button class="btn" onclick="loadBankPage()">Back</button></div>
    <hr>
    ${normdeb}`;

    let cards = ["Renter's Card",'Normal Business Debit',"Miner's Card","Girl's Card",'Normal Credit Card','Universal Card','Normal Business Credit',"Good Boy's Card",'Golden Credit','Golden Business Credit'];
    let scores = [9,10,11,13,13,15,15,16,18,20];

    for (let i = 0; i<cards.length; i++) {
        let normcred = getCardButton(cards[i]+'<br>(Requires a T score of '+scores[i]+')');
        if (tscore<scores[i]) {
            normcred = getCardFailButton(cards[i]+'<br>(Requires a T score of '+scores[i]+')');
        }
        finito+='<br><br>'+normcred;
    }
    document.body.innerHTML=finito;
}

class Purchase {
    
    constructor(value, party) {
        this.party=party;
        this.value=value;
        if (value<=0) {
            this.value=Math.abs(this.value);
            this.dep = true;
        } else this.dep=false;
    }
    getHtmlRep(amount) {
        if (this.dep) {
            return `<h3 class="good">- ${this.party}; +${this.value}; ${amount} Remaining</h3>`;
        } else return `<h3 class="bad">- ${this.party}; -${this.value}; ${amount} Remaining</h3>`;
    }

    getValue() {
        return this.value;
    }

}
