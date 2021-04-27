'use strict';

let imgArray = [
    'bag.jpg',
    'banana.jpg',
    'bathroom.jpg',
    'boots.jpg',
    'breakfast.jpg',
    'bubblegum.jpg',
    'chair.jpg',
    'cthulhu.jpg',
    'dog-duck.jpg',
    'dragon.jpg',
    'pen.jpg',
    'pet-sweep.jpg',
    'scissors.jpg',
    'shark.jpg',
    'sweep.png',
    'tauntaun.jpg',
    'tauntaun.jpg',
    'unicorn.jpg',
    'usb.gif',
    'water-can.jpg',
  ];


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
let attempt=25;








function Product(name , img ) {
    this.name = name;
    this.img =  `./img/${name}`;
    this.shown = 0;
    this.clicks = 0;
    Product.all.push(this);
    
}
Product.all = [];


for (let i = 0; i < imgArray.length; i++) {
    new Product(imgArray[i]);
}

function eventHandler(event) {
    if ((event.target.id == 'leftImage' || event.target.id == 'rightImage' || event.target.id == 'middleImage') && clickNumber < attempt) {

        if (event.target.id == 'leftImage') {
            Product.all[leftImg].clicks++;
        }

        if (event.target.id == 'rightImage') {
            Product.all[rightImg].clicks++;
        }

        if (event.target.id == 'middleImage') {
            Product.all[middleImg].clicks++;
        }
        clickNumber++;
        renderSelectProduct();

    } else {
        console.log(Product.all);
        photoSection.addEventListener('click', eventHandler);
        
    }
}
function renderSelectProduct() {
    let leftImgIndex = getRandomNum(0, imgArray.length - 1);
   let  rightImgIndex ;
   let  middleImgIndex;
    do {
         rightImgIndex = getRandomNum(0, imgArray.length - 1);
         middleImgIndex = getRandomNum(0, imgArray.length - 1);
    }
 while ( leftImgIndex === rightImgIndex || leftImgIndex === middleImgIndex || rightImgIndex === middleImgIndex );

   
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
photoSection.addEventListener('click', eventHandler);
renderSelectProduct();











function getRandomNum(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}


function eventButton( e) {
    let ulistEl = document.createElement('ul');
    p.appendChild(ulistEl);

    for (let i = 0; i < Product.all.length; i++) {
        let listEl = document.createElement('li');
        ulistEl.appendChild(listEl);
        listEl.textContent =`${Product.all[i].name} had a ${Product.all[i].clicks} votes , and was seen a ${Product.all[i].shown}.`;

    }

    button.removeEventListener('click', eventHandler);
    renderChart();
    saveProduct();

  }  
function saveProduct() {
  let allProductSaved = JSON.stringify(Product.all);
  localStorage.setItem('allProductSaved', allProductSaved);

}


function renderChart() {

    let clicks = [];
    let names = [];
    let shown = [];
    for( let i = 0; i < Product.all.length; i++ ) {
      clicks.push( Product.all[i].clicks );
      names.push( Product.all[i].name );
      shown.push( Product.all[i].shown );
  
    }
  
    let ctx = document.getElementById( 'myChart' ).getContext( '2d' );
    let myChart = new Chart( ctx, {
      type: 'bar',
      data: {
        labels: names,
        datasets: [{
          label: '# of Votes',
          data: clicks,
          backgroundColor:
            'rgba(255, 99, 132, 0.2)',
          borderColor:
            'rgba(255, 99, 132, 1)',
          borderWidth: 1,
        }, {
          label: '# of shown',
          data: shown,
          backgroundColor:
            'rgba(144, 99, 100, 0.2)',
          borderColor:
            'rgba(144, 99, 100, 1)',
          borderWidth: 1,
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    } );
   
  
  }
  
function getData() {
  let data = JSON.parse( localStorage.getItem( 'allProductSaved' ) );
  if( data ) {
    for( let i = 0; i < data.length; i++ ) {
      new Product( data[i].name, data[i].img, data[i].shown, data[i].clicks );
    }
    renderSelectProduct();
  }
}


















button.addEventListener('click', eventButton);
// renderSelectProduct();














