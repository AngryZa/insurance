export function getlast(arr,age) {
    var reInfos = 0;
    for(var i=0;i<arr.length;i++) {
        if(Number(age) > Number(arr[i].year)) {
            reInfos += Number(arr[i].value);
        }
    }
    return reInfos;
}

export function reload(arr,age,infos,radio) {
    var tol=Number(0)
    for(let i=0;i<arr.length;i++) {
        var index = Number(arr[i].year) - 1 - Number(age);
        var info = infos[index];
        if((i-1)>=0){
            tol=tol+Number(arr[i-1].value)
        }
        
        
        console.log(arr,age,infos,radio)

        arr[i].finish = (((Number(info.initMoney)-Number(arr[i].value)-tol)/radio)*Number(info.cash)).toFixed(2)
        // arr[i].finish =Number(100)
    
    }

    return arr;
}