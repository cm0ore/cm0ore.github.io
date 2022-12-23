var context;
var x=[250, 100, 50, 75, 200];
var y=[50, 100, 60, 15, 200];
var dx=[20, 15, 5, 10,10];
var dy=[21, 10, 5, 20, 10];
var radius=[20, 10, 15, 5];
var style=["#0000ff","#ff0000","#00ff00", "0f00f0"]

var min_x = 0;
var min_y = 0;
var max_x = 500;
var max_y = 500;

function init()
{
  //context= myCanvas.getContext('2d');
  //setInterval(draw,100);
  initpositions();
  initpictures();
  setInterval(drawpictures,100);
}

function getWidth() {
    return Math.max(
      document.body.scrollWidth,
    //   document.documentElement.scrollWidth,
      document.body.offsetWidth,
      document.documentElement.offsetWidth,
      document.documentElement.clientWidth
    );
  }
  
  function getHeight() {
    return Math.max(
      document.body.scrollHeight,
    //   document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight,
      document.documentElement.clientHeight
    );
  }

var data_dir="./move_images/"

var styles = `
.rotate {
  -webkit-transition: -webkit-transform 1s;
}

.rotate:hover {
  -webkit-transform: rotate(360deg);
}
`
var styleSheet = document.createElement("style")
styleSheet.innerText = styles
document.head.appendChild(styleSheet)

//var divs=[document.createElement('div'),document.createElement('div'), document.createElement('div'), document.createElement('div'), document.createElement('div')];

var ids=[
data_dir+"stew_0",
data_dir+"stew_1", 
data_dir+"cam_0",
data_dir+"cam_1", 
data_dir+"winnie_0",
data_dir+"winnie_1",
data_dir+"trent_0", 
data_dir+"trent_1",
];

var divs=[]
var divx=[]
var divy=[]
var divdx=[]
var divdy=[]
var box=[]
var radius=[];

function initpositions () {
    max_x=getWidth()
    max_y=getHeight()
    for (i=0;i<ids.length;i++){
        divx.push(Math.random() * (getWidth() - 100))
        divy.push(Math.random() * (getHeight() - 100))
        //randomize left and right movement
        dx = Math.random() * 20
        if (Math.random() < 0.5) {
            dx = dx * -1
        }
        divdx.push(dx)

        dy = Math.random() * 20
        if (Math.random() < 0.5) {
            dy = dy * -1
        }
        divdy.push(dy)
        box.push(50 + (Math.random() * 30))

        radius.push(15)

        divs.push(document.createElement('div'))
    }

}




//var divx=[250, 100, 50, 75, 200];
//var divy=[50, 100, 60, 15, 200];
//var divdx=[20, 15, 5, 10, 10];
//var divdy=[21, 10, 10, 20, 10];
//var box=[70, 60, 80, 50, 70];

function initpictures () {
    for (i=0;i<ids.length;i++){
        divs[i].id = ids[i];
        divs[i].style.position = 'absolute';
        divs[i].style.left = divx[i].toString() + 'px';
        divs[i].style.top = divy[i].toString() + 'px';
        divs[i].style.width = box[i].toString() + 'px';
        divs[i].style.height = box[i].toString() + 'px';
        //myLayer.style.padding = '10px';
        //myLayer.style.background = '#00ff00';
        divs[i].innerHTML = '<img class="rotate" src="' + ids[i] + '.png" />';
        document.body.appendChild(divs[i]);
    }
}

function setIds(IDs) {
    ids=[]
    for (i=0;i<IDs.length;i++) {
        ids.push(IDs[i]);
    }
    for (i=0;i<divs.length;i) {
        divs[i].innerHTML = '<img src="' + ids[i] + '.png" />';
    }
}


function drawpictures() {

    // for (i=0;i<divs.length;i++){
    //     document.body.removeChild(divs[i]);
    // }

  for (i=0;i<divs.length;i++){
        if( divx[i] < 0 || divx[i]+box[i]>getWidth() ) divdx[i]=-divdx[i]; 
        if( divy[i] < 0 || divy[i]+box[i]>getHeight() ) divdy[i]=-divdy[i]; 
        divx[i]+=divdx[i]; 
        divy[i]+=divdy[i];
        divs[i].style.left = divx[i].toString() + 'px';
        divs[i].style.top = divy[i].toString() + 'px';

   }

   for (i=0;i<divs.length;i++) {
       for(j=i+1;j<divs.length;j++) {
           var xh = (divx[i] + (box[i]/2)) - (divx[j] + box[j]/2);
           var yh = (divy[i] + (box[i]/2)) - (divy[j] + box[j]/2);
           var yh2 = yh * yh;
           var xh2 = xh * xh;

           var distance = ((box[i]/2)* (box[i]/2)) + ((box[j]/2) * (box[j]/2));
           if (distance > yh2 + xh2) {
               var differencex = divdx[i] - divdx[j];
               var differencey = divdy[i] - divdy[j];
               divdx[i] = divdx[i] - differencex;
               divdy[i] = divdy[i] - differencey;

               divdx[j] = divdx[j] + differencex;
               divdy[j] = divdy[j] + differencey;
           }
       }
   }

   for (i=0;i<divs.length;i++) {
       if (divdx[i] < 0) {
           divs[i].style.transform = 'scaleX(-1)';
       } else {
           divs[i].style.transform = 'scaleX(1)';
       }
   }

    // for (i=0;i<divs.length;i++){
    //     document.body.appendChild(divs[i]);
    // }
}

function draw()
{
  context.clearRect(min_x,min_y, max_x,max_y);
  context.beginPath();
  context.fillStyle="#0000ff";
  // Draws a circle of radius 20 at the coordinates 100,100 on the canvas
  for (i=0;i<x.length;i++){
    context.arc(x[i],y[i],radius[i],0,Math.PI*2,true);
  }
  context.fillStyle=style[0];
  context.closePath();
  context.fill();
  // Boundary Logic
  for (i=0;i<x.length;i++){
        if( x[i]-radius[i]<min_x - 20 || x[i]+radius[i]>max_x + 20 ) dx[i]=-dx[i]; 
        if( y[i]-radius[i]<min_y - 20 || y[i]+radius[i] > max_y + 20 ) dy[i]=-dy[i]; 
        x[i]+=dx[i]; 
        y[i]+=dy[i];
   }

   for (i=0;i<x.length;i++) {
       for(j=i+1;j<x.length;j++) {
           var xh = x[i] - x[j];
           var yh = y[i] - y[j];
           var yh2 = yh * yh;
           var xh2 = xh * xh;

           var distance = (radius[i]* radius[i]) + (radius[j] * radius[j]);
           if (distance > yh2 + xh2) {
               var differencex = dx[i] - dx[j];
               var differencey = dy[i] - dy[j];
               dx[i] = dx[i] - differencex;
               dy[i] = dy[i] - differencey;

               dx[j] = dx[j] + differencex;
               dy[j] = dy[j] + differencey;

           }

       }
   }

}

