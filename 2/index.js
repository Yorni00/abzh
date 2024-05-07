//system
let d = document

//html objects
let start_button = d.getElementById('start')
let game_window = d.getElementById('game')
let timer_header = d.getElementById('time-header')
let time = d.getElementById('time')
let time_input = d.getElementById('game-time')
let result_header = d.getElementById('result-header')
let result = d.getElementById('result')


//game vars
let score = 0
let is_game_started = false

//syntax sugar
sb = start_button
gw = game_window
th = timer_header
t = time
ti = time_input
rh = result_header
r = result

function hide(el)
{
    el.classList.add('hide')
    console.log(el + " was hidden")
}
function show(el)
{
    el.classList.remove('hide')
    console.log(el + " was shown")
}
function randi(from, to)
{
    return Math.floor(Math.random() * (to - from + 1) + from)
}

//listeners
sb.addEventListener('click', Start)
ti.addEventListener('input', SetTime)
gw.addEventListener('click', GameClick)


//handlers
function Start()
{
    console.log("Game started");
    is_game_started = true
    score = 0
    SetTime()

    hide(sb)
    show(th)
    hide(rh)

    let inter = setInterval(function(){
        let time = parseFloat(t.textContent)
        if (time > 0)
        {
        t.textContent = (time - 0.1).toFixed(1)
        }
        if (time == 0)
        {
            t.textContent = "A vsyo"
            show(sb)
            is_game_started = false
            clearInterval(inter)
            EndGame()
        }
    }, 100)

    RenderBox()
}
function SetTime()
{
    t.textContent = ti.value
}
function GameClick()
{
    if (!is_game_started){return}
    if (event.target.dataset.box)
    {
        score++
        RenderBox()
    }

}
function RenderBox()
{
    //clear game area
    gw.innerHTML = ''
    //create objets
    let box = d.createElement('div')
    let size = randi(10, 100)
    let areaSize = gw.getBoundingClientRect()
    let maxTop = areaSize.height - size
    let maxLeft = areaSize.width - size

    box.style.height = box.style.width = size + 'px'
    box.style.position = 'absolute'
    box.style.left = randi(0, maxLeft) + 'px'
    box.style.top = randi(0, maxTop) + 'px'
    box.style.backgroundColor = `rgb(${randi(0,255)},${randi(0,255)},${randi(0,255)})`
    /*'rgb(' + randi(0,255) + ',' + randi(0,255) + ',' + randi(0,255) + ')'*/

    box.setAttribute('data-box','true')
    box.setAttribute('id','box');
    box.style.borderRadius = randi(0, 25) + 'px'

    game_window.insertAdjacentElement('afterbegin', box)
}
function EndGame()
{
    console.log('Game ended')
    let _box = d.getElementById('box')
    hide(timer_header)
    show(result_header)
    hide(_box)
    rh.textContent = 'Ваш результат: ' + score
}