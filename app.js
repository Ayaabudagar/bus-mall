'use strict';

let imgArray = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg',
    'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg',
    'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg',
    'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif',
    'water-can.jpg', 'wine-glass.jpg'];








const photoSection = document.getElementById('photoSection');
const leftImgElement = document.getElementById('leftImage');
const middleImgElement = document.getElementById('middleImage');
const rightImgElement = document.getElementById('rightImage');
const button = document.getElementById("button");
const p = document.getElementById('p');
let clickNumber = 0;
let leftImg = 0;
let middleImg = 0;
let rightImg= 0;


function Product(name) {
    this.name = name;
    this.img = './img/' + name;
    this.shown = 0;
    this.clicks = 0;
    Product.all.push(this);
    
}
Product.all = [];


for (let i = 0; i < imgArray.length; i++) {
    new Product(imgArray[i]);
}


function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function renderSelectProduct() {
    let leftImgIndex = getRandomNum(0, imgArray.length - 1);
    let middleImgIndex = getRandomNum(0, imgArray.length - 1);
    let rightImgIndex = getRandomNum(0, imgArray.length - 1);

    while (leftImgIndex === middleImgIndex) {
        middleImgIndex = getRandomNum(0, imgArray.length - 1);
    }

    while ((rightImgIndex === leftImgIndex) || (rightImgIndex === middleImgIndex)) {
        rightImgIndex = getRandomNum(0, imgArray.length - 1);
    }
    leftImg =leftImgIndex
    middleImg = middleImgIndex
    rightImg = rightImgIndex
  
   
    leftImgElement.src = Product.all[leftImgIndex].img;
    middleImgElement.src = Product.all[middleImgIndex].img;
    rightImgElement.src = Product.all[rightImgIndex].img;

    Product.all[leftImgIndex].shown++;
    Product.all[middleImgIndex].shown++;
    Product.all[rightImgIndex].shown++;

}

function eventHandler(event) {
    if ((event.target.id == 'leftImage' || event.target.id == 'rightImage' || event.target.id == 'middleImage') && clickNumber < 25) {

        if (event.target.id == 'leftImage') {
            images.all[left].clicks++;
        }

        if (event.target.id == 'rightImage') {
            images.all[right].clicks++;
        }

        if (event.target.id == 'middleImage') {
            images.all[middle].clicks++;
        }
        clickNumber++;
        renderSelectProduct();

    } else {
        console.log(Product.all);
        photoSection.removeEventListener('click', eventHandler);
        button.addEventListener('click', eventButton);
    }
}
function eventButton( event ) {
    let ulistEl = document.createElement('ul');
    p.appendChild(ulistEl);

    for (let i = 0; i < Product.all.length; i++) {
        let listEl = document.createElement('li');
        ulistEl.appendChild(listEl);
        listEl.textContent = Product.all[i].name + " had " + Product.all[i].clicks + ' votes, and was seen ' + Product.all[i].shown + ' times.'

    }



}
eventButton();

photoSection.addEventListener('click', eventHandler);
renderSelectProduct();















