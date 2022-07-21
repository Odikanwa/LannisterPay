import express from 'express';

// const app = express();

const router = express.Router();


// Consider using stringify to convert to js from db instead of duplicating
const payments = [
    {
        ID: 1308,
        Amount: 12580,
        Currency: "NGN",
        CustomerEmail: "anon8@customers.io",
        SplitInfo: [
            {
                SplitType: "FLAT",
                SplitValue: 45,
                SplitEntityId: "LNPYACC0019"
            },
            {
                SplitType: "RATIO",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0011"
            },
            {
                SplitType: "PERCENTAGE",
                SplitValue: 3,
                SplitEntityId: "LNPYACC0015"
            }
        ]
    }
]


// All routes here starting with '/split-payments'
router.get('/compute', (req, res) => {
    res.send(payments);
})

router.post('/compute', (req, res) => {
    //Get request body
    const request = req.body;
    // console.log(request)
    const splitInfo = request.SplitInfo;
    // console.log(splitInfo)
    //Calculate FLAT, PERCENTAGE & RATIO (in order)
      //     for(var i = 0; i < payments.length; i++) {

    const state = {
        balance: request.Amount,
    }
            
    for(var i = 0; i < splitInfo.length; i++) {
       
        if (splitInfo[i].SplitType == "FLAT") {
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);
            const amount = splitInfo[i].SplitValue;
            // amount.push(splitValue)
            // console.log(amount)
            let newBalance = state.balance - amount;
            state.balance = newBalance;
            console.log(state.balance, amount);
        }
    }
    for(var i = 0; i < splitInfo.length; i++) {
        if (splitInfo[i].SplitType == "PERCENTAGE") {
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);
            const amount = (splitInfo[i].SplitValue/100) * state.balance;
            // amount.push(splitValue)
            // console.log(amount)
            let newBalance = state.balance - amount;
            state.balance = newBalance;
            console.log(state.balance, amount);
        }
    }
    

    // if (splitInfo.SplitType == "RATIO") {
    //     const sum = splitInfo.reduce((accumulator, object) => {
    //         return accumulator + object.SplitValue;
    //     }, 0);
    //     console.log(sum)
    // }
     
    // splitInfo.forEach(element => {
    //     sum += element.SplitValue
        
    // });

    for(var i = 0; i < splitInfo.length; i++) {
        if (splitInfo[i].SplitType == "RATIO") {
            let sumOfRatio = 0
            sumOfRatio += splitInfo[i].SplitValue;
            console.log(sumOfRatio)
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);

            // const sum = splitInfo.reduce((accumulator, object) => {
            //     return (accumulator + object.SplitValue) && object.SplitType == "RATIO";
            // }, 0);
            // console.log(sum)
            
            // const totalRatio = []
            // totalRatio.push(splitInfo[i].SplitValue)
            // const amount =
            // console.log(totalRatio)
            // // amount.push(splitValue)
            // // console.log(amount)
            // let newBalance = state.balance - amount;
            // state.balance = newBalance;
            // console.log(state.balance);
        }
    }

    console.log(
        [10, 20, 30, 40].reduce((a, b) => a + b, 0)
      )
 

    // const paymentDetails = splitInfo => {
    //     console.log('look')

    //     const state = {
    //         balance: request.Amount,
            
    //     }
    //     console.log(state.balance)
    //     console.log(request.SplitInfo)
    //     for(var i = 0; i < payments.length; i++) {
            
    //         if (payments[i].SplitType == "FLAT") {
    //             return
    //             console.log('Mike')
    //             // console.log(state.balance, payments[i].SplitType, payments[i].SplitValue, payments[i].SplitEntityId);
    //             // const amount = payments[i].SplitValue;
    //             // // amount.push(splitValue)
    //             // // console.log(amount)
    //             // let newBalance = state.balance - amount;
    //             // state.balance = newBalance;
    //             // console.log(state.balance);
    //         }
    //     }
    // }


    //return object
    const payments = {
        ID: request.ID,
        Balance: 0,
        SplitBreakdown: [
            {
                SplitEntityId: "LNPYACC0019", //replace by getting it through request
                Amount: 5000
            },
            {
                SplitEntityId: "LNPYACC0011", //replace by getting it through request
                Amount: 2000
            },
            {
                SplitEntityId: "LNPYACC0015", //replace by getting it through request
                Amount: 2000
            }
        ]

    }
    
    // res.send(JSON.stringify(payments));
    res.send(payments);
})

export default router;