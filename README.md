## API Reference

### Getting Started
- Base URL: At present this API can only be run locally. PAI is hosted with Github pages at https://odikanwa.github.io/LannisterPay/. The backend app is hosted at the default, `http://127.0.0.1:5000/`.
- Authentication: This version of the application does not require authentication. 

### Endpoints 

#### POST /questions
- General:
    - Creates a new question using the submitted question, answer, difficulty and category. Returns the success value, id of the created question, current questions, total number of questions and categories to update the frontend.
    The expected input object pattern is given below.
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
