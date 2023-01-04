const express = require("express");
const cors = require("cors")
const axios = require("axios");
const { json } = require("express");
const app = express();
app.use(cors())
app.use(express.json());
app.post("/auth", async (req, res) => {
    console.log(req.body)
    const Url = "https://mingle-sso.se1.inforcloudsuite.com:443/BNJNUU88223X2YDS_TST/as/token.oauth2"

     axios.post(Url, req.body, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Qk5KTlVVODgyMjNYMllEU19UU1R+ZVJ6MDZoWXVIcmxrY2tHV1g4OGx5RFBLZUkwX2I4ZDd3bWdUMFVnMEZIWTpucTlEX04xS0NyeTZGeFZ4MzMwZHNreGFpQ085Z0V4U215NllFN1FLbjF1YURZVENFUUg5ODduOWhoYnVIdVY2MUVOZlUxNnYwSnlBUXplRDFMYnlsUQ=='
        }
    }
    ).then(response => {
        res.status(response.status).json(response.data)
    })
    .catch(err=>res.status(err.response.status).json(err))
})
app.post("/location", async (req, res) => {
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }
    console.log(req.body)
    const location = req.body.location
     axios.get(`https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_TST/WM/wmwebservice_rest/BNJNUU88223X2YDS_TST_REDAWESOMEOWL_TST_SCE_PRD_0_wmwhse1/locations/${location}`, jsondata)
    .then(response => {
        res.status(response.status).json(response.data)
    })
    .catch(err=>res.status(err.response.status).json(err))
  
    
})


app.post("/warehouse", async (req, res) => {
    console.log(req.body)
     axios.get("https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_TST/WM/wmwebservice_rest/enterprise/facilities", req.body)
    .then(response => {
        res.status(response.status).json(response.data)
    })
    .catch(err=>res.status(err.response.status).json(err))

})



// app.post("")
app.post("/ownerValidate", async (req, res) => {

    console.log(req.body);
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }
    const owner = req.body.owner
    const warehouse = req.body.warehouse
    console.log(owner, warehouse + "...................");
    axios.get(`https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_TST/WM/wmwebservice_rest/${warehouse}/owners/${owner}`, jsondata)
        .then(response => {
            res.status(response.status).json(response.data)
        })
        .catch(err=>res.status(err.response.status).json(err))
    

})



app.post("/altsku", async (req, res) => {

    console.log(req.body);
    const jsondata = {
        headers: {
            Authorization: req.body.headers.Authorization
        }
    }
    const owner = req.body.owner
    const warehouse = req.body.warehouse
    const altsku = req.body.altsku
    console.log(owner, warehouse + "...................");
     axios.get(`https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_TST/WM/wmwebservice_rest/${warehouse}/altskus/${owner}/${altsku}`, jsondata)
    // https://mingle-ionapi.se1.inforcloudsuite.com/BNJNUU88223X2YDS_TST/WM/wmwebservice_rest/BNJNUU88223X2YDS_TST_REDAWESOMEOWL_TST_SCE_PRD_0_wmwhse1/altskus/UCB/1111111
    .then(response => {
        res.status(response.status).json(response.data)
    })
    .catch(err=>res.status(err.response.status).json(err))
})
app.listen(8000, () => {
    console.log("app listening at 8000")
})