/*global $, jQuery, alert, console, window, document, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-10-30 01:54:24
 * @version $Id$
 */

/*global $, jQuery, alert, console, window, document, angular*/
/**
 *
 * @authors Ted Shiu (ted_shiu@miiicasa.com)
 * @date    2014-10-29 10:46:32
 * @version $Id$
 */

(function () {
    function sliderPreview(option) {
        var d4 = {
            type: 'left', // center || left
            node: 'node',
            width: 320,
            count: 7
        };
        if (!option.type) {
            console.error('no set type!');
            return;
        }
        if (!option.node) {
            console.error('no set node!');
            return;
        }
        if (!option.width) {
            console.error('no set width!');
            return;
        }
        if (!option.count) {
            console.error('no set count!');
            return;
        }
        var type = option.type,
            node = option.node,
            width = option.width,
            count = option.count;

        if (type === 'left') {
            var slideshowCount = 0;
            document.querySelector('#' + node + ' .slider-preview-content').style.width = width*count + 'px';
            document.querySelector('#' + node + ' .arrow-left').addEventListener('click', function () {
                var left = document.querySelector('#' + node + ' .slider-preview-container').scrollLeft;
                slideshowCount = Math.ceil(left / width);
                slideshowCount--;
                if (slideshowCount < 0) {
                    slideshowCount = 0;
                }
                var element = document.querySelector('#' + node + ' .slider-preview-container');
                scrollTo(element, width*slideshowCount, 300);
            });
            document.querySelector('#' + node + ' .arrow-right').addEventListener('click', function () {
                var left = document.querySelector('#' + node + ' .slider-preview-container').scrollLeft;
                slideshowCount = Math.floor(left / width);
                slideshowCount++;
                if (slideshowCount > count) {
                    slideshowCount = count;
                }
                var element = document.querySelector('#' + node + ' .slider-preview-container');
                scrollTo(element, width*slideshowCount, 300);
            });
        }

        if (type === 'center') {
            var d4ViewCount = 7,
                slideshowCount = -1,
                slideCount = 0,
                dom = document.querySelectorAll('#' + node + ' .slideshow'),
                sliderContent = document.querySelector('#' + node + ' .slider-preview-content');
            sliderContent.innerHTML = '';
            console.log(dom.length);
            for (var i = 0; i < d4ViewCount; i++) {
                sliderContent.appendChild(dom[i]);
            }
            sliderContent.style.width = width*d4ViewCount + 'px';
            sliderContent.style.marginLeft = '-' + (width*d4ViewCount)/2 + 'px';
            console.log(dom);
            document.querySelector('#' + node + ' .arrow-left').addEventListener('click', function () {
                var domNew = document.querySelectorAll('#' + node + ' .slideshow');
                domNew[d4ViewCount - 1].outerHTML = '';
                delete domNew[d4ViewCount - 1];
                slideCount--;
                if (slideCount < 0) {
                    slideCount = dom.length - 1;
                }
                sliderContent.insertBefore(dom[slideCount], sliderContent.childNodes[0]);
                console.log('L');
                // slideshowCount--;
                // if (slideshowCount < -4) {
                //     slideshowCount = -4;
                // }
                console.log(slideshowCount);
                for (var i = 0; i < d4ViewCount; i++) {
                    var slider = document.querySelectorAll('#' + node + ' .slideshow')[i];
                    slider.style.left = (i - slideshowCount)*width - width + 'px';
                }
            });
            var appendCount = d4ViewCount - 1;
            document.querySelector('#' + node + ' .arrow-right').addEventListener('click', function () {
                var domNew = document.querySelectorAll('#' + node + ' .slideshow');
                appendCount++;
                if (appendCount > dom.length - 1) {
                    appendCount = 0;
                }
                domNew[0].outerHTML = '';
                delete domNew[0];
                console.log(dom[appendCount]);
                sliderContent.appendChild(dom[appendCount]);
                console.log('R');
                // slideshowCount++;
                // if (slideshowCount > 3) {
                //     slideshowCount = -1;
                // }
                for (var i = 0; i < d4ViewCount; i++) {
                    var slider = document.querySelectorAll('#' + node + ' .slideshow')[i];
                    // console.log((i - slideshowCount)*width - width);
                    slider.style.left = (i - slideshowCount)*width - width + 'px';
                }
            });
        }

        var stop;
        function scrollTo(element, to, duration) {
            var start = element.scrollLeft,
                change = to - start,
                currentTime = 0,
                increment = 20;

            clearTimeout(stop);
            var animateScroll = function(){
                currentTime += increment;
                var val = Math.easeInOutQuad(currentTime, start, change, duration);
                element.scrollLeft = val;
                if(currentTime < duration) {
                    stop = setTimeout(animateScroll, increment);
                }
            };
            animateScroll();
        }

        //t = current time
        //b = start value
        //c = change in value
        //d = duration
        Math.easeInOutQuad = function (t, b, c, d) {
            t /= d/2;
            if (t < 1) return c/2*t*t + b;
            t--;
            return -c/2 * (t*(t-2) - 1) + b;
        };

    }
    window.sliderPreview = sliderPreview;
})();


// var sliderPreview = new sliderPreview({
//     type: 'left', // center || left
//     node: 'node',
//     width: 640,
//     count: 20
// });

// var sliderPreview = new sliderPreview({
//     type: 'center', // center || left
//     node: 'node_2',
//     width: 640,
//     count: 20
// });