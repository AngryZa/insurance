export default (state,action) => {
    var newState = Object.assign({},state);
    switch(action.type) {
        case "CHANGENAME":
            newState.benefit.name = action.value;
            return newState;
        case "CHANGESEX":
            newState.benefit.sex = action.value;
            return newState;
        case "CHANGEAGE":
            newState.benefit.age = action.value;
            return newState;
        case "CHANGETIME":
            newState.benefit.times = action.value;
            return newState;
        case "CHANGEINIT":
            newState.benefit.init = action.value;
            return newState;
        case "CHANGEARR":
            newState.result.computedArr = action.value;
            return newState;
        case "CHANGERESULTYEAR":
            newState.result.year = action.value;
            return newState;
        case "CHANGEDURING":
            newState.during.computedArr = action.value;
            return newState;
        case "CHANGEBENEFIT":
            newState.benefit.isAllPay = action.value;
            return newState;
        case "RESETRESULT":
            newState.result = action.value;
            return newState;
        case "RESETDURING":
            newState.during = action.value;
            return newState;
        case "JUMPINDEX":
            newState.jumpIndex = action.value;
            return newState;
        default:
            return state;
    }
}