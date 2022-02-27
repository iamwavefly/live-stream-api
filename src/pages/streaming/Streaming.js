import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import StreamingModals from '../../components/modals/StreamingModals'
// import ShowSuccessModal from '../../components/modals/ShowSuccessModal'
import Navbar from "../../components/navbar/Navbar"
import Sidebar from "../../components/sidebar/Sidebar"
import './Streaming.css'


/**
 * Checks whether the argument is an object
 * @param {any} o
 */
 function isObject(o) {
    return o && !Array.isArray(o) && Object(o) === o;
  }
  
  /**
   * Checks whether constraints are valid
   * @param {MediaStreamConstraints} mediaType
   */
  function validateMediaTrackConstraints(mediaType) {
    let supportedMediaConstraints = null;
  
    if (navigator.mediaDevices) {
      supportedMediaConstraints = navigator.mediaDevices.getSupportedConstraints();
    }
  
    if (supportedMediaConstraints === null) {
      return;
    }
  
    let unSupportedMediaConstraints = Object.keys(mediaType).filter(
      (constraint) => !supportedMediaConstraints[constraint]
    );
  
    if (unSupportedMediaConstraints.length !== 0) {
      let toText = unSupportedMediaConstraints.join(',');
      console.error(
        `The following constraints ${toText} are not supported on this browser.`
      );
    }
  }
  
  const noop = () => {};
  
  /**
   *
   * @callback Callback
   * @param {Blob} blob
   *
   * @callback ErrorCallback
   * @param {Error} error
   *
   * @typedef MediaRecorderProps
   * @type {object}
   * @property {BlobPropertyBag} blobOptions
   * @property {boolean} recordScreen
   * @property {function} onStart
   * @property {Callback} onStop
   * @property {Callback} onDataAvailable
   * @property {ErrorCallback} onError
   * @property {object} mediaRecorderOptions
   * @property {MediaStreamConstraints} mediaStreamConstraints
   *
   * @typedef MediaRecorderHookOptions
   * @type {object}
   * @property {Error} error
   * @property {string} status
   * @property {Blob} mediaBlob
   * @property {boolean} isAudioMuted
   * @property {function} stopRecording,
   * @property {function} getMediaStream,
   * @property {function} clearMediaStream,
   * @property {function} startRecording,
   * @property {function} pauseRecording,
   * @property {function} resumeRecording,
   * @property {function} muteAudio
   * @property {function} unMuteAudio
   * @property {MediaStream} liveStream
   *
   * @param {MediaRecorderProps}
   * @returns {MediaRecorderHookOptions}
   */
  function useMediaRecorder({
    blobOptions,
    recordScreen,
    onStop = noop,
    onStart = noop,
    onError = noop,
    onDataAvailable = noop,
    mediaRecorderOptions,
    mediaStreamConstraints = {}
  }) {
    let mediaChunks = React.useRef([]);
    let mediaStream = React.useRef(null);
    let mediaRecorder = React.useRef(null);
    let [error, setError] = React.useState(null);
    let [status, setStatus] = React.useState('idle');
    let [mediaBlob, setMediaBlob] = React.useState(null);
    let [isAudioMuted, setIsAudioMuted] = React.useState(false);
  
    async function getMediaStream() {
      if (error) {
        setError(null);
      }
  
      setStatus('acquiring_media');
  
      try {
        let stream;
  
        if (recordScreen) {
          stream = await window.navigator.mediaDevices.getDisplayMedia(
            mediaStreamConstraints
          );
        } else {
          stream = await window.navigator.mediaDevices.getUserMedia(
            mediaStreamConstraints
          );
        }
  
        if (recordScreen && mediaStreamConstraints.audio) {
          let audioStream = await window.navigator.mediaDevices.getUserMedia({
            audio: mediaStreamConstraints.audio
          });
  
          audioStream
            .getAudioTracks()
            .forEach((audioTrack) => stream.addTrack(audioTrack));
        }
  
        mediaStream.current = stream;
        setStatus('ready');
      } catch (err) {
        setError(err);
        setStatus('failed');
      }
    }
  
    function clearMediaStream() {
      if (mediaRecorder.current) {
        mediaRecorder.current.removeEventListener(
          'dataavailable',
          handleDataAvailable
        );
        mediaRecorder.current.removeEventListener('stop', handleStop);
        mediaRecorder.current.removeEventListener('error', handleError);
        mediaRecorder.current = null;
      }
  
      if (mediaStream.current) {
        mediaStream.current.getTracks().forEach((track) => track.stop());
        mediaStream.current = null;
        mediaChunks.current = [];
      }
    }
  
    async function startRecording() {
      if (error) {
        setError(null);
      }
  
      if (!mediaStream.current) {
        await getMediaStream();
      }
  
      mediaChunks.current = [];
  
      if (mediaStream.current) {
        mediaRecorder.current = new MediaRecorder(
          mediaStream.current,
          mediaRecorderOptions
        );
        mediaRecorder.current.addEventListener(
          'dataavailable',
          handleDataAvailable
        );
        mediaRecorder.current.addEventListener('stop', handleStop);
        mediaRecorder.current.addEventListener('error', handleError);
        mediaRecorder.current.start();
        setStatus('recording');
        onStart();
      }
    }
  
    function handleDataAvailable(e) {
      if (e.data.size) {
        mediaChunks.current.push(e.data);
      }
      onDataAvailable(e.data);
    }
  
    function handleStop() {
      let [sampleChunk] = mediaChunks.current;
      let blobPropertyBag = Object.assign(
        { type: sampleChunk.type },
        blobOptions
      );
      let blob = new Blob(mediaChunks.current, blobPropertyBag);
  
      setStatus('stopped');
      setMediaBlob(blob);
      onStop(blob);
    }
  
    function handleError(e) {
      setError(e.error);
      setStatus('idle');
      onError(e.error);
    }
  
    function muteAudio(mute) {
      setIsAudioMuted(mute);
  
      if (mediaStream.current) {
        mediaStream.current.getAudioTracks().forEach((audioTrack) => {
          audioTrack.enabled = !mute;
        });
      }
    }
  
    function pauseRecording() {
      if (mediaRecorder.current && mediaRecorder.current.state === 'recording') {
        setStatus('paused');
        mediaRecorder.current.pause();
      }
    }
  
    function resumeRecording() {
      if (mediaRecorder.current && mediaRecorder.current.state === 'paused') {
        mediaRecorder.current.resume();
        setStatus('recording');
      }
    }
  
    function stopRecording() {
      if (mediaRecorder.current) {
        setStatus('stopping');
        mediaRecorder.current.stop();
        // not sure whether to place clean up in useEffect?
        // If placed in useEffect the handler functions become dependencies of useEffect
        mediaRecorder.current.removeEventListener(
          'dataavailable',
          handleDataAvailable
        );
        mediaRecorder.current.removeEventListener('stop', handleStop);
        mediaRecorder.current.removeEventListener('error', handleError);
        mediaRecorder.current = null;
        clearMediaStream();
      }
    }
  
    React.useEffect(() => {
      if (!window.MediaRecorder) {
        throw new ReferenceError(
          'MediaRecorder is not supported in this browser. Please ensure that you are running the latest version of chrome/firefox/edge.'
        );
      }
  
      if (recordScreen && !window.navigator.mediaDevices.getDisplayMedia) {
        throw new ReferenceError(
          'This browser does not support screen capturing'
        );
      }
  
      if (isObject(mediaStreamConstraints.video)) {
        validateMediaTrackConstraints(mediaStreamConstraints.video);
      }
  
      if (isObject(mediaStreamConstraints.audio)) {
        validateMediaTrackConstraints(mediaStreamConstraints.audio);
      }
  
      if (mediaRecorderOptions && mediaRecorderOptions.mimeType) {
        if (!MediaRecorder.isTypeSupported(mediaRecorderOptions.mimeType)) {
          console.error(
            `The specified MIME type supplied to MediaRecorder is not supported by this browser.`
          );
        }
      }
    }, [mediaStreamConstraints, mediaRecorderOptions, recordScreen]);
  
    return {
      error,
      status,
      mediaBlob,
      setMediaBlob,
      isAudioMuted,
      stopRecording,
      getMediaStream,
      startRecording,
      pauseRecording,
      resumeRecording,
      clearMediaStream,
      muteAudio: () => muteAudio(true),
      unMuteAudio: () => muteAudio(false),
      get liveStream() {
        if (mediaStream.current) {
          return new MediaStream(mediaStream.current.getVideoTracks());
        }
        return null;
      }
    };
  }
  
  /**
   * @typedef LiveStreamPreviewProps
   * @type {object}
   * @property {MediaStream} stream
   *
   * @param {LiveStreamPreviewProps}
   */
  function LiveStreamPreview({ stream }) {
    let videoPreviewRef = React.useRef();
  
    React.useEffect(() => {
      if (videoPreviewRef.current && stream) {
        videoPreviewRef.current.srcObject = stream;
      }
    }, [stream]);
  
    if (!stream) {
      return null;
    }
  
    return <video ref={videoPreviewRef} autoPlay class="recorded_video_tag"/>;
  }
  
  /**
   * @typedef PlayerProps
   * @type {object}
   * @property {Blob} srcBlob
   *
   * @param {PlayerProps}
   */
  function Player({ srcBlob }) {
    if (!srcBlob) {
      return null;
    }
    return (
      <video
        src={URL.createObjectURL(srcBlob)}
        class="recorded_video_tag"
        autoPlay
        controls
      />
    );
  }


