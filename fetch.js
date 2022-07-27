// FUNCTION //////////////////////////////////////////
const getParking = async function () {
    let response = await fetch('https://data.strasbourg.eu/api/records/1.0/search/?dataset=occupation-parkings-temps-reel&q=&facet=etat_descriptif');
    let data = await response.json();
    console.log(data);
    // console.log(data.records[0].fields.nom_parking);
    let body = document.body;
    document.body.innerHTML = "";

    br = document.createElement('div');
    br.classList.add("brDiv");
    tblHeader = document.createElement('table');
    tblHeader.classList.add("TableHeader");
    tr = tblHeader.insertRow();
    td = tr.insertCell();
    td.appendChild(document.createTextNode("Nom du parking"));
    td = tr.insertCell();
    td.appendChild(document.createTextNode("Nbr de place"));
    td = tr.insertCell();
    td.appendChild(document.createTextNode("Status"));
    body.appendChild(tblHeader);

    let tbl = document.createElement('table');
    // tbl.style.width = "960px";
    let img;
    // console.log(data.records.length);

    for (let i = 0; i < data.records.length; i++) {
        let tr = tbl.insertRow();
        td = tr.insertCell();
        td.appendChild(document.createTextNode(data.records[i].fields.nom_parking));
        td = tr.insertCell();
        td.appendChild(document.createTextNode(data.records[i].fields.libre));
        if (data.records[i].fields.libre <= 30) {
            td.classList.add("txtRouge");
        }
        td = tr.insertCell();
        td.appendChild(document.createTextNode(data.records[i].fields.etat_descriptif));
        img = document.createElement('div');
        if (data.records[i].fields.etat_descriptif == "Ouvert") {
            img.classList.add("pastilleVerte");
        } else if (data.records[i].fields.etat_descriptif == "Fermé") {
            img.classList.add("pastilleRouge");
        } else {
            td.textContent = "Indisponible";
        }
        td.appendChild(img);
    }
    body.appendChild(tbl);
}

// VUE ///////////////////////////////////////////////
getParking();
setTimeout(getParking, (1000 * 60) * 5);