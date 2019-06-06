/*
 * Collect likers
 * Readme: Cut and paste this code into your console and press enter
 * Command: getlikers - starts the process when you press g it collects likers
 * Command: printlikers - stops the process and prints all the likers collected
 */
var likerslist = [];
var finallist = [];
setCommand('getlikers', startLikes, 'Started collecting likers PRESS g TO GET');
setCommand('printlikers', stopLikes, 'Stoped collecting likers and output');

setCommand('setpage', setPage, 'Set Page');
setCommand('removeprivate', removePrivate, 'Check');

function setPage() {
  document.open();
  document.write('<iframe name="iFrameName"></iframe>');
  document.close();
}

function loadUrl(url) {
  //'https://www.instagram.com/susan.colman/'; sleep(1000)
  document.getElementsByName('iFrameName')[0].src = url;
}

function isPrivate() {
  var privateAccount = false;
  var iframe = document.getElementsByName('iFrameName')[0];
  var h2s = iframe.contentWindow.document.getElementsByTagName('h2');
  for (var i = 0; i < h2s.length; i++) {
    var h2 = h2s[i].innerHTML;
    if (h2 === 'This Account is Private') {
      privateAccount = true;
    }
  }
  if (privateAccount) {
    return true;
  }
}

function removePrivate() {
  finallist = [];
  console.log('Started');
  for (var i = 0; i < likerslist.length; i++) {
    loadUrl(likerslist[i]);
    sleep(3000);
    if (!isPrivate(likerslist[i])) {
      finallist.push(likerslist[i]);
    }
  }
  console.log('Done');
}

function stopLikes() {
  window.removeEventListener('sckeypressroll', function() {});
  doc = [];
  doc.push('<h1>Likers list</h1>');
  doc.push(`<code>List contains: ${likerslist.length} likers.</code>`);
  doc.push('<ul>');
  for (var i = 0; i < likerslist.length; i++) {
    doc.push(`<li>${likerslist[i]}</li>`);
  }
  doc.push('</ul>');

  document.open();
  document.write(doc.join(''));
  document.close();
}

function startLikes() {
  likerslist = [];
  window.addEventListener('keypress', function(key) {
    var key = event.key;
    if (key === 'g') {
      for (var i = 0; i < document.links.length; i++) {
        let title = document.links[i].title;
        let url = document.links[i].href;
        let found = likerslist.includes(url);
        if (title && !found) {
          likerslist.push(url);
        }
      }
    }
    console.log(`Got ${likerslist.length} new likers.`);
  });
}

function setCommand(cmd, func, msg) {
  Object.defineProperty(window, cmd, {
    get: function() {
      console.log(msg);
      return func();
    }
  });
}

function sleep(miliseconds) {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {}
}
