import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import React, { useState, useEffect } from "react";
import Video from "./Video";

const config = { mode: "rtc", codec: "vp8" };
const appId = "370cc8b63bac46d381f17915984b033d";
const VideoCall = (props) => {
  console.log(props);
  const { sessionId } = props.match.params;
  const useClient = createClient(config);
  const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  const [inCall, setInCall] = useState(false);
  const [token, setToken] = useState(null);
  useEffect(() => {
    const init = async () => {
      let data = await fetch(
        `http://localhost:3001/api/agora-call/token?channel=${sessionId}`
      );
      data = await data.json();
      console.log(data);
      setToken(data.token);
    };
    init();
    setInCall(true);
  }, [sessionId]);
  // const onClickHandler = () => {

  // };
  return (
    <>
      {inCall && token ? (
        <>
          <Video
            useClient={useClient}
            useMicrophoneAndCameraTracks={useMicrophoneAndCameraTracks}
            appId={appId}
            token={token}
            inCall={inCall}
            setInCall={setInCall}
            channelName={sessionId}
            sessionId={sessionId}
            history={props.history}
          />
        </>
      ) : (
        <div className="row">
          {/* <div>
            <button onCli} type="button" id="join">
              JOIN
            </button>
            <button onClick={null} type="button" id="leave">
              LEAVE
            </button>
          </div> */}
        </div>
      )}
    </>
  );
};

export default VideoCall;
