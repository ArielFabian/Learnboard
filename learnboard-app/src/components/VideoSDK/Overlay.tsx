"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  MeetingProvider,
  MeetingConsumer,
  useMeeting,
  useParticipant,
} from "@videosdk.live/react-sdk";
import ReactPlayer from "react-player";
import styles from './Overlay.module.css';
import {FaMicrophone, FaCamera, FaPhoneSlash} from 'react-icons/fa'
import { ActionIcon, Button, TextInput, Tooltip } from '@mantine/core';

// Componente para la pantalla de unirse a la reunión
function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);

  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div className={styles.centeredContainer}>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => setMeetingId(e.target.value)}
      />
      <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button>
      <h4 className={styles.centeredText}>Creando tu videollamada, espera ...</h4>
    </div>
  );
}

function ParticipantView(props) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } =
    useParticipant(props.participantId);

  const videoStream = useMemo(() => {
    if (webcamOn && webcamStream) {
      const mediaStream = new MediaStream();
      mediaStream.addTrack(webcamStream.track);
      return mediaStream;
    }
  }, [webcamStream, webcamOn]);

  useEffect(() => {
    if (micRef.current) {
      if (micOn && micStream) {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(micStream.track);

        micRef.current.srcObject = mediaStream;
        micRef.current
          .play()
          .catch((error) =>
            console.error("videoElem.current.play() failed", error)
          );
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic:{" "}
        {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <ReactPlayer
          //
          playsinline // extremely crucial prop
          pip={false}
          light={false}
          controls={false}
          muted={true}
          playing={true}
          //
          url={videoStream}
          //
          height={"300px"}
          width={"300px"}
          onError={(err) => {
            console.log(err, "participant video error");
          }}
        />
      )}
    </div>
  );
}

// Controles de la reunión
function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  return (
    <div className={styles.divUl}>
      <Tooltip position="bottom-start" label="Abandonar llamada" offset={16}>
        <ActionIcon
          color="dark"
          variant="gradient"
          size="md"
          onClick={() => leave()}
        >
          <FaPhoneSlash />
        </ActionIcon>
      </Tooltip>
      <Tooltip position="bottom-start" label="Mutear" offset={16}>
        <ActionIcon
          color="dark"
          variant="gradient"
          size="md"
          onClick={() => toggleMic()}
        >
          <FaMicrophone />
        </ActionIcon>
      </Tooltip>
      <Tooltip position="bottom-start" label="Encender camara" offset={16}>
        <ActionIcon
          color="dark"
          variant="gradient"
          size="md"
          onClick={() => toggleWebcam()}
        >
          <FaCamera />
        </ActionIcon>
      </Tooltip>
    </div>
  );
}

function MeetingView(props) {
  const [joined, setJoined] = useState<null | "JOINING" | "JOINED">(null);
  //Get the method which will be used to join the meeting.
  //We will also get the participants list to display all participants
  const { join, participants } = useMeeting({
    //callback for when meeting is joined successfully
    onMeetingJoined: () => {
      setJoined("JOINED");
    },
    //callback for when meeting is left
    onMeetingLeft: () => {
      props.onMeetingLeave();
    },
  });

  const joinMeeting = () => {
    setJoined("JOINING");
    join();
  };

  return (
    <div className="container">
    <h3>Meeting Id: {props.meetingId}</h3>
    {joined && joined == "JOINED" ? (
      <div>
        <div className={styles.buttonRow}>
          <Controls />
        </div>
        <div className={styles.textRow}>
          {[...participants.keys()].map((participantId) => (
            <ParticipantView
              participantId={participantId}
              key={participantId}
            />
          ))}
        </div>
      </div>
    ) : joined && joined == "JOINING" ? (
      <p>Joining the meeting...</p>
    ) : (
      <button onClick={joinMeeting}>Join</button>
    )}
  </div>
  );
}

// Componente principal
function App() {
  const [meetingId, setMeetingId] = useState(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0MGVjNzBmYS0zOThkLTRkNTAtYmM5ZC00MmI3NzM3YTMyOTMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMDE1OTQzNSwiZXhwIjoxNzM3OTM1NDM1fQ.QNF_OU-u0VLf_-K3xno5uS1yRwc7M4UiWP5kE_A1B68";;
  const [userName, setUserName] = useState("Nombre de usuario");
  const getMeetingAndToken = async (id) => {
    const meetingId = id == null ? await createMeeting() : id;
    setMeetingId(meetingId);
    console.log("meetingId: ", meetingId);
    console.log("token: ", token);
  };

  const createMeeting = async () => {
    const response = await fetch("http://localhost:8000/zoom/meeting", { method: "POST" });
    const data = await response.json();
    return data.meetingId;
  };

  // useEffect(() => {
  //   if (!meetingId || !token) {
  //     setTimeout(() => {
  //       getMeetingAndToken(null);
  //     }, 3000);
  //   }
  // });

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  return token && meetingId ? (
    <MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: userName,
          debugMode: true,
        }}
        token={token}
      >
        <div className={styles.videocallContainer}>
          <MeetingView
            meetingId={meetingId}
            onMeetingLeave={onMeetingLeave}
            useMeeting={useMeeting}
            useParticipant={useParticipant}
          />
        </div>
      </MeetingProvider>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default App;
