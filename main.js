song = "";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreleftWristY = 0;
scorerightWrist = 0;


function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log("PoseNet Model Loaded Successfully!");
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("The X and Y Coordinates of your right and left wrists are: " + rightWristX + "<br>" + rightWristY + "<br>" + leftWristX + "<br>" + leftWristY);
        scoreleftWristY = results[0].pose.keypoints[9].score;
        console.log("The score of the vol. is: " + scoreleftWristY);
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('#FF0000');
    stroke('#FF0000');
    if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 30);
        if (rightWristY > 0 && rightWristY <= 100) {
            document.getElementById("speed").innerHTML = "Speed: 0.5x";
            song.rate(0.5);
        } else if (rightWristY > 100 && rightWristY <= 200) {
            document.getElementById("speed").innerHTML = "Speed: 1x";
            song.rate(1);
        } else if (rightWristY > 200 && rightWristY <= 300) {
            document.getElementById("speed").innerHTML = "Speed: 1.5x";
            song.rate(1.5);
        } else if (rightWristY > 300 && rightWristY <= 400) {
            document.getElementById("speed").innerHTML = "Speed: 2x";
            song.rate(2);
        } else if (rightWristY > 400 && rightWristY <= 500) {
            document.getElementById("speed").innerHTML = "Speed: 2.5x";
        }

    }
    if (scoreleftWristY > 0.2) {
        circle(leftWristX, leftWristY, 30);
        NLeftY = Number(leftWristY);
        FLeftY = Floor(NLeftY);
        volume = removed_decimals / 500;
        song1.setVolume(volume);
        document.getElementById("volume").innerHTML = "Volume:" + volume;
    }
}

function play() {
    song.play();
    song.rate(1);
    song.setVolume(1);
}

function preload() {
    song = loadSound("music.mp3");
}