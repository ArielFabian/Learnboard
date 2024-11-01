// app/page.jsx
"use client"
import { useEffect } from "react";

export default function ZoomMeeting() {
  useEffect(() => {
    initZoomApp();
  }, [])

  return (
    <div id="meetingSDKElement">ZOOM HERE</div>
  )
}
let isJoining = false;
async function initZoomApp() {
  if (isJoining) return;
  isJoining = true;
  const { client, clientConf } = await initClient();
  startMeeting(client, clientConf);
  isJoining = false;
}

async function initClient() {
  const ZoomMtgEmbedded = await (await import('@zoomus/websdk/embedded')).default;
  const client = ZoomMtgEmbedded.createClient();
  // const meeting = await createMeeting();
  // const meetingNumber:number = meeting.id;
  // console.log("meetingNumber: ", meetingNumber);
  const clientConf = {
    authEndpoint: "http://localhost:8000/api/zoom/signature",
    sdkKey: "JTr5VJncSpOAumB0wos1Xw",
    signature: "",
    meetingNumber: "79837041877",
    role: 0, // 0 implies client, 1 implies host
    userName: 'React', // username: user need to input,
  }

// https://github.com/zoom/meetingsdk-auth-endpoint-sample
  const signature = await getSignature(clientConf.meetingNumber, clientConf.role);
  clientConf.signature = signature;

  const meetingSDKElement = document.getElementById('meetingSDKElement');
  client.init({
    debug: true,
    zoomAppRoot: meetingSDKElement!,
    language: 'en-US',
    customize: {
      meetingInfo: ['topic', 'host', 'mn', 'pwd', 'telPwd', 'invite', 'participant', 'dc', 'enctype'],
      toolbar: {
        buttons: [
          {
            text: 'Custom Button',
            className: 'CustomButton',
            onClick: () => {
              console.log('Hi, mom');
            }
          }
        ]
      }
    }
  });

  return { client: client, clientConf: clientConf };
}

// fetch signature to your auth endpoint. Check the sample repo.
// https://github.com/zoom/meetingsdk-auth-endpoint-sample
async function getSignature(meetingNumber: string, role: number) {
  const data = await fetch("http://localhost:8000/zoom/signature", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      meetingNumber,
      role
    })
  })
  const response  = await data.json();
  const signature = response.signature;
  console.log(signature);
  return signature;
}

// async function createMeeting(){
//   const data = await fetch("http://localhost:8000/zoom/meeting", {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//     }
//   })
//   const response  = await data.json();
//   const meeting = response.meeting;
//   return meeting;
// }

function startMeeting(client, clientConf) {
  const meetingNumber: string  = clientConf.meetingNumber.toString();
  console.log("meetingNumber: ", meetingNumber, typeof meetingNumber);
  try{
    client.join({
      signature: clientConf.signature,
      sdkKey: clientConf.sdkKey,
      meetingNumber: meetingNumber,
      userName: clientConf.userName,
    })
  } catch (e) {
    console.error(e);
  }
}
