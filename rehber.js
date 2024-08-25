let firstName = document.querySelector('#first-name');
let surname = document.querySelector('#surname');
let mail = document.querySelector('#mail');

let form = document.querySelector('#formid');
let personNames = document.querySelector('.personNames');

form.addEventListener('submit', save);
personNames.addEventListener('click', editPersonelements);

let chosenline = undefined;

function editPersonelements(e) {
    if(e.target.classList.contains('btndelete')) {
        deletepersonfromtable(e.target.parentElement.parentElement);
    }else if(e.target.classList.contains('btnedit')){
        document.getElementById('buttonid').value='Güncelle';
        let chosenTR = e.target.parentElement.parentElement;
        let updateMail = chosenTR.cells[2].textContent;

        firstName.value = chosenTR.cells[0].textContent;
        surname.value = chosenTR.cells[1].textContent;
        mail.value = chosenTR.cells[2].textContent;

        chosenline = chosenTR;
    }
}

function deletepersonfromtable(deletedperson) {
    deletedperson.remove();
}
function save(e) {
    e.preventDefault();
    let data = {
        firstName: firstName.value,
        surname: surname.value,
        mail: mail.value
    }
    let result = controlDatas(data);
    if (result.durum) {
        if(chosenline) {
            updatePerson(data);
        }else {
            addPersonTable(data);
        }
        
        createInformation(result.mesaj, result.durum);
    }else {
        createInformation(result.mesaj, result.durum);
    }
}

function addPersonTable(data) {
    let createTr = document.createElement('tr');
    createTr.className = 'tablobeden';
    createTr.innerHTML = `<td class="tbod">${data.firstName}</td>
    <td class="tbod">${data.surname}</td>
    <td class="tbod">${data.mail}</td>
    <td class="tbod">
    <button class="btnofedits btnedit">düzelt</button>
                    <button class="btnofedits btndelete">sil</button>
    </td>`;

    personNames.appendChild(createTr);
}

function controlDatas (person) {
    for(let deger in person) {
        if(person[deger]) {
        }else {
            let result = {
                durum: false,
                mesaj: 'Boş alan bırakmayınız!'
            }
            return result;
        }
        
    }
    clearField();
    return {
        durum: true,
        mesaj: 'Başarılı'
    }
}

function createInformation (mesaj, durum) {
    let creationDiv = document.createElement('div');
    creationDiv.textContent = mesaj;
    creationDiv.className = 'inform';
    if(durum) {
        creationDiv.classList.add('inform-success');
    }else {
        creationDiv.classList.add('inform-error');
    }

    document.body.insertBefore(creationDiv, form);

    setTimeout(function() {
        let deleteinform = document.querySelector('.inform');
        deleteinform.remove();
    },2000)
}

function clearField() {
    firstName.value = '';
    surname.value = '';
    mail.value = '';
}

function updatePerson(people) {
    chosenline.cells[0].textContent = people.firstName;
    chosenline.cells[1].textContent = people.surname;
    chosenline.cells[2].textContent = people.mail;

    document.getElementById('buttonid').value = 'Kaydet';
    chosenline = undefined;
}