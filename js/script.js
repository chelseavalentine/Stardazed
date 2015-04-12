var width = window.innerWidth;
var height = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera (75, width/height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true });

var stats = initStats();

//Change aspects of the renderer
renderer.setClearColor(new THREE.Color(0x000));
renderer.shadowMapEnabled = true;

//Optional things
var clock = new THREE.Clock();

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

var ambientLight = new THREE.AmbientLight(0x383838);

// add subtle ambient lighting
var ambientLight = new THREE.AmbientLight(0x0c0c0c);
scene.add(ambientLight);

//Create spotlights
var spotLight1 = new THREE.SpotLight(0x2f4efd);
spotLight1.position.set(10, 50, 15);
spotLight1.rotation.x = 180;
spotLight1.castShadow = true;

var spotLight2 = new THREE.SpotLight(0xff1643);
spotLight2.position.set(0, 60, -10);
spotLight2.castShadow = true;

var spotLight3 = new THREE.SpotLight(0xffd500);
spotLight3.position.set(-20, -60, -10);
spotLight3.castShadow = true;

var spotLight4 = new THREE.SpotLight(0x009649);
spotLight4.position.set(-10, 60, -10);
spotLight4.castShadow = true;

var spotLight5 = new THREE.SpotLight(0xff3f80);
spotLight5.position.set(0, 60, -10);
spotLight5.castShadow = true;

var spotLight6 = new THREE.SpotLight(0xb967c7);
spotLight6.position.set(10, -60, -10);
spotLight6.castShadow = true;

scene.add(spotLight1, spotLight2, spotLight3, spotLight4, spotLight5, spotLight5, spotLight6);


//Create cubes
var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
var cubeMaterial = new THREE.MeshLambertMaterial(0xb2e4fb);
var cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube1.position.set(0, 15, 0);

var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
var cubeMaterial = new THREE.MeshLambertMaterial(0xb2e4fb);
var cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube2.position.set(0, 15, 25);

var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
var cubeMaterial = new THREE.MeshLambertMaterial(0xb2e4fb);
var cube3 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube3.position.set(0, 15, 50);

var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
var cubeMaterial = new THREE.MeshLambertMaterial(0xb2e4fb);
var cube4 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube4.position.set(0, 15, -25);

var cubeGeometry = new THREE.BoxGeometry(15, 15, 15);
var cubeMaterial = new THREE.MeshLambertMaterial(0xb2e4fb);
var cube5 = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube5.position.set(0, 15, -50);


cube1.castShadow = cube2.castShadow = cube3.castShadow = cube4.castShadow = cube5.castShadow = true;

scene.add(cube1, cube2, cube3, cube4, cube5);

//render it
var step = 0;
render();


//Need to watch for any keyboard/etc. inputs
document.addEventListener ('keydown', onDocumentKeyDown, false);
document.addEventListener ('keyup');

document.addEventListener ('mousemove', onDocumentMouseMove, false);
document.addEventListener ('movedown', onDocumentMouseDown, false);
document.addEventListener ('mouseup', onDocumentMouseUp, false);

document.addEventListener ('mousewheel', onDocumentMouseWheel, false);

/*******************************
* FUNCTIONS
********************************/
function render() {
	stats.update();

	requestAnimationFrame(render);
	renderer.render(scene, camera);

	step += 0.04;
	cube1.rotation.x += 0.02;
    cube1.rotation.y += 0.02;
    cube1.rotation.z += 0.02;
    cube1.position.x += 5 * Math.cos(step);

    //Cube2
    cube2.rotation.x += 0.02;
    cube2.rotation.y += 0.02;
    cube2.rotation.z += 0.02;

    //Cube3
    cube3.position.y += 2 * Math.cos(step);
    cube3.rotation.y += 0.02;
    cube3.rotation.z += 0.02;

    cube4.position.y += 2 * Math.cos(step);
    cube4.position.x += 0.5 * Math.sin(step);
    cube4.rotation.y += 0.02;
    cube4.rotation.z += 0.02;

    cube5.position.y += 0.1 * Math.cos(step);
    cube5.position.x += 0.1 * Math.sin(step);
    cube5.rotation.y += 0.02;
    cube5.rotation.z += 0.02;
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

// Changes with the mouse


// Changes with keyboard arrows

//Based arrow key input, it simulates someone moving
// var controls = new THREE.TrackballControls(camera);
// controls.target
// =======
// var Myo = require('myo');

// var myMyo = Myo.create();
// myMyo.on('fist', function(edge){
//     if(!edge) return;
//     console.log('Hello Myo!');
//     myMyo.vibrate();
// });
