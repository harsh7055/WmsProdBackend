const express = require("express");
const cors = require("cors")
const axios = require("axios");
const { json } = require("express");
require("dotenv").config();
const app = express();
app.use(cors())
app.use(express.json());

app.post("/auth", async (req, res) => {
    console.log(req.body)
    const Url = "https://mingle-sso.se1.inforcloudsuite.com:443/BNJNUU88223X2YDS_PRD/as/token.oauth2"

    axios.post(Url, req.body, {
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     'Authorization': 'Basic Qk5KTlVVODgyMjNYMllEU19UU1R+ZVJ6MDZoWXVIcmxrY2tHV1g4OGx5RFBLZUkwX2I4ZDd3bWdUMFVnMEZIWTpucTlEX04xS0NyeTZGeFZ4MzMwZHNreGFpQ085Z0V4U215NllFN1FLbjF1YURZVENFUUg5ODduOWhoYnVIdVY2MUVOZlUxNnYwSnlBUXplRDFMYnlsUQ=='
        // }
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Qk5KTlVVODgyMjNYMllEU19QUkR+WG9tNXVsb0tyRUdYVFJqc2xxVXFPYlBONVN4OXFoOUdZZGdnWGlxbnNIRTpsNU9ETVl4Sms5eTlGa1gwdU1SZ29nR3JWdEp4aW5SRWN0UGdJU2ZlbGdCcC1lTDB5dUVodk5XRlQ5TXFPcDBUWHJqVWlUUUt5NEM5eEpZdDE0aFN5Zw=='
        }
    }
    ).then(response => {
        res.status(response.status).json(response.data)
    })
        .catch(err => res.status(err.response.status).json(err))
})


app.post("/location", async (req, res) => {
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }
    console.log(req.body)
    const location = req.body.location
    const controlKey = req.body.controlKey
    const team = req.body.team
    const warehouse=req.body.warehouse
    const jsonbody = {
        "fieldOverrides": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
        },
        "hrefs": [
            {
                "ref": "string",
                "url": "string"
            }
        ],
        "caller": "string",
        "parameters": "string",
        "jsonParameters": {
            "controlkey": controlKey,
            "loc": location,
            "id": "TEST23232",
            "item": "0IP2CSDTSM01I000M",
            "team": team
        }
    }
    // axios.get(`https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_PRD/WM/wmwebservice_rest/BNJNUU88223X2YDS_TST_REDAWESOMEOWL_TST_SCE_PRD_0_wmwhse1/locations/${location}`,jsondata, jsonbody)
    axios.post(`${process.env.Prod_Url}/WM/wmwebservice_rest/${warehouse}/sproceduremaps/json/NSPRFPC2`, jsonbody, jsondata)
        .then(response => {
            // console.log(response)
            res.status(response.status).json(response.data)
        })
        .catch(err => {
            res.status(err.response.status).json(err)
            // console.log(err);
        })


})



app.post("/warehouse", async (req, res) => {
    console.log();
    // console.log(req.body)
    axios.get(`${process.env.Prod_Url}/WM/wmwebservice_rest/enterprise/facilities`, req.body)
        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err => {
            res.status(err.response.status).json(err)
            // console.log(err);
        })

})



// app.post("")
app.post("/ownerValidate", async (req, res) => {

    // console.log(req.body);
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }
    const owner = req.body.owner
    const warehouse = req.body.warehouse
    // console.log(owner, warehouse + "...................");
    axios.get(`${process.env.Prod_Url}/WM/wmwebservice_rest/${warehouse}/owners/${owner}`, jsondata)
        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err => res.status(err.response.status).json(err))


})



