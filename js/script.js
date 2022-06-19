const navMobile = document.querySelector(".nav-mobile");
const navMobileZone = document.querySelector(".nav-mobile-fake-zone");

const navBarsbtn = document.querySelector(".nav-bars-btn");

const navBarCloseBtn = document.querySelector("#btn-close-menu-mobile");

navBarsbtn.addEventListener('click', () => {
    navBarCloseBtn.classList.toggle('show');
    navMobile.classList.toggle("active");
    navMobileZone.classList.toggle("active");
    navMobileZone.classList.toggle("show");
});
navMobileZone.addEventListener('click', () => {
    navBarCloseBtn.classList.toggle('show');
    navMobile.classList.toggle("active");
    navMobileZone.classList.toggle("active");
    navMobileZone.classList.toggle("show");
});
navBarCloseBtn.addEventListener('click', () => {
    navBarCloseBtn.classList.toggle('show');
    navMobile.classList.toggle("active");
    navMobileZone.classList.toggle("active");
    navMobileZone.classList.toggle("show");
});

$('.tabgroup > div').hide();
// console.log($('.tabgroup > div'));
$('.tabgroup > div:first-of-type').show();
$('.tabs a').click(function(e){
  e.preventDefault();
    var $this = $(this),
        tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
        others = $this.closest('li').siblings().children('a'),
        target = $this.attr('href');
    others.removeClass('active');
    $this.addClass('active');
    $(tabgroup).children('div').hide();
    $(target).show();
  
})



// slider
'use strict'
var testim = document.getElementById("testim"),
    testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 4500,
    currentSlide = 0,
    currentActive = 0,
    testimTimer,
    touchStartPos,
    touchEndPos,
    touchPosDiff,
    ignoreTouch = 30;
;

window.onload = function() {
    
    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("active");
            testimContent[k].classList.remove("inactive");
            testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
            testimContent[currentActive].classList.add("inactive");            
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
    
    testim.addEventListener("touchstart", function(e) {
        touchStartPos = e.changedTouches[0].clientX;
    })
  
    testim.addEventListener("touchend", function(e) {
        touchEndPos = e.changedTouches[0].clientX;
      
        touchPosDiff = touchStartPos - touchEndPos;
      
        console.log(touchPosDiff);
        console.log(touchStartPos); 
        console.log(touchEndPos); 

      
        if (touchPosDiff > 0 + ignoreTouch) {
            testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
            testimRightArrow.click();
        } else {
          return;
        }
      
    })
}





window.addEventListener('resize', function(event) {
    var width_sc = $(window).width();
    
}, true);


function ChangeBackgroungImageOfTab(tabName, imagePrefix)
{
    var urlString = 'url(' + imagePrefix + ')';
    document.getElementById(tabName).style.backgroundImage =  urlString;
}