console.clear();// Get the canvas element from the DOM
var canvas=document.getElementById("scene");canvas.width=canvas.clientWidth;canvas.height=canvas.clientHeight;// Store the 2D context
var ctx=canvas.getContext("2d");if(1<window.devicePixelRatio){canvas.width=2*canvas.clientWidth;canvas.height=2*canvas.clientHeight;ctx.scale(2,2)}function getTexture(emoji){var tempCanvas=document.createElement("canvas"),tempCtx=tempCanvas.getContext("2d");tempCanvas.width=60;tempCanvas.height=60;tempCtx.textAlign="center";tempCtx.textBaseline="middle";tempCtx.font="54px serif";tempCtx.fillText(emoji,30,35);return tempCanvas}var textures=[getTexture("\uD83E\uDD8A"),getTexture("\uD83E\uDD93"),getTexture("\uD83D\uDC39"),getTexture("\uD83D\uDC28")],width=canvas.offsetWidth,height=canvas.offsetHeight,dots=[],DOTS_AMOUNT=Math.min(width,height),DOT_RADIUS=20,PROJECTION_CENTER_X=width/2,PROJECTION_CENTER_Y=height/2,PERSPECTIVE=.8*width,GLOBE_RADIUS=.4*Math.min(width,height),Dot=/*#__PURE__*/function(){function Dot(){babelHelpers.classCallCheck(this,Dot);this.theta=2*Math.random()*Math.PI;// Random value- between [0, 2Pi]
this.phi=Math.acos(2*Math.random()-1);// Random value between [0, Pi]
this.texture=textures[Math.floor(Math.random()*textures.length)];// Calculate the [x, y, z] coordinates of the dot along the globe
this.x=0;this.y=0;this.z=0;this.radius=Math.random()*(.2*GLOBE_RADIUS)+.8*GLOBE_RADIUS;this.xProjected=0;this.yProjected=0;this.scaleProjected=0;TweenMax.to(this,40,{theta:this.theta+2*Math.PI,repeat:-1,ease:Power0.easeNone})}// Do some math to project the 3D position into the 2D canvas
babelHelpers.createClass(Dot,[{key:"project",value:function project(){this.x=this.radius*Math.sin(this.phi)*Math.cos(this.theta);this.y=this.radius*Math.cos(this.phi);this.z=this.radius*Math.sin(this.phi)*Math.sin(this.theta)+this.radius;this.scaleProjected=PERSPECTIVE/(PERSPECTIVE+this.z);this.xProjected=this.x*this.scaleProjected+PROJECTION_CENTER_X;this.yProjected=this.y*this.scaleProjected+PROJECTION_CENTER_Y}// Draw the dot on the canvas
},{key:"draw",value:function draw(){ctx.drawImage(this.texture,this.xProjected-DOT_RADIUS,this.yProjected-DOT_RADIUS,2*DOT_RADIUS*this.scaleProjected,2*DOT_RADIUS*this.scaleProjected)}}]);return Dot}();/* ====================== */ /* ====== VARIABLES ===== */ /* ====================== */function createDots(){// Empty the array of dots
dots.length=0;// Create a new dot based on the amount needed
for(var i=0;i<DOTS_AMOUNT;i++){// Create a new dot and push it into the array
dots.push(new Dot)}}/* ====================== */ /* ======== RENDER ====== */ /* ====================== */function render(){// Clear the scene
ctx.clearRect(0,0,width,height);// Loop through the dots array and project every dot
for(var i=0;i<dots.length;i++){dots[i].project()}// Sort dots array based on their projected size
dots.sort(function(dot1,dot2){return dot1.scaleProjected-dot2.scaleProjected});// Loop through the dots array and draw every dot
for(var i=0;i<dots.length;i++){dots[i].draw()}window.requestAnimationFrame(render)}// Function called after the user resized its screen
function afterResize(){width=canvas.offsetWidth;height=canvas.offsetHeight;if(1<window.devicePixelRatio){canvas.width=2*canvas.clientWidth;canvas.height=2*canvas.clientHeight;ctx.scale(2,2)}else{canvas.width=width;canvas.height=height}PROJECTION_CENTER_X=width/2;PROJECTION_CENTER_Y=height/2;PERSPECTIVE=.8*width;GLOBE_RADIUS=.4*Math.min(width,height);DOTS_AMOUNT=Math.min(width,height);createDots();// Reset all dots
}// Variable used to store a timeout when user resized its screen
var resizeTimeout;// Function called right after user resized its screen
function onResize(){// Clear the timeout variable
resizeTimeout=window.clearTimeout(resizeTimeout);// Store a new timeout to avoid calling afterResize for every resize event
resizeTimeout=window.setTimeout(afterResize,500)}window.addEventListener("resize",onResize);// Populate the dots array with random dots
createDots();// Render the scene
window.requestAnimationFrame(render);