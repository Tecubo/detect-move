let move = document.getElementById('move')
let content = document.getElementById('content')
let param_button = document.getElementById('param-button')
let params = document.getElementById('params')
let params_window = document.getElementById('params-window')
let control_buttons = document.getElementsByClassName('control-button')
let posiniX, posiniY, posfinX, posfinY, resX, resY, command
let contentX = content.offsetWidth
let contentY = content.offsetHeight
let leftkey = 37
let upkey = 38
let rightkey = 39
let downkey = 40
let abs = (nb) => { return nb < 0 ? -nb : nb }
let up = () => { move.innerText = 'up' }
let down = () => { move.innerText = 'down' }
let right = () => { move.innerText = 'right' }
let left = () => { move.innerText = 'left' }
let stopPropagation = (e) => { e.stopPropagation() }
let paramsVisibility = false

window.addEventListener('resize', () => {
    contentX = content.offsetWidth
    contentY = content.offsetHeight
})

let keymove = (e) => {
    k = e.keyCode
    switch (k) {
        case leftkey:
            e.preventDefault()
            left()
            break
        case upkey:
            e.preventDefault()
            up()
            break
        case rightkey:
            e.preventDefault()
            right()
            break
        case downkey:
            e.preventDefault()
            down()
            break
    }
}

let clickMoveDown = (e) => {
    posiniX = e.offsetX
    posiniY = e.offsetY
}

let clickMoveUp = (e) => {
    x = e.offsetX;
    y = e.offsetY;
    dx = x - posiniX;
    dy = y - posiniY;

    if (dx || dy)
        get_move(dx, dy);
    else
        get_move(x - contentX / 2, y - contentY / 2)
}

function get_move(x, y) {
    x *= contentY / contentX;

    if (abs(x) > abs(y)) // axe x
    {
        if (x < 0)
            left()
        else
            right()
    }
    else // axe y
    {
        if (y < 0)
            up()
        else
            down()
    }
}

let startParams = (e) => {
    e.stopPropagation()
    if (paramsVisibility) {
        hideParams()
    } else {
        showParams()
    }
}

let showParams = () => {
    paramsVisibility = true
    move.style.display = 'none'
    params.style.display = 'flex'

    window.removeEventListener('keydown', keymove)
    content.removeEventListener('mousedown', clickMoveDown)
    content.removeEventListener('mouseup', clickMoveUp)

    params_window.addEventListener('click', stopPropagation)
    params.addEventListener('click', hideParams)

    for (let i = 0; i < control_buttons.length; i++) {
        let button = control_buttons[i]
        button.addEventListener('click', changeControl)
    }
}

let hideParams = () => {
    paramsVisibility = false
    move.style.display = 'block'
    params.style.display = 'none'

    window.addEventListener('keydown', keymove)
    content.addEventListener('mousedown', clickMoveDown)
    content.addEventListener('mouseup', clickMoveUp)

    params_window.removeEventListener('click', stopPropagation)
    params.removeEventListener('click', hideParams)
}

let changeControl = (e) => {
    target = e.target
    target.style.background = 'green'
    const running = document.createElement('div')
    running.innerText = 'Appuyer sur une touche pour changer...'
    running.style.fontSize = '20px'
    running.style.fontStyle = 'italic'
    running.style.marginLeft = '10px'
    running.setAttribute('id', 'running')
    target.parentElement.appendChild(running)
    command = target.parentElement.getAttribute('id')
    window.addEventListener('keydown', bindControl)
}

let bindControl = (e) => {
    k = e.keyCode
    switch (command) {
        case 'up':
            upkey = k
            break
        case 'down':
            downkey = k
            break
        case 'left':
            leftkey = k
            break
        case 'right':
            rightkey = k
            break
    }
    window.removeEventListener('keydown', bindControl)
    target.style.background = '#cccccc'
    let running = document.getElementById('running')
    running.innerText = 'Changement effectué'
    window.setTimeout(() => {
        running.parentElement.removeChild(running)
    }, 1000)
}

window.addEventListener('keydown', keymove)
content.addEventListener('mousedown', clickMoveDown)
content.addEventListener('mouseup', clickMoveUp)

param_button.addEventListener('mouseup', startParams)