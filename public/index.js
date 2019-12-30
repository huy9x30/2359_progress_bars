export const generateButtons = (buttons, limit) => {
    return buttons.map((buttonValue, index) => {
        const buttonElement = document.createElement('button')

        buttonElement.setAttribute('id', `button-${index + 1}`)
        buttonElement.innerText = buttonValue > 0 ? `+${buttonValue.toString()}` : buttonValue.toString()
        buttonElement.onclick = (e) => {
            const filledElement = document.querySelector('.active > .filled')
            const legendElement = document.querySelector('.active > .filled > .legend')
            const totalValue = parseInt(filledElement.getAttribute('data-value')) + buttonValue

            legendElement.innerText = totalValue <= 0 ? '0%' : `${Math.round(totalValue / limit * 100)}%`
            filledElement.setAttribute('data-value', totalValue <= 0 ? 0 : totalValue)

            if (totalValue > limit) {
                filledElement.setAttribute('style', `width: 100%; background: red;`)
                legendElement.setAttribute('style', `color: #fff`)
            } else if (totalValue < 0) {
                filledElement.setAttribute('style', `width: 0;`)
                legendElement.setAttribute('style', `color: #333`)
            } else {
                filledElement.setAttribute('style', `width: ${Math.round(totalValue / limit * 100)}%`)
                legendElement.setAttribute('style', `color: #333`)
            }
        }
        return buttonElement
    })
}

export const generateBars = (parentElement, bars, limit) => {
    bars.map((barValue, index) => {
        const boxElement = document.createElement('div')
        const barElement = document.createElement('div')
        const filledElement = document.createElement('div')
        const legendElement = document.createElement('div')
        const percentage = `${Math.round(barValue / limit * 100)}`

        legendElement.classList.add('legend')
        legendElement.innerText = `${percentage}%`

        filledElement.classList.add('filled')
        filledElement.setAttribute('data-value', barValue)
        filledElement.setAttribute('style', `width: ${percentage}%`)

        barElement.classList.add('progress')
        barElement.setAttribute('id', `bar-${index + 1}`)
        if (index === 0) barElement.classList.add('active')

        parentElement
            .appendChild(barElement)
            .appendChild(filledElement)
            .appendChild(legendElement)
    })
}

export const generateBarSelect = (parentElement, bars) => {
    bars.map((bar, index) => {
        const selectOptionElement = document.createElement('option')
        selectOptionElement.setAttribute('value', (index + 1).toString())
        selectOptionElement.innerText = `#progress-${index + 1}`
        parentElement.appendChild(selectOptionElement)
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

export const progressBar = (apiResponse) => {
    generateBars(document.getElementById('bars'), apiResponse.bars, apiResponse.limit)
    const buttons = generateButtons(apiResponse.buttons, apiResponse.limit)
    buttons.map(button => document.getElementById('buttons').appendChild(button))
    generateBarSelect(document.getElementById('bar-select'), apiResponse.bars)
    document.getElementById('bar-select').onchange = onChangeSelect
}

export const getApiAndGenerate = (req) => {
    // var req = new XMLHttpRequest();
    req.onload = function (e) {
        if (e.target.status === 200) {
            const apiResponse = e.target.response
            progressBar(apiResponse)
        } else {
            const errorElement = document.getElementById('error')
            errorElement.innerText = e.target.response
        }
    }
    req.open('GET', 'http://localhost:8800/api/endpoint', true);
    req.responseType = 'json';
    req.send();
}

getApiAndGenerate(new XMLHttpRequest())