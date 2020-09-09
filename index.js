
$(document).ready(function(){
    $('.sidenav').sidenav();
});

$(document).ready(function(){
    $('select').formSelect();
});
AOS.init({
    offset: 100,
    duration: 1000
});
let scrollRef = 0;
window.addEventListener('scroll', function() {
  scrollRef <= 10 ? scrollRef++ : AOS.refresh();
  if(Math.ceil($(window).scrollTop()) == $(document).height() - $(window).height() || Math.ceil($(window).scrollTop())+1 == $(document).height() - $(window).height() || Math.ceil($(window).scrollTop())-1 == $(document).height() - $(window).height()) {
        loadMore();
  }
});

var orderBy = "rating";
var catagoryID = "28";
var videoCount = 0;
var aoslr = 0;
var staticUrl = 'https://www.googleapis.com/youtube/v3/search?order='+orderBy+'&part=snippet&maxResults='+(videoCount+5)+'&type=video&videoCategoryId='+catagoryID+'&key=AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww&alt=json';

$.getJSON(staticUrl, function(data) {
    
    Array.prototype.forEach.call( document.querySelectorAll('#video-row'), function( node ) {
        node.parentNode.removeChild( node );
    });
    loadVideos(data);
})
.fail(function() {
    document.getElementById('section').style.display = 'none';
    document.getElementById('side-nav-list').style.display = 'none';
    document.getElementById('trigger').style.display = 'none';
    document.getElementById('error').style.display = 'block';
})

document.getElementById('order-list').onchange = function () {
    aoslr=0;
    orderBy = document.getElementById('order-list').value;
    staticUrl = 'https://www.googleapis.com/youtube/v3/search?order='+orderBy+'&part=snippet&maxResults='+(videoCount+5)+'&type=video&videoCategoryId='+catagoryID+'&key=AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww&alt=json';
    $.getJSON(staticUrl, function(data) {
        Array.prototype.forEach.call( document.querySelectorAll('#video-row'), function( node ) {
            node.parentNode.removeChild( node );
        });
        loadVideos(data);
    })
    .fail(function() {
        document.getElementById('section').style.display = 'none';
        document.getElementById('side-nav-list').style.display = 'none';
        document.getElementById('trigger').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    })
};

document.getElementById('catagory-list').onchange = function () {
    aoslr=0;
    catagoryID = document.getElementById('catagory-list').value;
    staticUrl = 'https://www.googleapis.com/youtube/v3/search?order='+orderBy+'&part=snippet&maxResults='+(videoCount+5)+'&type=video&videoCategoryId='+catagoryID+'&key=AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww&alt=json';
    $.getJSON(staticUrl, function(data) {
        Array.prototype.forEach.call( document.querySelectorAll('#video-row'), function( node ) {
            node.parentNode.removeChild( node );
        });
        loadVideos(data);
    })
    .fail(function() {
        document.getElementById('section').style.display = 'none';
        document.getElementById('side-nav-list').style.display = 'none';
        document.getElementById('trigger').style.display = 'none';
        document.getElementById('error').style.display = 'block';
    })
};

function loadVideos(data){
    
    document.getElementById('preleoader').style.display = 'block';
    for (i=videoCount;i<data.items.length;i++) {
        var z = document.querySelector('#without-login');
        var toInsertBefore = document.querySelector('#End');
        
        var newElement = document.createElement('div');
        newElement.className = 'row';
        if(aoslr!=0){
            if(aoslr%2==0){
                newElement.setAttribute('data-aos', 'zoom-in-left');
            }else{
                newElement.setAttribute('data-aos', 'zoom-in-right');
            }
        }else{
            newElement.setAttribute('data-aos', 'zoom-in');
            newElement.setAttribute('data-aos-offset', '100');
            newElement.setAttribute('data-aos-duration', '500');
        }
        aoslr++;
        newElement.id = 'video-row-l';

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
        iframe.id = "video";

        newVideoElement.appendChild(iframe);

        newVElement.appendChild(newVideoElement);

        var newEElement = document.createElement('div');
        newEElement.className = 'col s1';

        newElement.appendChild(newEElement);
        newElement.appendChild(newVElement);
        newElement.appendChild(newSElement);

        z.insertBefore(newElement,toInsertBefore)
        
        
        document.getElementById('video-row-l').style.display = 'none';
        document.getElementById('video-row-l').id = 'video-row';
    }

    var prel = setInterval(function() {
        document.getElementById('preleoader').style.display = 'none';
        clearInterval(prel);
        var v = document.querySelectorAll('#video-row');
        v.forEach(function(vs) {
            vs.style.display = 'block';
          });
    }, 2000);
    prel = setInterval(function() {
        clearInterval(prel);
        AOS.refresh();
    }, 500);
    
}

function loadMore(){
    if(videoCount!=45){
        videoCount += 5;
        staticUrl = 'https://www.googleapis.com/youtube/v3/search?order='+orderBy+'&part=snippet&maxResults='+(videoCount+5)+'&type=video&videoCategoryId='+catagoryID+'&key=AIzaSyC86qGosUbBF9ehKaV0SJh7m8AwVy3m-ww&alt=json';
        $.getJSON(staticUrl, function(data) {
            loadVideos(data);
        })
        .fail(function() {
            document.getElementById('section').style.display = 'none';
            document.getElementById('side-nav-list').style.display = 'none';
            document.getElementById('trigger').style.display = 'none';
            document.getElementById('error').style.display = 'block';
        })
    }else{

    }
}

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
        document.getElementById('without-login').style.display = 'none';
        getChannel(defaultChannel);
    }else{
        authorizeButton.style.display = 'inline-block';
        authorizeButtonNav.style.display = 'inline-block';
        document.getElementById('google-prompt').style.display = 'block'; 
        signoutButton.style.display = 'none';
        signoutButtonNav.style.display = 'none';
        content.style.display = 'none';
        document.getElementById('without-login').style.display = 'block';
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