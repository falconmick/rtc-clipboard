<script lang="ts">
  import {createPeerConnection} from "../services/common";

  let offerCreating = false;
  let peerConnection: RTCPeerConnection;
  let textOffer = "";

  let dataChannel = null;

  let offerResponseResolving = false;
  let offerResponse = "";


    function onClick() {
      offerCreating = true;
      peerConnection = createPeerConnection(lasticecandidate);
      dataChannel = peerConnection.createDataChannel('chat');
      dataChannel.onopen = (_dataChannel) => console.log("WE OPEN");
      dataChannel.onmessage = (event: MessageEvent) => console.log(event.data);
      const createOfferPromise = peerConnection.createOffer();
      createOfferPromise.then(createOfferDone, createOfferFailed);
    }

  function lasticecandidate() {
    console.log('lasticecandidate');
    textOffer = JSON.stringify(peerConnection.localDescription);
    offerCreating = false;
  }

  function createOfferDone(offer) {
    console.log('createOfferDone');
    const setLocalPromise = peerConnection.setLocalDescription(offer);
    setLocalPromise.then(setLocalDone, setLocalFailed);
  }

  function createOfferFailed(reason) {
    console.log('createOfferFailed');
    console.log(reason);
  }

  function setLocalDone() {
    console.log('setLocalDone');
  }

  function setLocalFailed(reason) {
    console.log('setLocalFailed');
    console.log(reason);
  }

  function onClickOfferResponse() {
    console.log('clickanswerpasted');
    offerResponseResolving = true;
    const answer = JSON.parse<RTCSessionDescriptionInit>(offerResponse);
    const setRemotePromise = peerConnection.setRemoteDescription(answer);
    setRemotePromise.then(setRemoteDone, setRemoteFailed);
  }

  function setRemoteDone() {
    console.log('setRemoteDone');
  }

  function setRemoteFailed(reason) {
    console.log('setRemoteFailed');
    console.log(reason);
  }


  function sendSomeLove() {
    dataChannel.send("<3");
  }
</script>

<button disabled={offerCreating} on:click={onClick}>Create Offer</button>
<textarea bind:value={textOffer}></textarea>

<p>
    please wait for peer to give answer and paste it below
</p>
<textarea bind:value={offerResponse} placeholder="please paste answer from responding side"></textarea>
<button disabled={offerResponseResolving} on:click={onClickOfferResponse}>answer pasted</button>

<button on:click={sendSomeLove}>Send Love</button>