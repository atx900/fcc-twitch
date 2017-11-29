
var contentAuthor = ['ESL_SC2', 'freecodecamp', 'habathcx', 'noobs2ninjas', 'OgamingSC2', 'RobotCaleb', 'vampybitme', 'cleave', 'versus', 'cheapassgamer']

var caUserName = []                                                           // stores the retrieved content author's user name
var caLogo = []                                                               // stores the content author's img URL
var caURL = []                                                                // stores the content author's twitch tv URL
var caOnline = []                                                             // stores content authors that are currently online
var caStreaming = []                                                          // stores online content authors' streaming content
var caOffline = []                                                            // stores content authors that are currently offline

document.getElementById('getAll').addEventListener('click', getAllAuthors)
document.getElementById('getOnline').addEventListener('click', getOnlineAuthors)
document.getElementById('getOffline').addEventListener('click', getOfflineAuthors)

getInfo()                                                                     // calls getInfo() on page load / reload
getStatus()                                                                   // calls getStatus() on page load / reload

function clearResult () {                                                     // clears retrieved results displayed on page
  console.log('clearResult() called...')
  var rowItem = document.querySelectorAll('.wrapper')
  var authorEntry = rowItem.length

  for (var entryCounter = 0; entryCounter < authorEntry; entryCounter++) {
    var elementTarget = document.querySelector('.wrapper')
    elementTarget.parentNode.removeChild(elementTarget)
  }
}

function getInfo () {                                                         // retrieves JSON format data re: content authors
  for (var entryCounter = 0; entryCounter < contentAuthor.length; entryCounter++) {
    var contentAuthorInfo = 'https://wind-bow.glitch.me/twitch-api/users/' + contentAuthor[entryCounter]
    var xhr = new XMLHttpRequest()

    xhr.open('GET', contentAuthorInfo, true)
    xhr.onload = function () {
      if (this.status === 200) {
        var authorData = JSON.parse(this.responseText)
        var authorUserName = authorData.display_name
        var authorLogo = authorData.logo
        var authorURL = 'https://www.twitch.tv/' + authorUserName

        authorUserName = authorUserName.toLowerCase()
        caUserName.push(authorUserName)
        caLogo.push(authorLogo)
        caURL.push(authorURL)
      } else {
        window.alert('Unable to access Twitch API')
      }
    }
    xhr.send()
  }
}

function getStatus () {                                                       // retrieves text format data re:content authors' status
  for (var entryCounter = 0; entryCounter < contentAuthor.length; entryCounter++) {
    var contentAuthorStatus = 'https://wind-bow.glitch.me/twitch-api/streams/' + contentAuthor[entryCounter] + '?callback=?'
    var xhr = new XMLHttpRequest()

    xhr.open('GET', contentAuthorStatus, true)
    xhr.onload = function () {
      if (this.status === 200) {
        var authorStatus = this.responseText
        var parsedStatus = authorStatus.split(',')
        console.log(parsedStatus)
        if (parsedStatus.length === 47) {                                     // observed that online authors has a length value of 47
          var streamingAuthor = parsedStatus[17].split(':')
          streamingAuthor = streamingAuthor[1].split('"')
          streamingAuthor = streamingAuthor[1].toLowerCase()

          var streamingContent = parsedStatus[15].split('"')
          streamingContent = streamingContent[3]
          caOnline.push(streamingAuthor)
          caStreaming.push(streamingContent)
        } else {                                                              // observed that offline authors has a length value of 3
          var offlineAuthor = authorStatus.split(':')
          offlineAuthor = offlineAuthor[6].split('/')
          offlineAuthor = offlineAuthor[5].split('"')
          offlineAuthor = offlineAuthor[0].split('"')
          caOffline.push(offlineAuthor[0].toLowerCase())
        }
      } else {
        window.alert('Unable to access Twitch API')
      }
    }
    xhr.send()
  }
}

