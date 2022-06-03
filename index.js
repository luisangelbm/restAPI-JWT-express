const express = require("express");
const jwt = require("jsonwebtoken");
const verify = require("jsonwebtoken/verify");

const app = express();
const port = process.env.PORT || 3000;

app.get("/api", (req, res) => {
    res.json({
        message: "Nodejs and JWT"
    })
});

app.post("/api/login", (req, res) => {
    const user = {
        id: 1,
        nombre : "Luisangel",
        email : "luisangel@gmail.com"
    }

    jwt.sign({user: user}, 'secretkey', { expiresIn: '32s'}, (err, token) => {
        res.json({
            token: token
        })
    })
});

app.post("/api/posts", verifyToken,(req, res) => {
    jwt.verify(req.token, 'secretkey', (error, authData) => {
        if(error){
            res.sendStatus(403)
        }else{
            res.json({
                message: "Post fue creado",
                authData: authData
            })
        }
    })
});

// Authorization: Bearer <token>
function verifyToken (req, res, next){
    const bearerHeader= req.headers['authorization'] ;
    if(typeof bearerHeader !== 'undefined'){
        const bearerToken = bearerHeader.split(" ")[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }

}

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});