import { request } from 'https';
import { createHmac, randomBytes } from 'crypto';
import { rapydApiKey, rapydSecretKey } from '../config.js'

const log = true;

async function makeRequest(method, urlPath, body = null) {

    try {
        let httpMethod = method;
        let httpBaseURL = "sandboxapi.rapyd.net";
        let httpURLPath = urlPath;
        let salt = generateRandomString(8);
        let idempotency = new Date().getTime().toString();
        let timestamp = Math.round(new Date().getTime() / 1000);
        let signature = sign(httpMethod, httpURLPath, salt, timestamp, body)

        const options = {
            hostname: httpBaseURL,
            port: 443,
            path: httpURLPath,
            method: httpMethod,
            headers: {
                'Content-Type': 'application/json',
                salt: salt,
                timestamp: timestamp,
                signature: signature,
                access_key: rapydApiKey,
                idempotency: idempotency
            }
        }

        return await httpRequest(options, body, log);
    }
    catch (error) {
        console.error("Error generating request options", error);
        throw error;
    }
}

function sign(method, urlPath, salt, timestamp, body) {

    try {
        let bodyString = "";
        if (body) {
            bodyString = JSON.stringify(body);
            bodyString = bodyString == "{}" ? "" : bodyString;
        }

        let toSign = method.toLowerCase() + urlPath + salt + timestamp + rapydApiKey + rapydSecretKey + bodyString;
        log && console.log(`toSign: ${toSign}`);

        let hash = createHmac('sha256', rapydSecretKey);
        hash.update(toSign);
        const signature = Buffer.from(hash.digest("hex")).toString("base64")
        log && console.log(`signature: ${signature}`);

        return signature;
    }
    catch (error) {
        console.error("Error generating signature");
        throw error;
    }
}

function generateRandomString(size) {
    try {
        return randomBytes(size).toString('hex');
    }
    catch (error) {
        console.error("Error generating salt");
        throw error;
    }
}

async function httpRequest(options, body) {

    return new Promise((resolve, reject) => {

        try {

            let bodyString = "";
            if (body) {
                bodyString = JSON.stringify(body);
                bodyString = bodyString == "{}" ? "" : bodyString;
            }

            log && console.log(`httpRequest options: ${JSON.stringify(options)}`);
            const req = request(options, (res) => {
                let response = {
                    statusCode: res.statusCode,
                    headers: res.headers,
                    body: ''
                };

                res.on('data', (data) => {
                    response.body += data;
                });

                res.on('end', () => {

                    response.body = response.body ? JSON.parse(response.body) : {}
                    log && console.log(`httpRequest response: ${JSON.stringify(response)}`);

                    if (response.statusCode !== 200) {
                        return reject(response);
                    }

                    return resolve(response);
                });
            })

            req.on('error', (error) => {
                return reject(error);
            })

            req.write(bodyString)
            req.end();
        }
        catch (err) {
            return reject(err);
        }
    })

}

const _makeRequest = makeRequest;
export { _makeRequest as makeRequest };