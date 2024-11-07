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
import { ActionIcon, Button, TextInput, Tooltip, Center, Box, Title, Space} from '@mantine/core';

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
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <>
          <ReactPlayer
            playsinline
            pip={false}
            light={false}
            controls={false}
            muted={true}
            playing={true}
            url={videoStream}
            height={"300px"}
            width={"300px"}
            onError={(err) => {
              console.log(err, "participant video error");
            }}
          />
          <hr></hr>
        </>
      ) ? (
        <>
          <h1 className={styles.initials}>{displayName}</h1>
          <hr></hr>
        </>
      ) : (
        <>
          <h1 className={styles.initials}>{displayName}</h1>
          <hr></hr>
        </>
      )}
    </div>
  );
}

function Controls() {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  const [micOn, setMicOn] = useState(false);
  const [webcamOn, setWebcamOn] = useState(false);

  const handleToggleMic = () => {
    toggleMic();
    setMicOn((prevMicOn) => !prevMicOn);
  };

  const handleToggleWebcam = () => {
    toggleWebcam();
    setWebcamOn((prevWebcamOn) => !prevWebcamOn);
  };

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
          size="md"
          onClick={handleToggleMic}
          style={{
            backgroundColor: micOn ? "red" : "green",
            color: "white",
            borderRadius: "15px",
            padding: "10px"
          }}
        >
          <FaMicrophone />
        </ActionIcon>
      </Tooltip>

      <Tooltip position="bottom-start" label="Encender cámara" offset={16}>
        <ActionIcon
          size="md"
          onClick={handleToggleWebcam}
          style={{
            backgroundColor: webcamOn ? "green" : "red",
            color: "white",
            borderRadius: "15px",
            padding: "10px"
          }}
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

  return joined && joined == "JOINED" ? (
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
    <div className={styles.centeredContainer}>
      <h3 className={styles.centeredText}>Ingresando...</h3>
    </div>
  ) : (
    <Center>
      <Button onClick={joinMeeting}>Unirse a la reunión</Button>
    </Center>
  );
}

// Componente principal
const App = ({meetingId}) => {
  // const [meetingId, setMeetingId] = useState(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0MGVjNzBmYS0zOThkLTRkNTAtYmM5ZC00MmI3NzM3YTMyOTMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMDE1OTQzNSwiZXhwIjoxNzM3OTM1NDM1fQ.QNF_OU-u0VLf_-K3xno5uS1yRwc7M4UiWP5kE_A1B68";;
  const [userName, setUserName] = useState("");
  const [isLeaving, setIsLeaving] = useState(false);
  const [hasUsername, setHasUsername] = useState(false);

  const onMeetingLeave = () => {
    setIsLeaving(true);
  };

  const handleUserName = () => {
    setUserName(userName);
    setHasUsername(true);
  }

  return !isLeaving && hasUsername ? (
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
  ) : token && meetingId && isLeaving ? (
    <div className={styles.centeredContainer}>
      <h1 className={styles.centeredText}>Gracias por asistir a la reunión. ¡Hasta luego!</h1>
    </div>
  ) : !hasUsername ? (
    <div className={styles.centeredContainer}>
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Box>
        <Title ta="center" order={1} color="white">¿Como quieres ser llamado en la videollamada?</Title>
      </Box>
      <Space h="xl" />
      <Center>
        <TextInput type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Escribe tu nombre:" />
        <Button onClick={handleUserName}>Aceptar</Button>
      </Center>
    </div>
  ) : (
    <div>
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Space h="xl" />
      <Box>
        <Title ta="center" order={1} color="white">Cargando...</Title>
      </Box>
    </div>
  );
}

export default App;
