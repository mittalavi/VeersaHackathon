import { AgoraVideoPlayer } from "agora-rtc-react";
import React, { useEffect, useState } from "react";
import recognizeMic from "watson-speech/speech-to-text/recognize-microphone";
import firebase from "../../../firebase";
import Controls from "./Controls";

const storageRef = firebase.storage().ref();

const Video = ({
  useClient,
  useMicrophoneAndCameraTracks,
  channelName,
  inCall,
  setInCall,
  appId,
  token,
  sessionId,
  history,
}) => {
  const [users, setUsers] = useState([]);
  const [, setStart] = useState(false);
  const [text, setText] = useState([""]);
  const [displayText, setDisplayText] = useState([""]);
  const client = useClient();
  let endpoint = "https://shrink4shrink.herokuapp.com";
  // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  //   endpoint = "http://localhost:3001";
  // }
  const { ready, tracks } = useMicrophoneAndCameraTracks();
  console.log(token);
  useEffect(() => {
    const init = async (name) => {
      client.on("user-published", async (user, mediaType) => {
        await client.subscribe(user, mediaType);
        console.log("subscribe success");
        if (mediaType === "video") {
          setUsers((prevUsers) => {
            return [user];
          });
          console.log(users);
        }
        if (mediaType === "audio") {
          user.audioTrack?.play();
        }
      });

      client.on("user-unpublished", (user, type) => {
        console.log("unpublished", user, type);
        if (type === "audio") {
          user.audioTrack?.stop();
        }
        if (type === "video") {
          setUsers((prevUsers) => {
            return prevUsers.filter((User) => User.uid !== user.uid);
          });
        }
      });

      client.on("user-left", (user) => {
        console.log("leaving", user);
        setUsers((prevUsers) => {
          return prevUsers.filter((User) => User.uid !== user.uid);
        });
      });

      await client.join(appId, name, token, null);
      if (tracks) await client.publish([tracks[0], tracks[1]]);
      setStart(true);
    };
    if (ready && tracks) {
      console.log("init ready");
      init(channelName);
    }
  }, [channelName, ready, tracks, client, appId, token, users]);
  useEffect(() => {
    const s2t = () => {
      fetch(`${endpoint}/api/speech-to-text/token`)
        .then((response) => response.json())
        .then((token) => {
          console.log(token);
          var stream = recognizeMic({
            accessToken: token.accessToken,
            url: token.url,
            objectMode: true, // send objects instead of text
            extractResults: true, // convert {results: [{alternatives:[...]}], result_index: 0} to {alternatives: [...], index: 0}
            format: false, // optional - performs basic formatting on the results such as capitals an periods
          });
          console.log(stream);
          /**
           * Prints the users speech to the console
           * and assigns the text to the state.
           */
          stream.on("data", (data) => {
            if (data.final && data.alternatives[0].confidence > 0.5) {
              setText((prev) => {
                return [...prev, data.alternatives[0].transcript];
              });
              setDisplayText((prev) => {
                return [...prev, data.alternatives[0].transcript];
              });
            }
            console.log(data);
          });
          stream.on("error", function (err) {
            console.log(err);
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    s2t();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inCall]);
  const generateReport = async () => {
    console.log(text);
    let data = await fetch(`http://localhost:3001/api/summary`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: text.join(", "),
      }),
    });
    data = await data.json();
    console.log(data);
    const file = new Blob([text], {
      type: "text/plain",
    });
    let url;
    try {
      var mtRef = await storageRef.child(
        "notes-" + JSON.parse(localStorage.getItem("user"))._id + ".txt"
      );
      await mtRef.put(file);
      url = await mtRef.getDownloadURL();
      console.log(url);
    } catch (e) {
      console.log(e);
    }
    console.log(url);
    let response = await fetch(
      "http://localhost:3001/api/add_notes",
      {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: JSON.parse(localStorage.getItem("user")).email,
          id: sessionId,
          notes: url,
        }),
      }
    );
    response = response.json();
    console.log(response);
  };
  return (
    <div>
      {tracks && (
        <AgoraVideoPlayer
          videoTrack={tracks[1]}
          style={{
            height: "100vh",
            width: "100vw",
            // zIndex: -1,
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {ready && tracks && (
            <Controls
              tracks={tracks}
              setStart={setStart}
              setInCall={setInCall}
              client={client}
              sessionId={sessionId}
              history={history}
              generateReport={generateReport}
            />
          )}
          {users.length > 0 &&
            users.map((user, i) => {
              console.log(users);
              return (
                <AgoraVideoPlayer
                  key={user.uid}
                  videoTrack={user.videoTrack}
                  style={{
                    height: "30%",
                    width: "320px",
                    zIndex: 2,
                    position: "absolute",
                    bottom: "10%",
                    right: 0,
                  }}
                />
              );
            })}
        </AgoraVideoPlayer>
      )}
      <div
        style={{
          fontSize: "30px",
          position: "absolute",
          bottom: "10%",
          left: 0,
          marginLeft: "20px",
          backgroundColor: "#000",
        }}
      >
        <p style={{ color: "#fff" }}>{displayText.splice(-1, 10).join(" ")}</p>
      </div>
      <button
        onClick={generateReport}
        style={{ marginTop: 20 }}
        type="button"
        class="btn btn-success"
      >
        Success
      </button>
    </div>
  );
};

export default Video;
