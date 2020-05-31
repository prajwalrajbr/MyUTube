$(document).ready(function(){
    $('.sidenav').sidenav();
});

$(document).ready(function(){
  $('select').formSelect();
});

var staticUrl = '';
var orderBy = "rating";
var catagoryID = "28";

document.getElementById('order-list').onchange = function () {
    console.log(document.getElementById('order-list').value);
    orderBy = document.getElementById('order-list').value;
    staticUrl = 'https://www.googleapis.com/youtube/v3/search?order='+orderBy+'&part=snippet&type=video&videoCategoryId='+catagoryID+'&key=AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww&alt=json';
    $.getJSON(staticUrl, function(data) {
        var z = document.querySelector('#without-login');
        var toInsertBefore = document.querySelector('#End');
        Array.prototype.forEach.call( document.querySelectorAll('#video-row'), function( node ) {
            node.parentNode.removeChild( node );
        });
        for (i=0;i<data.items.length;i++) {
            var newElement = document.createElement('div');
            newElement.className = 'row';
            newElement.id = 'video-row';

            var newSElement = document.createElement('div');
            newSElement.className = 'col s1';

            var newVElement = document.createElement('div');
            newVElement.className = 'col s10';
            var newVideoElement = document.createElement('div');
            newVideoElement.className = 'video-container';

            var iframe = document.createElement('iframe');
            iframe.src = "https://www.youtube.com/embed/"+data.items[i].id.videoId;
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
            iframe.setAttribute('allowfullscreen', true);

            newVideoElement.appendChild(iframe);

            newVElement.appendChild(newVideoElement);

            var newEElement = document.createElement('div');
            newEElement.className = 'col s1';

            newElement.appendChild(newEElement);
            newElement.appendChild(newVElement);
            newElement.appendChild(newSElement);

            z.insertBefore(newElement,toInsertBefore)
        }
    });
};

document.getElementById('catagory-list').onchange = function () {
    console.log(document.getElementById('catagory-list').value);
    catagoryID = document.getElementById('catagory-list').value;
    staticUrl = 'https://www.googleapis.com/youtube/v3/search?order='+orderBy+'&part=snippet&type=video&videoCategoryId='+catagoryID+'&key=AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww&alt=json';
    $.getJSON(staticUrl, function(data) {
        Array.prototype.forEach.call( document.querySelectorAll('#video-row'), function( node ) {
            node.parentNode.removeChild( node );
        });
    });
};

//https://www.googleapis.com/youtube/v3/search?order=viewCount&part=snippet&type=video&videoCategoryId=34&key=AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww&alt=json

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