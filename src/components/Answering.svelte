<script lang="ts">
  import {createPeerConnection} from "../services/common";

  let offerReceiving = false;
  let incomingOffer = '';
  let peerConnection;
  let offerResponse = '';

  let dataChannel;

    function clickofferpasted() {
      console.log('clickremoteoffer');
      offerReceiving = true;
      peerConnection = createPeerConnection(lasticecandidate);
      peerConnection.ondatachannel = handledatachannel;
      const offer = JSON.parse<RTCSessionDescription>(incomingOffer);
      const setRemotePromise = peerConnection.setRemoteDescription(offer);
      setRemotePromise.then(setRemoteDone, setRemoteFailed);
    }

  function setRemoteDone() {
    console.log('setRemoteDone');
    const createAnswerPromise = peerConnection.createAnswer();
    createAnswerPromise.then(createAnswerDone, createAnswerFailed);
  }

  function createAnswerDone(answer) {
    console.log('createAnswerDone');
    const setLocalPromise = peerConnection.setLocalDescription(answer);
    setLocalPromise.then(setLocalDone, setLocalFailed);
  }

  function setLocalDone() {
    console.log('setLocalDone');
  }

  function setLocalFailed(reason) {
    console.log('setLocalFailed');
    console.log(reason);
  }

  function createAnswerFailed(reason) {
    console.log('createAnswerFailed');
    console.log(reason);
  }

  function setRemoteFailed(reason) {
    console.log('setRemoteFailed');
    console.log(reason);
  }

  function lasticecandidate() {
    console.log('lasticecandidate');
    offerResponse = JSON.stringify(peerConnection.localDescription);
  }

  function handledatachannel(event) {
    console.log('handledatachannel');
    dataChannel = event.channel;
    dataChannel.onopen = () => console.log("channel open");
    dataChannel.onmessage = (event: MessageEvent) => console.log(event.data);
  }

  function sendSomeLove() {
    dataChannel.send("<3");
  }
</script>

<textarea bind:value={incomingOffer} placeholder="please paste offer from initiating side"></textarea>
<button disabled={offerReceiving} on:click={clickofferpasted}>offer pasted</button>
<p>
    please send following answer to peer
</p>
<textarea bind:value={offerResponse} readonly placeholder="please wait a few seconds"></textarea>

<button on:click={sendSomeLove}>Send Love</button>