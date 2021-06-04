window.addEventListener('DOMContentLoaded', function(){

    'use strict';

    let tab = document.querySelectorAll(".info-header-tab"),
        info = document.querySelector(".info-header"),
        tabContent = document.querySelectorAll(".info-tabcontent");
    
    function hideTabContent(a){
        for(let i=a; i<tabContent.length;i++){
            tabContent[i].classList.remove('show');
            tabContent[i].classList.add('hide');
        }
    }

    hideTabContent(1);

    function showTabContent(b){
        if(tabContent[b].classList.contains('hide')){
            tabContent[b].classList.remove('hide');
            tabContent[b].classList.add('show');           
        }
    }

    info.addEventListener('click', function(event){
        let target = event.target;
        if(target && target.classList.contains('info-header-tab')){
            for(let i=0;i<tab.length;i++){
                if(target==tab[i]){
                    hideTabContent(0);
                    showTabContent(i);
                }
            }
        }
    })

    //Timer

    function getDeadline(){
       let newDate = Date.parse(new Date(2021, 4, 20)),
           date = Date.parse(new Date());
       let sec = Math.floor((newDate - date)/1000)%60,
           minutes = Math.floor((newDate - date)/1000/60)%60,
           hour = Math.floor((newDate - date)/1000/60/60);

        return {
            'hours':hour,
            'minutes':minutes,
            'seconds':sec
        }
    }

    function updateTime(){
        let deadline = getDeadline();
        document.querySelector('.hours').textContent = deadline.hours;
        document.querySelector('.minutes').textContent = deadline.minutes;
        document.querySelector('.seconds').textContent = deadline.seconds;
    }
    
    setInterval(updateTime, 1000);

    //modal

    let more = document.querySelector('.more'),
        overlay = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close');
    
    more.addEventListener('click', function(){
        overlay.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    });
    
    close.addEventListener('click',function(){
        overlay.style.display = 'none';
        this.classList.remove('more-splash');
        document.body.style.overflow = '';
    });

    //slider
    let slideIndex = 0,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    function showSlides(a){
        a = (a<0) ? a = slides.length-1 : a = a%slides.length;
        slideIndex = a
        slides.forEach((item)=>item.style.display = 'none');
        dots.forEach((item)=>item.classList.remove('dot-active'));
        slides[a].style.display = 'block';
        dots[a].classList.add('dot-active');
    }

    showSlides(0);

    next.addEventListener('click',()=>{
        showSlides(++slideIndex);
    });

    prev.addEventListener('click',()=>{
        showSlides(--slideIndex);
    });

    dotsWrap.addEventListener('click',(event)=>{
        for(let i=0;i<dots.length;i++){
            if(event.target==dots[i]){
                    dots[i].classList.add('dot-active');
                    showSlides(i);
                    slideIndex = i;
            }
        }
    });

    //calc

    let persons = document.querySelectorAll('.counter-block-input')[0],
        restDays = document.querySelectorAll('.counter-block-input')[1],
        place = document.getElementById('select'),
        totalValue = document.getElementById('total'),
        personsSum = 0,
        daysSum = 0,
        total = 0;
    totalValue.innerHTML = 0;

    persons.addEventListener('change',function(){
        personsSum = +this.value;
        total = (personsSum*daysSum)*400;
        totalValue.innerHTML = total*place.options[place.selectedIndex].value;
        });

    
    restDays.addEventListener('change',function(){
        daysSum = +this.value;
        total = (personsSum *daysSum)*400;
        totalValue.innerHTML = total*place.options[place.selectedIndex].value;
    });

    place.addEventListener('change',function(){
        totalValue.innerHTML = total* this.options[this.selectedIndex].value;
    })

});