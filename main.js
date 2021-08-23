status = "";
objects = [];
song = "";

function preload() {
song = loadSound("song.mp3");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector("cocosst", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;

}

function gotResult(error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}


function draw() {
    image(video, 0, 0, 380, 380);
    if (status != "") {
        objectDetector.detect(video, gotResult);
        r = random(255);
        g = random(255);
        b = random(255);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : objects detected";
           
            fill(r,g,b);
            noFill();
            percent = floor(objects[i].confidence * 100);
            stroke(r,g,b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            if(objects[i].label == "person") {
                document.getElementById("numberOfObjects").innerHTML = "Baby found";
                song.stop();
            }
            else {
                document.getElementById("numberOfObjects").innerHTML = "Baby not found";
                song.play(); 
            }
        }
        if(objects.length == 0) {
            document.getElementById("numberOfObjects").innerHTML = "Baby not found";
            song.play(); 
        }
    }

}