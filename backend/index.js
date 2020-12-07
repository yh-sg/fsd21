//import from libs
const express = require("express")
const bodyParser = require("body-parser")
const secureEnv = require("secure-env");
const cors = require("cors")
const mysql = require("mysql2/promise")

//construct new express obj
const app = express();

//Initialize all the relevant params for the express middleware
app.use(cors());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(bodyParser.json({limit: '50mb'}))

//Integrate with secure env & PORT
global.env = secureEnv({secret: 'isasecret'})

const APP_PORT = global.env.APP_PORT;

//Create my sql connection pool, require to pass in all database credential
const pool = mysql.createPool({
    host: global.env.MYSQL_SERVER,
    port: global.env.MYSQL_SVR_PORT,
    user: global.env.MYSQL_USERNAME,
    password: global.env.MYSQL_PASSWORD,
    database: global.env.MYSQL_SCHEMA,
    connectionLimit: global.env.MYSQL_CON_LIMIT,
});

// construct SQL - select all statement and insert one record
const queryAllRsvp = `SELECT id, name, email, phone, status, createdBy, 
    createdDt, updatedBy, updatedDt from rsvp`
const insertRsvp = `INSERT INTO
    rsvp (name, email, phone, status, createdBy, createdDt)
    values (?,?,?,?,?,CURDATE())`;

//establish connection, take in params 
const makeQuery = (sql, pool)=>{
    console.log(sql);
    return(async (args) => {
        const conn = await pool.getConnection();
        try{
            let results = await conn.query(sql,args||[])
            return results[0]
        }catch{
            console.log(err);
        }finally{
            conn.release();
        }
    })
}

// Create the closure function for the end point to perform CRUD
const findAllRsvp = makeQuery(queryAllRsvp, pool);
const saveOneRsvp = makeQuery(insertRsvp, pool);

const COMMON_NAMESPACE = "/api"

//Invoke the closure function
app.get(`${COMMON_NAMESPACE}/rsvps`, (req,res)=>{
    console.log('get all rsvps');
    findAllRsvp([]).then((results)=>{
        console.log(results);
        res.status(200).json({results});
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err)
    })
})

app.post(`${COMMON_NAMESPACE}/rsvp`, (req,res)=>{
    const bodyValue = req.body
    console.log(bodyValue);
    saveOneRsvp([req.body.name,req.body.email,req.body.phone,req.body.status, 1])
    .then((results)=>{
        res.status(200).json(results)
    }).catch((err)=>{
        console.log(err);
        res.status(500).json(err)
    })
})

app.listen(APP_PORT,()=>{
    console.log("App is listening on", APP_PORT);
})