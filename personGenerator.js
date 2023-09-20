const personGenerator = {
    surnameJson: `{  
        "count": 16,
        "list": {
            "id_1": "Иванов",
            "id_2": "Смирнов",
            "id_3": "Кузнецов",
            "id_4": "Васильев",
            "id_5": "Петров",
            "id_6": "Михайлов",
            "id_7": "Новиков",
            "id_8": "Федоров",
            "id_9": "Кравцов",
            "id_10": "Николаев",
            "id_11": "Семёнов",
            "id_12": "Славин",
            "id_13": "Степанов",
            "id_14": "Павлов",
            "id_15": "Александров",
            "id_16": "Морозов"
        }
    }`,
    firstNameMaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Александр",
            "id_2": "Максим",
            "id_3": "Иван",
            "id_4": "Артем",
            "id_5": "Дмитрий",
            "id_6": "Никита",
            "id_7": "Михаил",
            "id_8": "Даниил",
            "id_9": "Егор",
            "id_10": "Андрей"
        }
    }`,
    firstNameFemaleJson: `{
        "count": 10,
        "list": {     
            "id_1": "Анна",
            "id_2": "Наталья",
            "id_3": "Кристина",
            "id_4": "Мария",
            "id_5": "Ольга",
            "id_6": "Надежда",
            "id_7": "Любовь",
            "id_8": "Екатерина",
            "id_9": "Софья",
            "id_10": "Алёна"
        }
    }`,
    gender: `{
        "count":2,
        "list":{
            "id_1": "Мужчина",
            "id_2": "Женщина"
        }
    }`,

    GENDER_MALE: 'Мужчина',
    GENDER_FEMALE: 'Женщина',
    GENDER: '',
    DateofBirth: '',
    Work: '',

    randomIntNumber: (max = 1, min = 0) => Math.floor(Math.random() * (max - min + 1) + min),

    randomValue: function (json) {
        const obj = JSON.parse(json);
        const prop = `id_${this.randomIntNumber(obj.count, 1)}`;  // this = personGenerator
        return obj.list[prop];
    },

    randomGender: function () {
        const intgender = this.randomIntNumber();
        if(intgender == 0){
            this.GENDER = this.GENDER_MALE;
        return this.GENDER;
        } else {
            this.GENDER = this.GENDER_FEMALE;
        return this.GENDER;
        }
    },

    randomFirstName: function() {
        if(this.randomGender() == 'Мужчина'){
            return this.randomValue(this.firstNameMaleJson);
        } else {
            return this.randomValue(this.firstNameFemaleJson);
        }
    },

     randomSurname: function() {
        if(this.GENDER == 'Мужчина'){
            return this.randomValue(this.surnameJson);
        } else {
            return this.randomValue(this.surnameJson) + "а";
        }       
    },
    
    randomMiddlename: function() {
        let middlename = this.randomValue(this.firstNameMaleJson);
        var splitted = middlename.split("");
        let lengname = splitted.length - 1;
        //Проверка сделана исходя из заранее известных мужских имён. Если имён было бы больше - то и проверка была бы из ещё больше if портянки.
        if(this.GENDER == 'Мужчина'){
            if(middlename == "Михаил"){
                splitted.splice(lengname - 1, 2);
                return (splitted.join("") + "йлович");
                } else if (splitted[lengname] == "й"){
                    splitted.splice(lengname, 1);
                    return (splitted.join("") + "евич");
                    } else if ((splitted[lengname -1] + splitted[lengname]) == "та") {
                        splitted.splice(lengname, 1);
                        return (splitted.join("") + "ич");
                        } else {
                            return  (middlename + "ович");
                            }
        } else {
            if(middlename == "Михаил"){
                splitted.splice(lengname - 1, 2);
                return (splitted.join("") + "йловна");
                } else if (splitted[lengname] == "й"){
                    splitted.splice(lengname, 1);
                    return (splitted.join("") + "евна");
                    } else if ((splitted[lengname -1] + splitted[lengname]) == "та") {
                        splitted.splice(lengname, 1);
                        return (splitted.join("") + "ична");
                        } else {
                            return  (middlename + "овна");
                            }
            }
    },
    generateDB: function(){
       var Year = this.randomIntNumber(2005 , 1970);
       var Month = this.randomIntNumber(12 , 1);
       var Day;

        if(Month == 1){
             Day = this.randomIntNumber(28 , 1);
        } else if (Month == 3 || Month == 5 || Month == 8 || Month == 10){
             Day = this.randomIntNumber(30 , 1);
        } else {
             Day = this.randomIntNumber(31 , 1);
        }
        let date = new Date(`${Year}-${Month}-${Day}`);
        var monthName = date.toLocaleString('default', { month: 'long' });
        if(Month == 3 || Month == 8){
            monthName += "а";
        }
        else{
            monthName = monthName.slice(0, -1);
            monthName += "я";
            }  
        let resault = `${Day} ${monthName} ${Year} года`;
        return resault;
    },

    getWork: function(){
        if(this.GENDER == 'Мужчина'){
            this.Work = Math.round(Math.random()) === 1 ? works.workGlobal : works.workMan;
        } else {
            this.Work = Math.round(Math.random()) === 1 ? works.workGlobal : works.workWoman;
        }
        return this.randomValue(this.Work);
     },

    getPerson: function () {
        this.person = {};
        this.person.firstName = this.randomFirstName();
        this.person.surName = this.randomSurname();
        this.person.middleName = this.randomMiddlename();
        this.person.gender = this.GENDER;
        this.person.dateofbirth = this.generateDB();
        this.person.profession = this.getWork();
        return this.person;
    },
};

//const middleNames = {
//    middleNameJson: `{
//            "count": 13,
//            "list": {     
//                "id_1": "Александров",
//                "id_2": "Максимов",
//                "id_3": "Иванов",
//                "id_4": "Артемов",
//                "id_5": "Дмитриев",
//                "id_6": "Андреев",
//                "id_7": "Михаилов",
//                "id_8": "Даниилов",
//                "id_9": "Егоров",
//                "id_10": "Алексеев",
//                "id_11": "Юрьев",
//                "id_12": "Васильев",
//                "id_13": "Владимиров"
//                    }
//                }`
//}

const works = {
    workMan: `{
        "count": 6,
        "list": {     
            "id_1": "Слесарь",
            "id_2": "Сантехник",
            "id_3": "Электрик",
            "id_4": "Строитель",
            "id_5": "Шахтёр",
            "id_6": "Солдат"
                }
            }`,
    workWoman: `{
        "count": 4,
        "list": {     
            "id_1": "Медсестра",
            "id_2": "Швея",
            "id_3": "Няня",
            "id_4": "Горничная"
                }
            }`,
    workGlobal:`{
        "count": 12,
        "list": {     
            "id_1": "Водитель",
            "id_2": "Стилист",
            "id_3": "Повар",
            "id_4": "Кондитер",
            "id_5": "Пекарь",
            "id_6": "Сушист",
            "id_7": "Кассир",
            "id_8": "Администратор",
            "id_9": "Менеджер",
            "id_10": "Директор",
            "id_11": "Курьер",
            "id_12": "Бухгалтер"
                }
            }`
}