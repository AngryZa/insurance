export default {
    benefit: {
        name: "",
        sex: [{
                title: "男",
                is: false
            },
            {
                title: "女",
                is: false
            }
        ],
        age: "",
        times: [{
                title: "3年",
                cont: 3,
                is: false
            },
            {
                title: "5年",
                cont: 5,
                is: false
            },
            {
                title: "10年",
                cont: 10,
                is: false
            },
            {
                title: "15年",
                cont: 15,
                is: false
            },
            {
                title: "20年",
                cont: 20,
                is: false
            }
        ],
        init: "",
        isAllPay: false
    },
    result: {
        year: 0,
        computedArr: [
            {
                year: "",
                result: "",
                value: "",
                finish: ""
            }
        ]
    },
    during: {
        computedArr: [
            {
                age_start: "",
                age_end: "",
                diminish: "",
                cash: "",
                finish: ""
            }
        ]
    }
}