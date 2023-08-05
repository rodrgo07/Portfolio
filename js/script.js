const parallax_el = document.querySelectorAll('.parallax')

let xValue = 0, yValue = 0
let rotateDegree = 0

function update(cursorPosition){
    parallax_el.forEach(el => {
        let speedx = el.dataset.speedx
        let speedy = el.dataset.speedy
        let speedz = el.dataset.speedz
        let rotateSpeed = el.dataset.rotation
        
        let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1
        let zValue = (cursorPosition - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.1

        el.style.transform = 
        `perspective(2300px) 
        translateZ(${zValue * speedz}px)
        rotateY(${rotateDegree * rotateSpeed}deg)
        translateX(calc(-50% + ${-xValue * speedx}px))
        translateY(calc(-50% + ${-yValue * speedy}px))`
    })
}

update(0)

window.addEventListener('mousemove', (e) => {
    if(timeline.isActive()){ 
        document.documentElement.style.overflow = 'hidden'
        document.body.scroll = "no"
        return
    }

    xValue = e.clientX - window.innerWidth / 2
    yValue = e.clientY - window.innerHeight / 2
    
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20
    update(e.clientX)
})

/* GSAP Animation */

let timeline = gsap.timeline()

Array.from(parallax_el)
.filter(el => !el.classList.contains('text'))
.forEach((el) => {
    timeline.from(
        el,
        {
            top: `${el.offsetHeight / 2 + +el.dataset.distance}px`,
            duration: 2,
            ease: "power3.out",
        },
        "1"    
    )
})

    timeline.from(
        '.text h1',
        {
            y: window.innerHeight - document.querySelector('.text h1')
            .getBoundingClientRect().top + 200,
            duration: 2,
        },
        "2.5"
    ).from(
        '.text h2',
        {
            y: -150,
            opacity: 0,
            duration: 1.5,
        },
        "3"
    ).from(
        '.hide',
        {
            opacity: 0,
            duration: 1.5,
            onComplete: () => {
                document.documentElement.style.overflowX = 'hidden';
                document.documentElement.style.overflowY = 'visible';
                document.body.style.overflowX = 'hidden';
            },
        },
        "3"
    )