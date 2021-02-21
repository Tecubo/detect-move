let move = document.getElementById('move')

let posiniX = 0
let posiniY = 0

let posfinX = 0
let posfinY = 0

function moveMouse (e) {
}

function abs (nb) {
    if (nb < 0) {
        return -nb
    }
    return nb
}

document.addEventListener('mousedown', (edown) => {
    posiniX = edown.pageX
    posiniY = edown.pageY
    document.addEventListener('mousemove', moveMouse)
})

document.addEventListener('mouseup', (eup) => {
    posfinX = eup.pageX
    posfinY = eup.pageY
    document.removeEventListener('mousemove', moveMouse)
    let resX = posfinX - posiniX
    let resY = posfinY - posiniY
    
    if (resX == 0 && resY == 0) {
        move.innerText = 'click'
    } else if (abs(resX) >= abs(resY)) {
        if (resX < 0) {
            move.innerText = 'left'
        } else if (resX >= 0) {
            move.innerText = 'right'
        }
    } else if (abs(resX) < abs(resY)) {
        if (resY < 0) {
            move.innerText = 'up'
        } else if (resY >= 0) {
            move.innerText = 'down'
        }
    }
})