var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera (75, width/height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

var stats = initStats();

//Change aspects of the renderer
renderer.setClearColor(new THREE.Color(0x000));
renderer.shadowMapEnabled = true;

renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);

// position and point the camera to the center of the scene
camera.position.x = 100;
camera.position.y = 10;
camera.position.z = 10;
camera.lookAt(new THREE.Vector3(10, 0, 0));

var camControls = new THREE.FirstPersonControls(camera);
camControls.lookSpeed = 0.4;
camControls.movementSpeed = 10;
camControls.noFly = true;
camControls.lookVertical = true;
camControls.constrainVertical = true;
camControls.verticalMin = 1.0;
camControls.verticalMax = 2.0;
camControls.lon = -150;
camControls.lat = 120;

//Create the ground
var ground = THREE.ImageUtils.loadTexture("textures/ground.png");
ground.wrapS = THREE.ClampToEdgeWrapping;
ground.wrapT = THREE.ClampToEdgeWrapping;
ground.repeat.set(4, 4);

var planeGeometry = new THREE.PlaneGeometry(1000, 200, 20, 20);
var planeMaterial = new THREE.MeshLambertMaterial({ map: ground });
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;

plane.rotation.x = -0.5 * Math.PI;
plane.position.x = 15;
plane.position.y = 0;
plane.position.z = 0;

scene.add(plane);

//render it
var step = 0;
render();
frame1adjust();

/*******************************
* BASIC FUNCTIONS
********************************/

//Set the first frame to the entire size
function frame1adjust() {
    var frame1height = $("#frame1").width();
    alert(frame1height);
    var frame1positionY = (height - frame1height)/2;
    $("#frame1").css({
        "top": frame1positionY + "px"
    })
}


function render() {
	stats.update();

	requestAnimationFrame(render);
	renderer.render(scene, camera);
}

function initStats() {
	var stats = new Stats();
	stats.setMode(0); // 0: fps, 1: ms

	//Align top-left
	stats.domElement.style.position = 'absolute';
	stats.domElement.style.left = '0px';
	stats.domElement.style.top = '0px';

	$("#stats").append(stats.domElement);

	return stats;
}

// Changing window sizes
function onWindowResize(event) {
	renderer.setSize(width, height);

	camera.aspect = width/height;
	camera.updateProjectionMatrix();
}

/********************************
* ANIMATE THINGS
*********************************/


