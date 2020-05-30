$(document).ready(function(){
    $('.sidenav').sidenav();
});

const CLIENT_ID = '280319480833-i4chh7eknrp3eudjbffr2hbgq4lgjrd4.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const authorizeButtonNav = document.getElementById('authorize-button-sidenav');
const signoutButton = document.getElementById('signout-button');
const signoutButtonNav = document.getElementById('signout-button-sidenav');

const content = document.getElementById('content');
const channelForm = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const channelData = document.getElementById('channel-data');
const videoContainer = document.getElementById('video-container');
const defaultChannel = 'abc';

function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function initClient() {
    gapi.client.init({
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(()=>{
        gapi.client.setApiKey("AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww");
        gapi.client.load(DISCOVERY_DOCS[0])
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        authorizeButtonNav.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
        signoutButtonNav.onclick = handleSignoutClick;
    });
}

function updateSigninStatus(isSignedIn){
    if (isSignedIn){
        authorizeButton.style.display = 'none';
        authorizeButtonNav.style.display = 'none';
        signoutButton.style.display = 'inline-block';
        signoutButtonNav.style.display = 'inline-block';
        content.style.display = 'inline-block';
        document.getElementById('google-prompt').style.display = 'none';        
        getChannel(defaultChannel);
    }else{
        authorizeButton.style.display = 'inline-block';
        authorizeButtonNav.style.display = 'inline-block';
        document.getElementById('google-prompt').style.display = 'block'; 
        signoutButton.style.display = 'none';
        signoutButtonNav.style.display = 'none';
        content.style.display = 'none';
    }
}

function handleAuthClick(){
    gapi.auth2.getAuthInstance().signIn({scope: SCOPES});
}

function handleSignoutClick(){
    gapi.auth2.getAuthInstance().signOut();
}

function getChannel(channel){
    console.log(channel);
}