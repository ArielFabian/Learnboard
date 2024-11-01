import React, { useEffect, useMemo, useRef, useState, Suspense } from "react";

// Componente para la pantalla de unirse a la reunión
function JoinScreen({ getMeetingAndToken }) {
  const [meetingId, setMeetingId] = useState(null);

  const onClick = async () => {
    await getMeetingAndToken(meetingId);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Meeting Id"
        onChange={(e) => setMeetingId(e.target.value)}
      />
      <button onClick={onClick}>Join</button>
      {" or "}
      <button onClick={onClick}>Create Meeting</button>
    </div>
  );
}

// Vista de cada participante en la videollamada
function ParticipantView({ participantId, useParticipant }) {
  const micRef = useRef(null);
  const { webcamStream, micStream, webcamOn, micOn, isLocal, displayName } = useParticipant(participantId);

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
        micRef.current.play().catch((error) => console.error("Error al reproducir audio", error));
      } else {
        micRef.current.srcObject = null;
      }
    }
  }, [micStream, micOn]);

  return (
    <div>
      <p>
        Participant: {displayName} | Webcam: {webcamOn ? "ON" : "OFF"} | Mic: {micOn ? "ON" : "OFF"}
      </p>
      <audio ref={micRef} autoPlay playsInline muted={isLocal} />
      {webcamOn && (
        <Suspense fallback={<p>Cargando video...</p>}>
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
            onError={(err) => console.error("Error en el video del participante", err)}
          />
        </Suspense>
      )}
    </div>
  );
}

// Controles de la reunión
function Controls({ useMeeting }) {
  const { leave, toggleMic, toggleWebcam } = useMeeting();

  return (
    <div>
      <button onClick={leave}>Leave</button>
      <button onClick={toggleMic}>Toggle Mic</button>
      <button onClick={toggleWebcam}>Toggle Webcam</button>
    </div>
  );
}

// Vista de la reunión completa
function MeetingView({ meetingId, onMeetingLeave, useMeeting, useParticipant }) {
  const [joined, setJoined] = useState(false);
  const { join, participants } = useMeeting({
    onMeetingJoined: () => setJoined(true),
    onMeetingLeft: onMeetingLeave,
  });

  const joinMeeting = () => {
    setJoined(true);
    join();
  };

  return (
    <div className="container">
      <h3>Meeting Id: {meetingId}</h3>
      {joined ? (
        <div>
          <Controls useMeeting={useMeeting} />
          {[...participants.keys()].map((participantId) => (
            <ParticipantView participantId={participantId} key={participantId} useParticipant={useParticipant} />
          ))}
        </div>
      ) : (
        <button onClick={joinMeeting}>Join</button>
      )}
    </div>
  );
}

// Componente principal
function App() {
  const [meetingId, setMeetingId] = useState(null);
  const [sdk, setSdk] = useState(null);
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0MGVjNzBmYS0zOThkLTRkNTAtYmM5ZC00MmI3NzM3YTMyOTMiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMDE1OTQzNSwiZXhwIjoxNzM3OTM1NDM1fQ.QNF_OU-u0VLf_-K3xno5uS1yRwc7M4UiWP5kE_A1B68";

  useEffect(() => {
    // Cargar SDK de manera dinámica
    import("@videosdk.live/react-sdk").then((module) => {
      setSdk({
        MeetingProvider: module.MeetingProvider,
        useMeeting: module.useMeeting,
        useParticipant: module.useParticipant,
      });
    });
  }, []);

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

  const onMeetingLeave = () => {
    setMeetingId(null);
  };

  if (!sdk) return <p>Cargando SDK...</p>;

  return token && meetingId ? (
    <Suspense fallback={<p>Cargando reunión...</p>}>
      <sdk.MeetingProvider
        config={{
          meetingId,
          micEnabled: true,
          webcamEnabled: true,
          name: "C.V. Raman",
          debugMode: true,
        }}
        token={token}
      >
        <MeetingView
          meetingId={meetingId}
          onMeetingLeave={onMeetingLeave}
          useMeeting={sdk.useMeeting}
          useParticipant={sdk.useParticipant}
        />
      </sdk.MeetingProvider>
    </Suspense>
  ) : (
    <JoinScreen getMeetingAndToken={getMeetingAndToken} />
  );
}

export default App;
