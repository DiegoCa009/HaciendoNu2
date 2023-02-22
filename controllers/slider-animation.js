
class AnimationSlider{
    constructor(){
        this.play_animation;
        this.play()

    }
    play(){
        const box_slider = document.querySelectorAll('.content_box-animation-slide');
        this.play_animation = setInterval(()=>{
            console.log('comenzando animacion')
            
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
    }

    stop(){
        clearInterval(this.play_animation);
    }

    start(element){
        element.addEventListener('mouseover',()=>{
            this.stop()
        });

        element.addEventListener('mouseout',()=>{
            this.play()
        });

    }

}


const animation_slider =  new AnimationSlider().start(document.querySelector('#index-content'))