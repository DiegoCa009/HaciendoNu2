import './controllers/input-search.js';

let indexInfo = document.querySelector('.index-info-search');
let li = document.querySelectorAll('li');
let box_slider = document.querySelectorAll('.content_box-animation-slide');




li[0].addEventListener('click',()=>{
    indexInfo.scrollIntoView({behavior: "smooth"})
    
})




let {transform} = getComputedStyle(box_slider[0])   

let int = setInterval(()=>{

    if (getComputedStyle(box_slider[0]).transform  === 'matrix(1, 0, 0, 1, 0, 0)'){
            
            box_slider[1].style.zIndex = '';
            box_slider[0].style.transform = 'translateX(-100%)';
            box_slider[0].style.transitionDelay = '0.2s';
            box_slider[1].style.transform = 'translateX(0%)';
        
        setTimeout(() => {    
            box_slider[0].style.transitionDelay = '0s';
            box_slider[0].style.transform = 'translateX(100%)';
        }, 1400);
    }
    else
    {
            box_slider[1].style.zIndex = '-1000';
            box_slider[1].style.transitionDelay = '0.2s';
            box_slider[1].style.transform = 'translateX(-100%)';
            box_slider[0].style.transform = 'translateX(0%)';
        
       

        setTimeout(() => {
            box_slider[1].style.zIndex = '-1000';
            box_slider[1].style.transitionDelay = '0s';
            box_slider[1].style.transform = 'translateX(100%)';
        }, 1400);
    }
    

},10000)

