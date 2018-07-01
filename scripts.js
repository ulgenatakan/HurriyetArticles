const app = document.getElementById('root');

var count=0;
var previous = null;
var current = null;

const container = document.createElement('div');
container.setAttribute('class', 'container');
app.appendChild(container);


function requestLoop(){
  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.hurriyet.com.tr/v1/articles?&apikey=202aa612691e42038089717313580d00', true);
  request.onloadend = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  current = data[0].Title;   

  if(count==0){  
    //checking if request is OK   
  if (request.status >= 200 && request.status < 400) {
    data.forEach(object => {
      //creating div div element for each article
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      //creating Titles for each article
      const h1 = document.createElement('h1');
      h1.textContent = object.Title;
      // creating images
      const img = document.createElement('img');
      if(object.Files[0]){
        const link=object.Files[0].FileUrl;             
        img.src=link;
      }else{
        console.log(false);
        img.src='https://canadatwoway.com/wp-content/uploads/2017/11/No_Image_Available.jpg';
      }
      //Description
      const p = document.createElement('p');
      object.Description = object.Description;
      p.textContent = object.Description;
      
      //appends
      container.appendChild(card);
      card.appendChild(h1);
      card.appendChild(img);
      card.appendChild(p);

      //OnClick function opens the article
      card.onclick = function(){
      window.open(object.Url);
      };

      
      });
    } else {
      //if request has errors, it gives Error message
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `There must be a problem!`;
    app.appendChild(errorMessage);
    }
  }
}
request.send();
};

//calling the request function
requestLoop();

//checks every 8 seconds if data changed or not
setInterval(function() {
      // console.log(previous && current && previous);
      // console.log("current is:"+ current);
      // console.log("previous is:"+ current);
      // console.log(previous && current && previous !== current);
      // console.log(count);
  requestLoop(); 
  count++;  
  if (previous && current && previous !== current) {
    refreshPage();
  }   
  previous = current;
  
}, 8000);  

function refreshPage () {
  var page_y = document.getElementsByTagName("body")[0].scrollTop;
  window.location.href = window.location.href.split('?')[0] + '?page_y=' + page_y;
}
if ( window.location.href.indexOf('page_y') != -1 ) {
  var match = window.location.href.split('?')[1].split("&")[0].split("=");
  document.getElementsByTagName("body")[0].scrollTop = match[1];
}

   
 
