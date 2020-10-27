import Data from "./data.json";
import Cash from "./cash.json";
export default function computed(data,miunsArr = []) {
    // console.log(data)
    var arr = [];
    //交费期间
    var length = Number(data.date);
    var allLastMoney = 0;
    var allMinusMoney = 0;
    var minusAllMoney = 0;
    var age = 0;
    var finishAllMoney = 0;
    //费率
    var radio = getRadio(length,data.sex,Number(data.age));
    
    
    var yearMoney = data.money

    // var yearMoney = (Number(data.money)/radio)*1000;

    var moneys=(yearMoney/1000)*radio;
    return moneys

    
    
   
}

// length:选择保费缴费时长
function getRadio(length,sex,age) {
    if(length <= 3) {
        length = 3;
    } else if(length > 3 && length <= 5) {
        length = 5;
    } else if(length > 5 && length <= 10) {
        length = 10;
    } else if(length > 10 && length <= 15) {
        length = 15;
    } else if(length > 15 && length <= 20) {
        length = 20;
    } else if(length > 20 && length <= 1000) {
        length = 1000;
    }
    var data = Data.find((element)=>(element.time === String(length)&&element.sex === String(sex)&&element.age === String(age)));
    if(data) {
        // console.log(data,data.radio,'哭了')
        return data.radio;
    } else {
        return 0;
    }
}