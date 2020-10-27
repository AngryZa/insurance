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
    
    var yearMoney = (Number(data.money)/radio)*1000;


    // var moneys=(yearMoney/1000)*radio

    
    // for(let i=0;age < 105;i++) {
    for(let i=0;age < 106;i++) {
        //1.保单年度
        var index = i+1;
        //2.年度末到达年龄
        age = Number(data.age) + index;
        //6.减保前基本保险金额
        var initMoney = 0;
        if(i===0) {
            initMoney = Number(data.money);
        } else {
            initMoney = Number(allLastMoney);
        }
        //3.当年度保险费
        var nowMoney = 0;
        if(index <= length) {
            // nowMoney = initMoney/1000*radio;
            // console.log(radio,'radio')
            nowMoney = (initMoney/radio)*1000;
        }
        finishAllMoney = finishAllMoney + nowMoney;
        //7.年末减保的基本保险金额
        var minusMoney = 0;
        if(miunsArr) {
            for(let i=0;i<miunsArr.length;i++) {
                if(Number(miunsArr[i].year) === age) {
                    minusMoney = Number(miunsArr[i].value);
                    minusAllMoney = minusAllMoney + Number(miunsArr[i].value);
                }
            }
        }
        //8.减保后基本保险金额
        var lastMoney = allLastMoney = initMoney - minusMoney;
        //4.年度末已交保险费
        var finishMoney = 0;
        if(length === 1000) {
            finishMoney = (lastMoney/1000)*radio;
        } else {
            // finishMoney = (lastMoney/1000) *radio*(index<=length?index:length);
            finishMoney = (lastMoney/radio) *1000*(index<=length?index:length);
            
        }
        //5.年度末保险金额
        var overMoney = lastMoney*(Math.pow(1.035,(index-1)));
        //9.减保部分对应的现金价值
        // console.log(data,length,data.sex,data.age,index,'笑了')
        var obj = Cash.find((element)=>(element.time === String(length)&&element.sex === String(data.sex)&&element.age === String(data.age)&&element.year === String(index)));
        
        // 当年龄超出时就每天现金价值，所以判断obj是否存在
        var cash = obj?obj.cash:0;
        
        // var minusLastMoney = Number(((initMoney - lastMoney)/1000*cash).toFixed(2));
        var minusLastMoney = Number( ( ( (initMoney - lastMoney) / radio ) * cash).toFixed(2) );


        //10.累计减保部分对应的现金价值
        allMinusMoney += minusLastMoney;
        //12.年度末现金价值
        // var bottomMoney = lastMoney/1000*cash;
        
        var bottomMoney =   (lastMoney/radio) * cash;
        // console.log(lastMoney,'lastyearmony')
        //11.年度末身故/全残保险金
        /* var lameMoney = 0;
                var a =0
                var b =0
                var c =0
        if(index<1){
            a=bottomMoney;

            if(age>=18&&age<=40){
                b=finishMoney*1.6
            }else if(age>40&&age<=60){
                b=finishMoney*1.4
            }else if(age>60){
                b=b=finishMoney*1.2
            }

            if(a>b){
                lameMoney=a
            }else{
                lameMoney=b
            }
        }else{
            a=bottomMoney;
            if(age>=18&&age<=40){
                b=finishMoney*1.6
            }else if(age>40&&age<=60){
                b=finishMoney*1.4
            }else if(age>60){
                b=b=finishMoney*1.2
            }
            c=bottomMoney



            var run=[a,b,c]
            
            var max=run[0];
            for (var j =1; j < run.length; j++) {
                if (max<run[j]) {
                    max=run[j];
                }else{
                    max=max;
                }
            }
            lameMoney=max
        } */
        // console.log(lameMoney)


        var lameMoney = 0;
        if(age<=18){
            lameMoney = finishMoney>=bottomMoney?finishMoney:bottomMoney;
        }else{
                var a =0
                var b =0
                var c =0
            if(index<1){
                a=bottomMoney;

                if(age>=18&&age<=40){
                    b=finishMoney*1.6
                }else if(age>40&&age<=60){
                    b=finishMoney*1.4
                }else if(age>60){
                    b=b=finishMoney*1.2
                }

                if(a>b){
                    lameMoney=a
                }else{
                    lameMoney=b
                }
            }else{
                a=bottomMoney;
                if(age>=18&&age<=40){
                    b=finishMoney*1.6
                }else if(age>40&&age<=60){
                    b=finishMoney*1.4
                }else if(age>60){
                    b=b=finishMoney*1.2
                }
                c=bottomMoney



                var run=[a,b,c]
                
                var max=run[0];
                for (var j =1; j < run.length; j++) {
                    if (max<run[j]) {
                        max=run[j];
                    }else{
                        max=max;
                    }
                }
                lameMoney=max
            }
        }

        


        /* if(age<=18) {
            lameMoney = finishMoney>=bottomMoney?finishMoney:bottomMoney;
        } else if(age>18&&age<=41) {
            lameMoney = overMoney;
            if(lameMoney < finishMoney*1.7) {
                lameMoney = finishMoney*1.7;
            }
            if(lameMoney < bottomMoney) {
                lameMoney = bottomMoney;
            }
        } else if (age>41 && age <= 61) {
            lameMoney = overMoney;
            if(lameMoney < finishMoney*1.5) {
                lameMoney = finishMoney*1.5;
            }
            if(lameMoney < bottomMoney) {
                lameMoney = bottomMoney;
            }
        } else if (age>61) {
            lameMoney = overMoney;
            if(lameMoney < finishMoney*1.3) {
                lameMoney = finishMoney*1.3;
            }
            if(lameMoney < bottomMoney) {
                lameMoney = bottomMoney;
            }
        } */


        //统计
        arr.push({
            index,
            age,
            nowMoney: nowMoney.toFixed(2),
            finishMoney: finishMoney.toFixed(2),
            overMoney: overMoney.toFixed(2),
            initMoney: initMoney.toFixed(2),
            minusMoney: minusMoney.toFixed(2),
            lastMoney: lastMoney.toFixed(2),
            minusLastMoney: minusLastMoney.toFixed(2),
            allMinusMoney: allMinusMoney.toFixed(2),
            lameMoney: lameMoney.toFixed(2),
            bottomMoney: bottomMoney.toFixed(2),
            yearMoney: yearMoney.toFixed(2),
            cash,
            finishAllMoney: finishAllMoney.toFixed(2),
            minusAllMoney: minusAllMoney.toFixed(2),
            radio,
            // moneys
        })
    }
    // console.log(arr,88888)
    return arr;
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