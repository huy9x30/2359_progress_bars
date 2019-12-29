export const getAPI = () => {
    return {"buttons": [21, 19, -48, -30], "bars": [62, 64, 83], "limit": 130}
}

export const generateButtons = (buttons, limit) => {
    buttons.map((buttonValue, index) => {
        const buttonElement = document.createElement('button')
        buttonElement.setAttribute('id', `button-${index + 1}`)
        buttonElement.innerText = buttonValue > 0 ? `+${buttonValue.toString()}` : buttonValue.toString()
        buttonElement.onclick = (e) => {
            const filledElement = document.querySelector('.active > .filled')
            const legendElement = document.querySelector('.active > .filled > .legend')
            const totalValue = parseInt(filledElement.getAttribute('data-value')) + buttonValue
            legendElement.innerText = totalValue <= 0 ? '0%' :`${Math.round(totalValue / limit * 100)}%`
            filledElement.setAttribute('data-value', totalValue <= 0 ? 0 : totalValue)
            if (totalValue > limit) {
                filledElement.setAttribute('style', `width: 100%; background: red;`)
            } else if (totalValue < 0) {
                filledElement.setAttribute('style', `width: 0;`)
            } else {
                filledElement.setAttribute('style', `width: ${Math.round(totalValue / limit * 100)}%`)
            }
        }
        document.getElementById('buttons').appendChild(buttonElement)
    })
}

export const generateBars = (bars, limit) => {
    bars.map((barValue, index) => {
        const barElement = document.createElement('div')
        const filledElement = document.createElement('div')
        const legendElement = document.createElement('div')
        const percentage = `${Math.round(barValue / limit * 100)}`
        legendElement.classList.add('legend')
        legendElement.innerText = `${percentage}%`
        filledElement.classList.add('filled')
        filledElement.setAttribute('data-value', barValue)
        filledElement.setAttribute('style', `width: ${percentage}%`)
        if (index === 0) {
            barElement.classList.add('active')
        }
        barElement.classList.add('progress')
        barElement.setAttribute('id', `bar-${index + 1}`)
        document.getElementById('bars')
            .appendChild(barElement)
            .appendChild(filledElement)
            .appendChild(legendElement)
    })
}

export const generateBarSelect = (bars) => {
    bars.map((bar, index) => {
        const selectOptionElement = document.createElement('option')
        selectOptionElement.setAttribute('value', (index + 1).toString())
        selectOptionElement.innerText = `#progress-${index + 1}`
        document.getElementById('bar-select').appendChild(selectOptionElement)
    })
}

export const onChangeSelect = (e) => {
    const bars = document.querySelectorAll('.progress')
    if (bars) {
        bars.forEach(progress => {
            progress.classList.remove('active')
        })
    }
    document.querySelector(`#bar-${e.target.value}`).classList.add('active')
}