function getAllAuthors () {                                                   // retrives all content authors
  clearResult()
  for (var entryCounter = 0; entryCounter < caOnline.length; entryCounter++) {
    var indexOnlineAuthor = caUserName.indexOf(caOnline[entryCounter])
    var parentOnline = document.querySelector('.column-center')
    var wrapperOnline = document.createElement('div')
    wrapperOnline.classList.add('wrapper')

    var logoOnline = document.createElement('div')
    logoOnline.classList.add('user-logo')

    var imgOnline = document.createElement('img')
    imgOnline.classList.add('img-online')
    imgOnline.setAttribute('src', caLogo[indexOnlineAuthor])
    imgOnline.setAttribute('height', '75')
    imgOnline.setAttribute('width', '75')
    imgOnline.setAttribute('alt', 'Content Author Logo')

    var imgLinkOnline = document.createElement('a')
    imgLinkOnline.href = caURL[indexOnlineAuthor]
    imgLinkOnline.target = '_blank'

    imgLinkOnline.appendChild(imgOnline)
    logoOnline.appendChild(imgLinkOnline)

    var userOnline = document.createElement('div')
    userOnline.classList.add('user-name')

    var userLinkOnline = document.createElement('a')
    userLinkOnline.href = caURL[indexOnlineAuthor]
    userLinkOnline.target = '_blank'
    userLinkOnline.innerHTML = caOnline[entryCounter]
    userOnline.appendChild(userLinkOnline)

    var streamOnline = document.createElement('div')
    streamOnline.classList.add('user-stream')
    streamOnline.innerHTML = caStreaming[entryCounter]

    wrapperOnline.appendChild(logoOnline)
    wrapperOnline.appendChild(userOnline)
    wrapperOnline.appendChild(streamOnline)
    parentOnline.appendChild(wrapperOnline)
  }

  for (entryCounter = 0; entryCounter < caOffline.length; entryCounter++) {
    var indexOfflineAuthor = caUserName.indexOf(caOffline[entryCounter])
    var parentOffline = document.querySelector('.column-center')
    var wrapperOffline = document.createElement('div')
    wrapperOffline.classList.add('wrapper')

    var logoOffline = document.createElement('div')
    logoOffline.classList.add('user-logo')

    var imgOffline = document.createElement('img')
    imgOffline.classList.add('img-offline')
    imgOffline.setAttribute('src', caLogo[indexOfflineAuthor])
    imgOffline.setAttribute('height', '75')
    imgOffline.setAttribute('width', '75')
    imgOffline.setAttribute('alt', 'Content Author Logo')

    var imgLinkOffline = document.createElement('a')
    imgLinkOffline.href = caURL[indexOfflineAuthor]
    imgLinkOffline.target = '_blank'

    imgLinkOffline.appendChild(imgOffline)
    logoOffline.appendChild(imgLinkOffline)

    var userOffline = document.createElement('div')
    userOffline.classList.add('user-name')

    var userLinkOffline = document.createElement('a')
    userLinkOffline.href = caURL[indexOfflineAuthor]
    userLinkOffline.target = '_blank'
    userLinkOffline.innerHTML = caOffline[entryCounter]
    userOffline.appendChild(userLinkOffline)

    var streamOffline = document.createElement('div')
    streamOffline.classList.add('user-stream')
    streamOffline.innerHTML = 'Content author currently offline'

    wrapperOffline.appendChild(logoOffline)
    wrapperOffline.appendChild(userOffline)
    wrapperOffline.appendChild(streamOffline)
    parentOffline.appendChild(wrapperOffline)
  }
}

function getOnlineAuthors () {                                                // retrives content authors currently online
  clearResult()
  for (var entryCounter = 0; entryCounter < caOnline.length; entryCounter++) {
    var indexOnlineAuthor = caUserName.indexOf(caOnline[entryCounter])
    var parentOnline = document.querySelector('.column-center')
    var wrapperOnline = document.createElement('div')
    wrapperOnline.classList.add('wrapper')

    var logoOnline = document.createElement('div')
    logoOnline.classList.add('user-logo')

    var imgOnline = document.createElement('img')
    imgOnline.classList.add('img-online')
    imgOnline.setAttribute('src', caLogo[indexOnlineAuthor])
    imgOnline.setAttribute('height', '75')
    imgOnline.setAttribute('width', '75')
    imgOnline.setAttribute('alt', 'Content Author Logo')

    var imgLinkOnline = document.createElement('a')
    imgLinkOnline.href = caURL[indexOnlineAuthor]
    imgLinkOnline.target = '_blank'

    imgLinkOnline.appendChild(imgOnline)
    logoOnline.appendChild(imgLinkOnline)

    var userOnline = document.createElement('div')
    userOnline.classList.add('user-name')

    var userLinkOnline = document.createElement('a')
    userLinkOnline.href = caURL[indexOnlineAuthor]
    userLinkOnline.target = '_blank'
    userLinkOnline.innerHTML = caOnline[entryCounter]
    userOnline.appendChild(userLinkOnline)

    var streamOnline = document.createElement('div')
    streamOnline.classList.add('user-stream')
    streamOnline.innerHTML = caStreaming[entryCounter]

    wrapperOnline.appendChild(logoOnline)
    wrapperOnline.appendChild(userOnline)
    wrapperOnline.appendChild(streamOnline)
    parentOnline.appendChild(wrapperOnline)
  }
}

function getOfflineAuthors () {                                               // // retrives content authors currently offline
  clearResult()
  for (var entryCounter = 0; entryCounter < caOffline.length; entryCounter++) {
    var indexOfflineAuthor = caUserName.indexOf(caOffline[entryCounter])
    var parentOffline = document.querySelector('.column-center')
    var wrapperOffline = document.createElement('div')
    wrapperOffline.classList.add('wrapper')

    var logoOffline = document.createElement('div')
    logoOffline.classList.add('user-logo')

    var imgOffline = document.createElement('img')
    imgOffline.classList.add('img-offline')
    imgOffline.setAttribute('src', caLogo[indexOfflineAuthor])
    imgOffline.setAttribute('height', '75')
    imgOffline.setAttribute('width', '75')
    imgOffline.setAttribute('alt', 'Content Author Logo')

    var imgLinkOffline = document.createElement('a')
    imgLinkOffline.href = caURL[indexOfflineAuthor]
    imgLinkOffline.target = '_blank'

    imgLinkOffline.appendChild(imgOffline)
    logoOffline.appendChild(imgLinkOffline)

    var userOffline = document.createElement('div')
    userOffline.classList.add('user-name')

    var userLinkOffline = document.createElement('a')
    userLinkOffline.href = caURL[indexOfflineAuthor]
    userLinkOffline.target = '_blank'
    userLinkOffline.innerHTML = caOffline[entryCounter]
    userOffline.appendChild(userLinkOffline)

    var streamOffline = document.createElement('div')
    streamOffline.classList.add('user-stream')
    streamOffline.innerHTML = 'Content author currently offline'

    wrapperOffline.appendChild(logoOffline)
    wrapperOffline.appendChild(userOffline)
    wrapperOffline.appendChild(streamOffline)
    parentOffline.appendChild(wrapperOffline)
  }
}