const Streaming = () => {
    const [modal, setModal] = useState(false);
    const Toggle = () => setModal(!modal);

    let [recordScreen, setRecordScreen] = React.useState(false);
    const [recordingState, setRecordingState] = React.useState(false);
    const [microphoneOn, setMicrophoneOn] = React.useState(true);
    const [recordingDone, setRecordingDone] = React.useState(false);
    const [isCountdownDown, setIsCountdownDown] = React.useState(false);

    
      let {
        status,
        liveStream,
        mediaBlob,
        setMediaBlob,
        // pauseRecording,
        // resumeRecording,
        stopRecording,
        getMediaStream,
        startRecording,
        clearMediaStream,
        muteAudio,
      } = useMediaRecorder({
        recordScreen,
        mediaStreamConstraints: { audio: true, video: true }
      });
    
      //eslint-disable-next-line
      React.useEffect(() => clearMediaStream, []);
      
      const fmtMSS = (s) => {
        return(s-(s%=60))/60+(9<s?':':':0')+s
      }
    
      const startTimer = () => {
        let seconds = 0;
        window.video_seconds = setInterval(() => {
          seconds += 1
          document.querySelector('#currentCount_selector').innerHTML = fmtMSS(seconds)
        }, 1000)
      }
    
      const stopTimer = () => {
        clearInterval(window.video_seconds)
      }
    
      const startRecordingCountdown = () => {
        setIsCountdownDown(true)
        window.CountdownSeconds = 3;
        window.countdownTimeTicker = setInterval(() => {
          window.CountdownSeconds -= 1
          document.querySelector('#countdownTimeTicker').innerHTML = window.CountdownSeconds
        }, 1000);
        setTimeout(() => {
          startMediaRecord()
        }, 1500);
        setTimeout(() => {
          clearInterval(window.countdownTimeTicker)
          setIsCountdownDown(false)
        }, 3000);
      }
    
      const startMediaRecord = async () => {
          setMediaBlob(null);
          muteAudio(false)
          await getMediaStream();
          startRecording();
          setTimeout(() => {
            startTimer()
          }, 1000);
      }
    
      const stopMediaRecord = () => {
        stopRecording();
        setRecordingDone(true);
        stopTimer()
      }
    
      const stopRecordingAndClose = () => {
        setMediaBlob(null);
        stopRecording()
        setRecordingState(false)
        setRecordingDone(false)
        stopTimer()
      }
    
      const muteRecording = () => {
        setMicrophoneOn(false);
        muteAudio(true)
      }
    
      const unmuteRecording = () => {
        setMicrophoneOn(true);
        muteAudio(false)
      }
    
      const rejectRecording = () => {
        setMediaBlob(null)
        stopRecording()
        setRecordingDone(false)
      }
      const acceptRecording = () => {
          //convert blob to base64
            let reader = new FileReader();
            reader.readAsDataURL(mediaBlob);
            reader.onloadend = () => {
                let base64data = reader.result;
                console.log(base64data)
                //send base64 to server
               
            }
            stopRecordingAndClose()
      }

    return (
        <>
            <div className="mainContent">
                <div className="left">
                    <Sidebar />
                </div>
                <div className="right">
                    <div className="navBar">
                        <Navbar />
                    </div>

                    <div className="splitScreen">
                        <div className="splitLeft">

                        {recordingState ? 
                        
                        (
                            <div className='screen'>
            
                            {isCountdownDown && (
                              <div class="countdownCover">
                                <div>
                                  <h1 id="countdownTimeTicker">3</h1>
                                  <p>Get ready, recording starts soon 🤔</p>
                                  <button>Stop Recording</button>
                                </div>
                              </div>
                            )}
                            
                            <div className='camera'>
                              {status !== 'recording' && (
                                <div class="recordingActiveAndDoneState">
                
                                  {recordingDone === false && (
                                    <div class="recordingCover">
                
                                      <div title="Enable Countdown" class="countdownButton">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#627790" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <circle cx="12" cy="12" r="9" />
                                          <polyline points="12 7 12 12 15 15" />
                                        </svg>
                                      </div>
                
                                      <div title="Start recording" class="recordingStartButton" onClick={() => {startRecordingCountdown()}}>
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-video" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#627790" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                          <path d="M15 10l4.553 -2.276a1 1 0 0 1 1.447 .894v6.764a1 1 0 0 1 -1.447 .894l-4.553 -2.276v-4z" />
                                          <rect x="3" y="6" width="12" height="12" rx="2" />
                                        </svg>
                                      </div>
                
                                      {microphoneOn && (
                                        <div title="Off microphone" class="muteButton" onClick={() => muteRecording()}>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-microphone" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#627790" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <rect x="9" y="2" width="6" height="11" rx="3" />
                                            <path d="M5 10a7 7 0 0 0 14 0" />
                                            <line x1="8" y1="21" x2="16" y2="21" />
                                            <line x1="12" y1="17" x2="12" y2="21" />
                                          </svg>
                                        </div>
                                      )}
                                      {!microphoneOn && (
                                        <div title="On microphone" class="muteButton" onClick={() => unmuteRecording()}>
                                          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-microphone-off" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#627790" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                            <line x1="3" y1="3" x2="21" y2="21" />
                                            <path d="M9 5a3 3 0 0 1 6 0v5a3 3 0 0 1 -.13 .874m-2 2a3 3 0 0 1 -3.87 -2.872v-1" />
                                            <path d="M5 10a7 7 0 0 0 10.846 5.85m2.002 -2a6.967 6.967 0 0 0 1.152 -3.85" />
                                            <line x1="8" y1="21" x2="16" y2="21" />
                                            <line x1="12" y1="17" x2="12" y2="21" />
                                          </svg>
                                        </div>
                                      )}
                
                                    </div>  
                                  )}
                
                                  {recordingDone && (
                                    <div class="recordedVideoConfirmationCover">
                                      <div class="recordedVideoConfirmationTitle">Do you want to use this video? 🥳</div>
                                      <div class="recordedVideoConfirmationButtons">
                                          <div onClick={() => rejectRecording()} class="recordedVideoConfirmationButton_cancel">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-down" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#627790" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                              <path d="M7 13v-8a1 1 0 0 0 -1 -1h-2a1 1 0 0 0 -1 1v7a1 1 0 0 0 1 1h3a4 4 0 0 1 4 4v1a2 2 0 0 0 4 0v-5h3a2 2 0 0 0 2 -2l-1 -5a2 3 0 0 0 -2 -2h-7a3 3 0 0 0 -3 3" />
                                            </svg>
                                            No
                                          </div>
                                          <div onClick={() => acceptRecording()} class="recordedVideoConfirmationButton_accept">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-thumb-up" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#627790" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                              <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                              <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                                            </svg>
                                            Yes
                                          </div>
                                      </div>
                                    </div>
                                  )}
                
                                </div>
                              )}
                              {status === 'recording' && (
                                <div class="recordingStopCover">
                
                                  <div>
                                    <div class="recordingTimer">
                                      <p id="currentCount_selector"></p>
                                    </div>
                                    <div title="Stop recording" class="recordingStopButton" onClick={() => {stopMediaRecord()}}>
                                      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-player-stop" width="32" height="32" viewBox="0 0 24 24" stroke-width="1.5" stroke="#627790" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                        <rect x="5" y="5" width="14" height="14" rx="2" />
                                      </svg>
                                    </div>
                                  </div>
                
                                </div>
                              )}
                            </div>
                            <div style={{width: "100%", height: "100%", position: "relative", borderRadius: "inherit"}}>
                              <LiveStreamPreview stream={liveStream} style={{minWidth: "100%", minHeight: "100%", width: "100%", height: "100%", objectFit: "fill"}}/>
                              <Player srcBlob={mediaBlob} style={{minWidth: "100%", minHeight: "100%", width: "100%", height: "100%", objectFit: "fill"}}/>
                            </div>
                            {status !== 'recording' && (
                              <div style={{width: "auto", height: "auto", cursor: "pointer", zIndex: 99999}} onClick={() => {stopRecordingAndClose()}}>
                                <div className='close'>
                                  <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        ) 
                        
                        : (
                        <>
                        {/* Screen recording upload */}
                        <div className="newStream">
                            <div className="newStreamHeader">
                                <h4>New Stream</h4>
                            </div>
                            <div className="newStreamBody">
                                <div className="newStreambodyHead">
                                    <h6>IMPORT VIDEO FILE</h6>
                                </div>
                                <div className="streamOptionsGroup">
                                    <div className="streamItem" style={{ border: "0.743529px dashed #FFFFFF", boxSizing: "border-box", borderRadius: "4.46117px" }} onClick={() => Toggle()}>
                                        <div className="streamImg">
                                            {/* <label htmlFor="file-input">
                                                <img src="/images/folder.svg" alt="" />
                                            </label> */}
                                            <img src="/images/folder.svg" alt="" />
                                            {/* <input id="file-input" type="file" /> */}
                                        </div>
                                        <div className="streamText">
                                            <h6>My Device</h6>
                                        </div>
                                    </div>
                                    <div className="streamItem" onClick={() => {setRecordingState(true); setRecordScreen(false)}}>
                                        <div className="streamImg">
                                            <img src="/images/camera.svg" alt="" />
                                        </div>
                                        <div className="streamText">
                                            <h6>Camera</h6>
                                        </div>
                                    </div>
                                    <div className="streamItem" style={{ marginTop: "0.2rem" }} onClick={() => {setRecordingState(true); setRecordScreen(true)}}>
                                        <div className="streamImg">
                                            <img src="/images/screen-record.svg" alt="" />
                                        </div>
                                        <div className="streamText">
                                            <h6>Screen Record</h6>
                                        </div>
                                    </div>
                                
                                    {/* <div className="streamItem" style={{ marginTop: "0.6rem" }}>
                                        <div className="streamImg">
                                            <img src="/images/previous-uploads.svg" alt="" />
                                        </div>
                                        <div className="streamText">
                                            <h6>Previous Uploads</h6>
                                        </div>
                                    </div> */}

                                </div>
                            </div>
                        </div>


                        {/* Cloud storage upload */}
                        <div className="uploadStream">
                        <div className="uploadStreamHeader">
                            <h5>UPLOAD VIA CLOUD STORAGE</h5>
                        </div>
                        <div className="uploadStreamBody">
                            <div className="divContentLeftFooterBody">
                                <div className="videoUploadBtn">
                                    <img src="/images/g-drive.svg" alt="" />
                                </div>
                                <div className="videoUploadBtn">
                                    <img src="/images/cloud-drive.svg" alt="" />
                                </div>
                                <div className="videoUploadBtn">
                                    <img src="/images/diamond.svg" alt="" />
                                </div>
                                <div className="videoUploadBtn" style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
                                    <img src="/images/plus.svg" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="uploadStreamFooter">
                            <p>
                                There is no file size limit when uploading video directly from your cloud storage.
                            </p>
                        </div>
                        </div>

                        </>

                        )}

                        </div>

                        <div className="splitRight">
                            <div className="splitRightHeader">
                                <div className="mainHeading">
                                    <h4>History</h4>
                                </div>
                                <div className="subHeading">
                                    <Link to="/video/video-list">View all</Link>
                                </div>
                            </div>
                            <div className="splitRightBody">
                                <div className="videoTableBody">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Files</th>
                                                <th>Size</th>
                                                <th>Creation</th>
                                                <th>Status</th>
                                                {/* <th>Actions</th> */}
                                            </tr>
                                        </thead>
                                        <tbody className='tableBorder'>
                                            <tr>
                                                <td>9705791119.mp4</td>
                                                <td>2.7 Mb</td>
                                                <td>9:54</td>
                                                <td>Streamed</td>
                                            </tr>
                                            <tr>
                                                <td>9705791119.mp4</td>
                                                <td>2.7 Mb</td>
                                                <td>9:54</td>
                                                <td>Streamed</td>
                                            </tr>
                                            <tr>
                                                <td>9705791119.mp4</td>
                                                <td>2.7 Mb</td>
                                                <td>9:54</td>
                                                <td>Streamed</td>
                                            </tr>
                                            <tr>
                                                <td>9705791119.mp4</td>
                                                <td>2.7 Mb</td>
                                                <td>9:54</td>
                                                <td>Streamed</td>
                                            </tr>
                                            <tr>
                                                <td>9705791119.mp4</td>
                                                <td>2.7 Mb</td>
                                                <td>9:54</td>
                                                <td>Streamed</td>
                                            </tr>
                                            <tr>
                                                <td>9705791119.mp4</td>
                                                <td>2.7 Mb</td>
                                                <td>9:54</td>
                                                <td>Streamed</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='uploadVideoModal'>
                <StreamingModals show={modal} close={Toggle} />
                {/* <ShowSuccessModal show={modal} close={Toggle} /> */}
            </div>
        </>
    )
}
export default Streaming