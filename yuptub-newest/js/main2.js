class API {
    async getData(url) {
      const response = await fetch(url);
      const data = await response.json();
      return data.videos;
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
  
  class Switcher {
    yubtub;
    cleaner;
    app;
    data;
    default = 0;
  
    constructor(app, data) {
      this.app = app;
      this.data = data;
      this.yubtub = new Yubtub(this.app, this.data, this.data[0]);
      this.cleaner = new Cleaner();
    }
  
    switch(id) {
      this.dataobject = this.data[id];
      this.yubtub.dataobject = this.dataobject;
      this.yubtub.main = new Main(this.yubtub, this.dataobject);
    }
  }
  
  class Cleaner {
    clean(whereToClean) {
      document.querySelector(whereToClean).innerHTML = "";
    }
  }
  
  class Yubtub {
    aside;
    main;
    renderer;
    data;
    dataobject;
    app;
    comments;
  
    constructor(yubtub, data, dataobject) {
      this.data = data;
      this.yubtub = yubtub;
      this.dataobject = dataobject;
      this.app = app;
      this.renderer = new Renderer();
      this.header = new Header(this, data);
      this.main = new Main(this, dataobject);
      this.aside = new Aside(this, data);
      this.comments = new Comments(this.main);
    }
  }
  
  class Renderer {
    render(whatToRender, whereToRender) {
      whereToRender.appendChild(whatToRender);
    }
  }
  
  class Header {
    htmlElement;
    textElement;
    iconElement;
    yubtub;
  
    constructor(yubtub, data) {
      this.yubtub = yubtub;
      this.data = data;
      this.htmlElement = document.createElement("header");
      this.htmlElement.classList = "header";
      this.textElement = document.createElement("h2");
      this.textElement.innerHTML = "TWITCH";
      this.textElement.classList = "title__text";
      this.iconElement = document.createElement("i");
      this.iconElement.classList = "fa-brands fa-twitch";
  
      this.yubtub.renderer.render(this.htmlElement, document.body);
      this.yubtub.renderer.render(this.textElement, this.htmlElement);
      this.yubtub.renderer.render(this.iconElement, this.htmlElement);
    }
  }
  
  class Main {
    yubtub;
    htmlElement;
    videoElement;
  
    constructor(yubtub, dataobject) {
      this.yubtub = yubtub;
      this.dataobject = dataobject;
      this.htmlElement = document.createElement("main");
      this.htmlElement.classList = "main";
      this.videoElement = this.createVideoElement(dataobject);
  
      this.yubtub.renderer.render(this.htmlElement, document.body);
      this.yubtub.renderer.render(this.videoElement, this.htmlElement);
    }
  
    createVideoElement(dataobject) {
      const videoElement = document.createElement("video");
      videoElement.classList = "main__video";
      videoElement.src = "./videos/" + dataobject.video;
      videoElement.controls = true;
      videoElement.addEventListener("click", () => {
        // Handle video click event
      });
  
      return videoElement;
    }
  }
  
  class Aside {
    htmlElement;
    yubtub;
    data;
  
    constructor(yubtub, data) {
      this.htmlElement = document.createElement("aside");
      this.htmlElement.classList = "aside";
      this.yubtub = yubtub;
      this.data = data;
      this.renderVideos();
  
      this.yubtub.renderer.render(this.htmlElement, document.body);
    }
  
    renderVideos() {
      this.data.forEach((dataobject, index) => {
        const videoElement = this.createVideoElement(dataobject, index);
        this.yubtub.renderer.render(videoElement, this.htmlElement);
      });
    }
  
    createVideoElement(dataobject, index) {
      const videoElement = document.createElement("video");
      videoElement.classList = "aside__video";
      videoElement.src = "./videos/" + dataobject.thumbnail;
      videoElement.addEventListener("click", () => {
        this.yubtub.switcher.switch(index);
      });
  
      return videoElement;
    }
  }
  
  class Comments {
    main;
    htmlElement;
    inputElement;
    buttonElement;
    commentList;
  
    constructor(main) {
      this.main = main;
      this.htmlElement = document.createElement("section");
      this.htmlElement.classList = "comments";
      this.inputElement = document.createElement("input");
      this.inputElement.placeholder = "Write a comment...";
      this.buttonElement = document.createElement("button");
      this.buttonElement.innerText = "Post";
      this.commentList = document.createElement("ul");
      this.commentList.classList = "comments__list";
  
      this.main.yubtub.renderer.render(this.htmlElement, this.main.htmlElement);
      this.main.yubtub.renderer.render(this.inputElement, this.htmlElement);
      this.main.yubtub.renderer.render(this.buttonElement, this.htmlElement);
      this.main.yubtub.renderer.render(this.commentList, this.htmlElement);
    }
  }
  
  const app = new App();
  