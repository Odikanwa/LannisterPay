import express from 'express';
import paymentData from '../payments.json' assert{type:'json'}

// const app = express();

const router = express.Router();

// All routes here starting with '/split-payments'
router.get('/compute', (req, res) => {
    res.send(paymentData);
})

router.post('/compute', (req, res) => {

    //Get request body
    const request = req.body;
    const splitInfo = request.SplitInfo;

    const state = {
        balance: request.Amount
    }

    const ratios = splitInfo.filter((obj) => obj.SplitType == "RATIO")
    
    //Sum ratio values of splitType=RATIO
    const sumOfRatios = ratios.reduce((a, b) => {
        return (a + b.SplitValue);
        }, 0);
        console.log(sumOfRatios)
            
    //Loop for splitType=FLAT
    for(var i = 0; i < splitInfo.length; i++) {
        if (splitInfo[i].SplitType == "FLAT") {
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);
            const amount = splitInfo[i].SplitValue;
            let newBalance = state.balance - amount;
            state.balance = newBalance;
            console.log(state.balance, amount);
        }
    }
    //Loop for splitType = PERCENTAGE
    for(var i = 0; i < splitInfo.length; i++) {
        if (splitInfo[i].SplitType == "PERCENTAGE") {
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);
            const amount = (splitInfo[i].SplitValue/100) * state.balance;
            let newBalance = state.balance - amount;
            state.balance = newBalance;
            console.log(state.balance, amount);
         
        }
    }

    //Loop for Split Type = RATIO
    ratios.forEach(item => {
        if (item.SplitType == "RATIO") {
            console.log(state.balance, item.SplitType, item.SplitValue, item.SplitEntityId);
            let openingBalance = state.balance
            const amount = (item.SplitValue/sumOfRatios) * openingBalance;
            let newBalance = openingBalance - amount;
            console.log(newBalance, amount);
        }
        
    });

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