app.post("/altsku", async (req, res) => {

    // console.log(req.body);
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }
    const owner = req.body.owner
    const warehouse = req.body.warehouse
    const altsku = req.body.altsku
    // console.log(owner, warehouse + "...................");
    axios.get(`${process.env.Prod_Url}/WM/wmwebservice_rest/${warehouse}/altskus/${owner}/${altsku}`, jsondata)
        // https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_PRD/WM/wmwebservice_rest/BNJNUU88223X2YDS_TST_REDAWESOMEOWL_TST_SCE_PRD_0_wmwhse1/altskus/UCB/1111111

        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err => res.status(err.response.status).json(err))
})

app.post("/controlKey", async (req, res) => {

    // console.log(req.body);
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }
    const team = req.body.team
    const warehouse = req.body.warehouse
    const controlKey = req.body.controlKey
    const body =
    {
        "fieldOverrides": {
            "additionalProp1": {},
            "additionalProp2": {},
            "additionalProp3": {}
        },
        "hrefs": [
            {
                "ref": "string",
                "url": "string"
            }
        ],
        "caller": "string",
        "parameters": "string",
        "jsonParameters": {
            "controlkey": controlKey,
            "team": team
        }
    }


    // console.log(req.body);
    //https://mingle-ionapi.eu1.inforcloudsuite.com/TRANGILE_DEM/WM/wmwebservice_rest/TRANGILE_DEM_TRANGILE_DEM_SCE_PRD_0_wmwhse5/sproceduremaps/json/NSPRFPC4BI
    //https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_PRD/WM/wmwebservice_rest/${warehouse}/sproceduremaps/json/NSPRFPC4BI
    // https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_PRD/WM/wmwebservice_rest/BNJNUU88223X2YDS_TST_REDAWESOMEOWL_TST_SCE_PRD_0_wmwhse1/sproceduremaps/json/NSPRFPC1
    axios.post(`${process.env.Prod_Url}/WM/wmwebservice_rest/${warehouse}/sproceduremaps/json/NSPRFPC1`, body, jsondata)
        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err => res.status(err.response.status).json(err))


})

// ==================================================================================

app.post("/storeSku", async (req, res) => {

    // console.log(req.body);
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }


    const body = {

        fieldOverrides: {
            additionalProp1: {},
            additionalProp2: {},
            additionalProp3: {}
        },
        hrefs: [
            {
                ref: "string",
                url: "string"
            }
        ],
        caller: "string",
        parameters: "string",
        jsonParameters:
            {
                controlkey: req.body.jsonParameters.controlkey,
                storerkey: req.body.jsonParameters.storerkey,
                sku: req.body.jsonParameters.sku,
                loc: req.body.jsonParameters.loc,
                packkey: req.body.jsonParameters.packkey,
                uom: req.body.jsonParameters.uom,
                qty: String(req.body.jsonParameters.qty),
                id: req.body.jsonParameters.id,
                Lottable06: req.body.jsonParameters.Lottable06,
                team: req.body.jsonParameters.team
                }
        
        // "jsonParameters": {
        //     "controlkey": req.body.jsonParameters.controlkey,
        //     "storerkey": req.body.jsonParameters.storerkey,
        //     "sku": req.body.jsonParameters.sku,
        //     "loc": req.body.jsonParameters.loc,
        //     "packkey": req.body.jsonParameters.packkey,
        //     "uom": req.body.jsonParameters.uom,
        //     "qty": req.body.jsonParameters.qty,
        //     "id": req.body.jsonParameters.id,
        //     "Lottable06": req.body.jsonParameters.Lottable06,
        //     "team": req.body.jsonParameters.team
        // }

    }
    // console.log(JSON.stringify(body)  +"BODY");
    // console.log(req.body.warehouse);
    const warehouse = req.body.warehouse

    // console.log(req.body.headers);
    // console.log(req.body.jsonParameters);

    axios.post(`${process.env.Prod_Url}/WM/wmwebservice_rest/${warehouse}/sproceduremaps/json/NSPRFPC4BI`, body, jsondata)
    .then(response => {
        res.status(response.status).json(response.data)
    })
    .catch(err => res.status(err.response.status).json(err))



})

app.listen(8000, () => {
    console.log("app listening at 8000")
})