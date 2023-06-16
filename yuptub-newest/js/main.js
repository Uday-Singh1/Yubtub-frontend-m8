class API {     
  async getData(url) {  
      let dataToBeReturned = {};  
     await fetch(url).then( 
         (response) => {  
             return response.json();  
         }
     ).then((data) => {     
          dataToBeReturned = data.videos;   
     });
      return dataToBeReturned;
  }
}

class App {
  switcher;
  main;
  api;
  data;
  constructor() {
    
    this.api = new API();
    this.api.getData("../data/data.json").then((data) => {  
      this.data = data;
      this.switcher = new Switcher(this, data);
    }); 
}
}
  
  
class Switcher{
 yubtub;
 cleaner;
 app;
 default = 0;

 constructor(app,data){
    this.app = app;
   this.data = data;
    this.yubtub = new Yubtub(this.app, data[this.default]);
    this.cleaner = new Cleaner();
 }

 switch(link){
    this.cleaner.clean("body");
    this.yubtub = new Yubtub(this.app,  this.data[link]);

 }
}

class Cleaner{
    clean(whereToClean){
        document.querySelector(whereToClean).innerHTML = "";
    }
}

class Yubtub{
  aside;
  main;
    renderer;
    app;
    constructor(app,data){
      this.app = app;
      this.renderer = new Renderer();
      this.header = new Header(this, data);
      this.main = new Main(this, data);
      this.aside = new Aside(this, data);
      this.video = new Video(this, data);
    }
}

// class Renderer{
//     render(whereToRender, whatToRender){
//         document.querySelector(whereToRender).appendChild(whatToRender);
//     }
// }

class Header{
  htmlElement;
  textElement;
  iconElement;
  yubtub;
  constructor(yubtub,data){
    this.yubtub = yubtub;
    this.htmlElement = document.createElement("header");
    this.htmlElement.classList = "header";
    this.textElement = document.createElement("h2");
    this.textElement.innerHTML = "TWITCH";
    this.textElement.classList = "title__text";
    this.iconElement = document.createElement("i");
    this.iconElement.classList = "fa-brands fa-twitch";

    this.yubtub.renderer.render("body", this.htmlElement);
    this.yubtub.renderer.render("header",this.textElement);
     this.yubtub.renderer.render("h2",this.iconElement);
   


  }
}


class Main {
  yubtub;
  htmlElement;

  constructor(yubtub, data) {
    this.yubtub = yubtub;
    this.htmlElement = document.createElement("main");
    this.htmlElement.classList = "main";
    this.yubtub.renderer.render("body", this.htmlElement);
 
  }
}

class Video{
  yubtub;
  nextVideo;
  videoElement;
  actionbarElement;
    constructor(yubtub,data){
    this.yubtub = yubtub;
    this.videoElement = document.createElement("video");
    this.videoElement.classList = "main__video";
    this.actionbarElement = document.createElement("article");
    this.actionbarElement.classList = "action__bar";
    this.yubtub.renderer.render("main",this.videoElement);
    this.yubtub.renderer.render("main",this.actionbarElement);
   

  }
}

class Aside{
    yubtub;
    nextVideo;
    htmlElement;

      constructor(yubtub,data){
      this.yubtub = yubtub;
      this.htmlElement = document.createElement("aside");
      this.htmlElement.classList = "aside__side";
      this.yubtub.renderer.render("main",this.htmlElement);
      this.nextVideo = new NextVideo(this,data);
    }
}



class NextVideo{
  aside;
  htmlElement;
  constructor(aside,data){
    this.aside = aside;
    this.data = data;
    this.htmlElement = document.createElement("video");
    this.htmlElement.classList = "video__style";
    this.htmlElement.src = "./videos/" + data.video;
    this.aside.yubtub.renderer.render("aside", this.htmlElement);
    this.htmlElement.onclick = this.videoClicked;
  }

  videoClicked = () => {
    this.aside.yubtub.app.switcher.switch(this.data.link);
  }

}

const app = new App();
console.log(app);