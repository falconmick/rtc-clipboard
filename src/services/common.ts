const handleicecandidate = (lasticecandidate :() => void) => (event: RTCPeerConnectionIceEvent) => {
  if (event.candidate != null) {
    console.log('new ice candidate');
  } else {
    console.log('all ice candidates');
    lasticecandidate();
  }
};

const handleconnectionstatechange = (event: Event) => {
  console.log('handleconnectionstatechange');
  console.log(event);
};

const handleiceconnectionstatechange = (event: Event) => {
  console.log('ice connection state: ' + (event?.target as RTCPeerConnection)?.iceConnectionState);
};

export const createPeerConnection = (lasticecandidate :() => void): RTCPeerConnection => {
  const configuration: RTCConfiguration = {
    iceServers: [{
      urls: "stun:stun.stunprotocol.org"
    }]
  };
  let peerConnection: RTCPeerConnection = new RTCPeerConnection(configuration);

  peerConnection.onicecandidate = handleicecandidate(lasticecandidate);
  peerConnection.onconnectionstatechange = handleconnectionstatechange;
  peerConnection.oniceconnectionstatechange = handleiceconnectionstatechange;

  return peerConnection;
};
