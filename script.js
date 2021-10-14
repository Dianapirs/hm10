const NodeCreator = function(name) {
    this.element = document.createElement(name);
    this.attr = function(name, value) {
        if (Array.isArray(value)) {
            value.forEach((currentValue) => {
                this.element.setAttribute(name, currentValue);
            })
        } else {
            this.element.setAttribute(name, value);
        }
        return this;
    }
    this.html = function(value) {
        if(typeof value === 'string' && value) {
            this.element.innerHTML = value;
        }
        return this;
    }
    this.search = function(tag) {
        const searchElement = this.element.querySelector(tag);
        if(searchElement) {
            return searchElement;
        } else {
            return document.querySelector(tag);
        }
    }
    this.addClass = function(name) {
        this.element.classList.add(name);
        return this;
    }
    this.removeClass = function(name) {
        this.element.classList.remove(name);
        return this;
    }
    this.toggleClass = function(name) {
        this.element.classList.toggle(name);
        return this;
    }
    this.hasClass = function(name) {
        const classArr =  this.element.classList;
        // return classArr.contains(name); //like includes in Array
        let result = false;
        classArr.forEach(p => {
            if (p === name) {
                result = true;
            }
        })
        return result; 
    }
    this.append = function(newElement, beforeElementTag) {
        if(!beforeElementTag) {
            this.element.appendChild(newElement);
        } else {
            const beforeElement = this.element.querySelector(beforeElementTag);
            this.element.insertBefore(newElement, beforeElement);
        }
        return this;
    }
    this.on = function(eventName, func) {
        this.element.addEventListener(eventName, func);
        return this;
    }
    this.addToPage = function() {
        document.body.appendChild(this.element);
        return this;
    }
}

const LinkNodeCreator = function() {
    NodeCreator.apply(this, arguments);

    this.blank = function(isBlank) {
        if(isBlank) {
            this.element.target = '_blank'
        } else {
            this.element.target = 'self'
        }
        return this;
    }

    this.setHref = function(href) {
        this.element.href = href;
        return this;
    }
}

const ImageNodeCreator = function() {
    NodeCreator.apply(this, arguments);
    this.element = new Image();
    this.setSrc = function(value){
        this.element.setAttribute('src', value);
        return this;
    }
    this.setAlt = function(value) {
        this.element.setAttribute('alt', value);
        return this;
    }
    this.changeSize = function(width, height) {
        if(!height){
            this.element.style.width = width + 'px';
            this.element.style.height = width + 'px';
        }else if(width && height) {
        this.element.style.width = width + 'px';
        this.element.style.height = height + 'px';
        } else {
            this.element.style.width = auto;
        }
        return this;
    }
    this.display = function(value) {
        this.element.style.display = value;
        return this;
    }
    this.openImageWindow = function(src) {
        this.element.style.cursor = 'pointer';
        this.element.addEventListener('click', function(){
            window.open(src);
        })
        return this;
    }
    
}

const btnAdd = new NodeCreator('button');
btnAdd.html('Hello this').addClass('item').on('click', function() {
    console.log('click this');
}).addToPage();

const newLink = new LinkNodeCreator('a');
newLink.setHref('#').blank(true).html('link').addToPage();
console.log(newLink);

const newImage = new ImageNodeCreator();
newImage.setSrc('https://www.onceuponapicture.co.uk/wp-content/uploads/2019/02/46456227_2504829799542273_7554593422053474304_o-700x525.jpg').setAlt('mushroom').changeSize(500, 300).display('block').openImageWindow('https://www.onceuponapicture.co.uk/wp-content/uploads/2019/02/46456227_2504829799542273_7554593422053474304_o-700x525.jpg').addToPage();
