const KJUR = require('jsrsasign')
require('dotenv').config();
const base64 = require('base-64')

function generateSignature(sessionKey, roleType) {
    const iat = Math.floor(Date.now() / 1000) - 30;
    const exp = iat + 60 * 60 * 2; // La firma será válida por 2 horas

    const oHeader = { alg: 'HS256', typ: 'JWT' }; 

    const sdkKey = process.env.SDK_KEY;
    const sdkSecret = process.env.SDK_SECRET;

    const oPayload = {
        sdkKey,
        iat,
        exp,
        meetingNumber: sessionKey,
        role: roleType
    };

    const sHeader = JSON.stringify(oHeader);
    const sPayload = JSON.stringify(oPayload);

    const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, sdkSecret);
    return signature;
}

async function generateTokenMeeting() {
    const credentials = base64.encode('3K9dJnqYSteq_MagaxAmGg:qYJSn8AgwAAsOFvBX2GFLR2HnEwJKz3e');
    const response = await fetch('https://zoom.us/oauth/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${credentials}`
        },
        body: new URLSearchParams({
            grant_type: 'account_credentials',
            account_id: 'jWmsahToQCqtROG15g-0SQ'
        }).toString()
    });
    const data = await response.json();
    return data.access_token;
    
}

async function createMeeting(){
    try {
        const token = await generateTokenMeeting();
        const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                agenda: "React Meeting",
                type: 2,
                default_password: false,
                duration: 60,
                settings: {
                    host_video: true,
                    participant_video: true,
                    join_before_host: true,
                    allow_multiple_devices: true,
                    waiting_room: false
                }
            })
        });
        const meetingData = await response.json();
        return meetingData;
    } catch (error) {
        throw new Error(error); 
    }
}

module.exports = { generateSignature, createMeeting };