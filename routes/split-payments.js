import express from 'express';

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
    const splitInfoLength = splitInfo.length;

    //Update Amount
    let amount = 0


    const state = {
        ID: request.ID,
        balance: request.Amount,
        SplitBreakdown: []
    }

    const ratios = splitInfo.filter((obj) => obj.SplitType == "RATIO")
    
    //Sum ratio values of splitType=RATIO
    const sumOfRatios = ratios.reduce((a, b) => {
        return (a + b.SplitValue);
        }, 0);

            
    //Loop for splitType=FLAT
    for(let i = 0; i < splitInfoLength; i++) {
        if (splitInfo[i].SplitType == "FLAT") {
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);
            state.SplitBreakdown.map((obj) => obj.SplitEntityId = splitInfo[i].SplitEntityId)
            amount = splitInfo[i].SplitValue;
            let newBalance = state.balance - amount;
            state.balance = newBalance;
            console.log(state.balance, amount);
        }
    }
    //Loop for splitType = PERCENTAGE
    for(let i = 0; i < splitInfoLength; i++) {
        if (splitInfo[i].SplitType == "PERCENTAGE") {
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);
            amount = (splitInfo[i].SplitValue/100) * state.balance;
            let newBalance = state.balance - amount;
            state.balance = newBalance;
            console.log(state.balance, amount);
        }
    }
    //Loop for Split Type = RATIO
    for(var i = 0; i < splitInfoLength; i++) {
        if (splitInfo[i].SplitType == "RATIO") {
            console.log(state.balance, splitInfo[i].SplitType, splitInfo[i].SplitValue, splitInfo[i].SplitEntityId);
            let openingBalance = state.balance
            amount = (splitInfo[i].SplitValue/sumOfRatios) * openingBalance;
            let newBalance = openingBalance - amount;
            console.log(state.balance, newBalance, amount);

            continue;
            state.balance = newBalance;
            console.log(state.balance)
            
        }
        
    }

    // Push details to SplitInfo Array in state
    for (let i = 0; i < splitInfoLength; i++) {
        let obj = { "SplitEntityId": splitInfo[i].SplitEntityId, "Amount": amount};
        state.SplitBreakdown.push(obj);
    }
    
    // send response

    if (splitInfoLength < 1){
        res.send('There are no SplitInfo objects')
    } else if (splitInfoLength > 20) {
        res.send('SplitInfo should not be greater than 20. Please review and try again')
    } else {
        res.send(state);
    }
    
})

export default router;