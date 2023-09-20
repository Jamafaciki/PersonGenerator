document.getElementById('more').addEventListener('click', function () {
    const initPerson = personGenerator.getPerson();
    document.getElementById('surnameOutput').innerText = initPerson.surName;
    document.getElementById('firstNameOutput').innerText = initPerson.firstName;
    document.getElementById('middleNameOutput').innerText = initPerson.middleName;
    document.getElementById('genderOutput').innerText = initPerson.gender;
    document.getElementById('birthYearOutput').innerText = initPerson.dateofbirth;
    document.getElementById('profession').innerText = initPerson.profession;
})

document.getElementById('clear').addEventListener('click', function () {
    document.getElementById('surnameOutput').innerText = "";
    document.getElementById('firstNameOutput').innerText = "";
    document.getElementById('middleNameOutput').innerText = "";
    document.getElementById('genderOutput').innerText = "";
    document.getElementById('birthYearOutput').innerText = "";
    document.getElementById('profession').innerText = "";
})
