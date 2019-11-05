var admobid = {}
if (/(android)/i.test(navigator.userAgent)) {  //for android & amazon-fireos
  admobid = {
    banner: 'ca-app-pub-6823378887326581/6743859799', //change this with your banner ID
    interstitial: 'ca-app-pub-6823378887326581/6795830685', //change this with your interstitial ID
  }
} else if (/(ipod|iphone|ipad)/i.test(navigator.userAgent)) {  //for ios
  admobid = {
    banner: 'ca-app-pub-6823378887326581/6743859799', //change this with your banner ID
    interstitial: 'ca-app-pub-6823378887326581/6795830685', //change this with your interstitial ID
  }
}

document.addEventListener('deviceready', function() {
  admob.banner.config({
    //BANNER CONFIG
    id: admobid.banner,
    bannerAtTop: false, // set true if you want to show banner on the top position and false for bottom position.
    overlap: true, // set to true, to allow banner overlap webview
    size: "SMART_BANNER", // Select Banner type: BANNER | IAB_BANNER | IAB_LEADERBOARD | IAB_MRECT | LARGE_BANNER | SMART_BANNER | FLUID
    forChild: null, // Set banner ads for Child-directed value null or true
    forFamily: null, // Set banner ads for Family-directed value null or true
    isTesting: true, // Set true if under development and false for publication
    autoShow: false, // auto show or hide banner, false will hide the banner after banner loaded true will show banner after banner loaded.
  })
  //Load banner ads first time.
  admob.banner.prepare()

  admob.interstitial.config({
    //INTERSTITIAL CONFIG
    id: admobid.interstitial,
    isTesting: true, // Set true if under development and false for publication
    autoShow: false, // auto show or hide interstitial, false will hide the interstitial after interstitial loaded true will show interstitial
                     // afterinterstitial loaded.
  })
  //Load Interstitial ads first time.
  admob.interstitial.prepare()

  document.getElementById('showAd').disabled = true
  document.getElementById('showAd').onclick = function() {
    admob.interstitial.show()
  }

}, false)

document.addEventListener('admob.banner.events.LOAD_FAIL', function(event) {
    console.log(event)
    c2_callFunction("Log", ["Banner Fail to load"]);

})

document.addEventListener('admob.banner.events.LOAD', function(event) {
    console.log(event)
    c2_callFunction("Log", ["Banner loaded"]);

})

document.addEventListener('admob.banner.events.OPEN', function(event) {
    console.log(event)
    c2_callFunction("Log", ["Banner Shown"]);

})

document.addEventListener('admob.banner.events.CLOSE', function(event) {
    console.log(event)
    c2_callFunction("Log", ["Banner Closed"]);

})

document.addEventListener('admob.interstitial.events.LOAD_FAIL', function(event) {
    console.log(event)
    c2_callFunction("Log", ["Interstitial Fail to Load"]);

})

document.addEventListener('admob.interstitial.events.LOAD', function(event) {
    console.log(event)
    c2_callFunction("Log", ["Interstitial Loaded"]);

  document.getElementById('showAd').disabled = false
})

document.addEventListener('admob.interstitial.events.CLOSE', function(event) {
  console.log(event)
  c2_callFunction("Log", ["Interstitial Closed"]);
  //After Interstitial closed then we load new interstitial
  admob.interstitial.prepare()
})