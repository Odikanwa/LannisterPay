## API Reference

### Getting Started
- Base URL: At present this API can only be run locally. Static page is hosted at https://odikanwa.github.io/LannisterPay/. The backend app is hosted at the default, `http://127.0.0.1:5000/`.
- Authentication: This version of the application does not require authentication. 

### Endpoints 

#### POST /questions
- General:
    - Implements a transaction payment splitting service (TPSS). The service calculates the amount due to one or more split payment “entities” as well as the amount left after all splits have been computed. Amounts and Balance is calculated in a linear FLAT-PERCENTAGE-RATIO manner.
    The expected input object pattern is given below. The SplitInfo array can only contain a minimum of 1 split entity and a maximum of 20 entities.
``` 
{
    "ID": 13092,
    "Amount": 4500,
    "Currency": "NGN",
    "CustomerEmail": "anon8@customers.io",
    "SplitInfo": [
        {
            "SplitType": "FLAT",
            "SplitValue": 450,
            "SplitEntityId": "LNPYACC0019"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0011"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 3,
            "SplitEntityId": "LNPYACC0015"
        },
        {
            "SplitType": "RATIO",
            "SplitValue": 2,
            "SplitEntityId": "LNPYACC0016"
        },
        {
            "SplitType": "FLAT",
            "SplitValue": 2450,
            "SplitEntityId": "LNPYACC0029"
        },
        {
            "SplitType": "PERCENTAGE",
            "SplitValue": 10,
            "SplitEntityId": "LNPYACC0215"
        },
    ]
}
```
