import React, { useState } from "react"; //useEffect,
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";

const Controls = ({
  tracks,
  setStart,
  setInCall,
  client,
  sessionId,
  history,
  generateReport,
}) => {
  const [trackState, setTrackState] = useState({ video: true, audio: true });
  const mute = async (type) => {
    if (type === "audio") {
      await tracks[0].setEnabled(!trackState.audio);
      setTrackState((ps) => {
        return { ...ps, audio: !ps.audio };
      });
    } else if (type === "video") {
      await tracks[1].setEnabled(!trackState.video);
      setTrackState((ps) => {
        return { ...ps, video: !ps.video };
      });
    }
  };

  // const leaveChannel = async () => {
  //   await client.leave();
  //   client.removeAllListeners();
  //   // we close the tracks to perform cleanup
  //   tracks[0].close();
  //   tracks[1].close();
  //   setStart(false);
  //   setInCall(false);
  //   history.push("/upcoming-sessions");
  // };

  const endSession = async () => {
    generateReport();
    let data = await fetch(
      `http://localhost:3001api/close_session`,
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("user")).email,
          id: sessionId,
        }),
      }
    );
    data = await data.json();
    console.log(data);
    await client.leave();
    client.removeAllListeners();
    // we close the tracks to perform cleanup
    tracks[0].close();
    tracks[1].close();
    setStart(false);
    setInCall(false);
    if (JSON.parse(localStorage.getItem("user")).doctor) {
      history.push(`/doctor-feedback/${sessionId}`);
    } else {
      history.push(`/patient-feedback/${sessionId}`);
    }
  };

  return (
    <div
      className="row"
      style={{
        width: "100%",
        height: "10%",
        display: "flex",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "#000",
        position: "absolute",
        bottom: 0,
        zIndex: 1,
        marginLeft: 0,
      }}
    >
      <div
        className="col-md-2"
        style={{
          height: 40,
          width: 40,
          backgroundColor: "#439DF6",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => mute("audio")}
      >
        {trackState.audio ? <MicOffIcon /> : <MicIcon />}
      </div>
      <div
        className="col-md-2"
        style={{
          height: 40,
          width: 40,
          backgroundColor: "#439DF6",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => mute("video")}
      >
        {trackState.video ? <VideocamOffIcon /> : <VideocamIcon />}
      </div>
      {/* <div
        className="col-md-2"
        style={{
          height: 40,
          width: 40,
          backgroundColor: "#439DF6",
          borderRadius: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
        onClick={() => leaveChannel()}
      >
        <CallEndIcon />
      </div> */}
      <div
        style={{
          height: 40,
          width: 95,
          backgroundColor: "tomato",
          borderRadius: 5,
          display: "flex",
        }}
        onClick={endSession}
      >
        <p
          style={{
            fontSize: 13,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 7,
            color: "#fff",
            cursor: "pointer",
          }}
        >
          End Session
        </p>
      </div>
    </div>
  );
};

export default Controls;
