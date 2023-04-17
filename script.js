      const video = document.querySelector("#videos");
      const canvas = document.querySelector("#canvas");
      let snapBtn = document.querySelector("#snap");
      const clearElem = document.querySelector("#clear-button");
      // Hide the 'clear-button' element
      clearElem.style.display = "none";
      // Get the camera stream
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then((stream) => {
          video.srcObject = stream;
          video.play();
        })
        .catch((err) => {
          console.log("Error accessing camera:", err);
        });

      // Take a photo when snap button is clicked
      snapBtn.addEventListener("click", () => {
        canvas.getContext("2d").drawImage(video, 0, 0, canvas.width, canvas.height);
        document.getElementById("song").play();
        // show the 'clear-button' element
        clearElem.style.display = "block";
      });

      // Get the "record video" button and the video element
      const recordBtn = document.querySelector('#record');
      const videoElem = document.querySelector('#video');
      const deleteElem = document.querySelector('#delete-button')
      // Hide the 'video' element
      videoElem.style.display = 'none';
      // Hide the 'delete-button' element
      deleteElem.style.display = "none";
      // Set up the MediaRecorder
      const chunks = [];
      let mediaRecorder;
      // Hide the 'video' element

      recordBtn.addEventListener('click', () => {
        // Check if the user has granted permission to use the camera and microphone
        navigator.mediaDevices.getUserMedia({ audio: true, video: true })
          .then(stream => {
            // Start recording the video and audio
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = e => chunks.push(e.data);
            mediaRecorder.onstop = () => {
              const blob = new Blob(chunks, { type: 'video/mp4' });
              chunks.length = 0;
              const videoURL = URL.createObjectURL(blob);
              videoElem.src = videoURL;
            };
            mediaRecorder.start();
            recordBtn.textContent = '⏹️';
          })
          .catch(error => {
            console.error(error);
            alert('Unable to access camera and microphone.');
          });
      });

      recordBtn.addEventListener('click', () => {
        // Stop recording the video and audio
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
          recordBtn.textContent = "⏺";
          // add sound 
          document.getElementById("voice").play();
          // Show the 'video' element
          videoElem.style.display = "block";
          // show the 'delete-button' element
          deleteElem.style.display = "block";
        }
      });

      const canvass = document.getElementById("canvas");

      canvas.addEventListener("click", () => {
        if (canvas.requestFullscreen) {
          canvas.requestFullscreen();
        } else if (canvas.msRequestFullscreen) {
          canvas.msRequestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
          canvas.mozRequestFullScreen();
        } else if (canvas.webkitRequestFullscreen) {
          canvas.webkitRequestFullscreen();
        }
      });
        
      const deleteButton = document.getElementById("delete-button");
      const videos = document.getElementById("video");

      deleteButton.addEventListener("click", function () {
        videos.remove();
      });

      const clearButton = document.getElementById("clear-button");
      const canvase = document.getElementById("canvas");
     
      clearButton.addEventListener("click", function () {
        canvas.remove();
      })
    
      


  
