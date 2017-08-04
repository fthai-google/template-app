'use strict';
/**
 * @param token - secure token passed from the server
 */
function initFirebase(token, channel) {
  /**
   * This deletes the data associated with the Firebase path
   * it is critical that this data be deleted since it costs money 
   */
  function deleteChannel() {
    $.post('/delete/1');
  }
  /**
   * A function for processing the data you got from Firebase
   */
  function updateState() {
    //Do whatever you need with the data here
  }
  /**
   * This function opens a realtime communication channel with Firebase
   * It logs in securely using the client token passed from the server
   * then it sets up a listener on the proper database path (also passed by server)
   * finally, it calls onOpened() to let the server know it is ready to receive messages
   */
  function openChannel() {
    console.log('Opening channel...');
    // sign into Firebase with the token passed from the server
    firebase.auth().signInWithCustomToken(token).catch(function(error) {
      console.log(error);
    });

    // Create a listener to your channel on Firebase
    var channel = firebase.database().ref('channels/' + channel);
    // Set up the listener to listen for changes. data.val() will be a JSON object containing all the values.
    channel.on('value', function(data) {
      updateState(data.val());
    });

    //You can also set up more specific listeners, like one for the demo, 'count':
    var count = firebase.database().ref('count');
    count.on('value', function(data) {
      $('#count').html(data.val());
    });
  }

  /**
   * This function initializes basic logic.
   */
  function initialize() {
    openChannel();
    
    //Uncomment this code to delete the channel upon closing the page.
    // window.addEventListener("beforeunload", function (e) {
    //   //console.log('Deleting channel')
    //   deleteChannel();

    //   (e || window.event).returnValue = null;
    //   return null;
    // });
  }
  initialize();
}