const express = require('express');
const jwt = require('jsonwebtoken');
const jwtRouter = express.Router()

jwtRouter.post("/generateJwtToken", (req, res) => {
    // Validate User Here
    // Then generate JWT Token

    console.log(`inside generateJwtToken..`);

    let jwtSecretKey = process.env.JWT_SECRET_KEY;
    let data = {
        time: Date(),
        userId: 12,
    }
    const token = jwt.sign(data, jwtSecretKey, {
        // expiresIn: "10h" // it will be expired after 10 hours
        //expiresIn: "20d" // it will be expired after 20 days
        //expiresIn: 120 // it will be expired after 120ms
        expiresIn: "120s" // it will be expired after 2 min 
    });
    console.log(`jwt token ${token}`);
    res.send(token);
});

jwtRouter.get("/validateJwtToken", (req, res) => {
    // Tokens are generally passed in the header of the request
    // Due to security reasons.
    console.log(`inside validateJwtToken`);
    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    try {
        //const token = req.headers.authorization.split(' ')[1]; 
        const token = req.header('auth-token');
        console.log(`jwt header token ${token}`);

        const verified = jwt.verify(token, jwtSecretKey);
        if (verified) {
            return res.send("Successfully Verified");
        } else {
            // Access Denied
            return res.status(401).send(error);
        }
    } catch (error) {
        // Access Denied
        return res.status(401).send(error);
    }
});

module.exports = { jwtRouter };


