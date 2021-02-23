let move = document.getElementById('move')
let content = document.getElementById('content')
let posiniX, posiniY, posfinX, posfinY, resX, resY
let contentX = content.offsetWidth
let contentY = content.offsetHeight
let abs = (nb) => {return nb < 0 ? -nb : nb}
let up = () => {move.innerText = 'up'}
let down = () => {move.innerText = 'down'}
let right = () => {move.innerText = 'right'}
let left = () => {move.innerText = 'left'}

window.addEventListener('resize', () => {
    contentX = content.offsetWidth
    contentY = content.offsetHeight
})

window.addEventListener('keydown', e => {
    k = e.keyCode
    if (k < 41 && k > 36) {
        e.preventDefault()
        switch (k) {
            case 37:
                left()
                break
            case 38:
                up()
                break
            case 39:
                right()
                break
            case 40:
                down()
                break
        }
    }
})

content.addEventListener('mousedown', e => {
    posiniX = e.offsetX
    posiniY = e.offsetY
})

content.addEventListener('mouseup', e => {
    posfinX = e.offsetX
    posfinY = e.offsetY
    resX = posfinX - posiniX
    resY = posfinY - posiniY
    
    if (resX == 0 && resY == 0) {
        let coeffdir = contentY / contentX
        let diag1 = -coeffdir * posfinX + contentY > posfinY
        let diag2 = coeffdir * posfinX > posfinY
        if (diag1) {
            if (diag2) {
                up()
            } else if (!diag2) {
                left()
            }
        } else if (!diag1) {
            if (diag2) {
                right()
            } else if (!diag2) {
                down()
            }
        }
    } else if (abs(resX) >= abs(resY)) {
        if (resX < 0) {
            left()
        } else if (resX >= 0) {
            right()
        }
    } else if (abs(resX) < abs(resY)) {
        if (resY < 0) {
            up()
        } else if (resY >= 0) {
            down()
        }
    }
})