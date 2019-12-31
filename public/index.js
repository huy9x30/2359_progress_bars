export const generateButtons = (buttons, limit) => {
    return buttons.map((buttonValue, index) => {
        const buttonElement = document.createElement('button')

        buttonElement.setAttribute('id', `button-${index + 1}`)
        buttonElement.innerText = buttonValue > 0 ? `+${buttonValue.toString()}` : buttonValue.toString()
        buttonElement.onclick = onButtonClick.bind(this, buttonValue, limit)
        return buttonElement
    })
}

export const onButtonClick = (buttonValue, limit, e) => {
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

export const generateBars = (bars, limit) => {
    return bars.map((barValue, index) => {
        const barElement = document.createElement('div')
        const filledElement = document.createElement('div')
        const legendElement = document.createElement('div')
        const percentage = `${Math.round(barValue / limit * 100)}`

        barElement.classList.add('progress')
        if (index === 0) barElement.classList.add('active')

        filledElement.classList.add('filled')
        filledElement.setAttribute('data-value', barValue)
        filledElement.setAttribute('style', `width: ${percentage}%`)

        legendElement.classList.add('legend')
        legendElement.innerText = `${percentage}%`

        barElement
            .appendChild(filledElement)
            .appendChild(legendElement)
        return barElement
    })
}

export const generateSelectOptions = (bars) => {
    return bars.map((bar, index) => {
        const optionElement = document.createElement('option')
        optionElement.setAttribute('value', (index + 1).toString())
        optionElement.innerText = `#progress-${index + 1}`
        return optionElement
    })
}

export const onChangeSelect = (bars, e) => {
    if (bars) {
        bars.forEach((progress, index) => {
            progress.classList.remove('active')
            if (parseInt(e.target.value) === (index + 1)) {
                progress.classList.add('active')
            }
        })
    }
}

export const progressBar = (apiResponse) => {
    const barElements = generateBars(apiResponse.bars, apiResponse.limit)
    barElements.map(bar => document.getElementById('bars').appendChild(bar))
    generateButtons(apiResponse.buttons, apiResponse.limit)
        .map(button => document.getElementById('buttons').appendChild(button))
    generateSelectOptions(apiResponse.bars)
        .map(option => document.getElementById('bar-select').appendChild(option))
    document.getElementById('bar-select').onchange = onChangeSelect.bind(this, barElements)
}

export const callApi = (method, url) => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest()
        req.onload = function (e) {
            if (e.target.status === 200) {
                resolve(e.target)
            } else {
                reject(e.target)
            }
        }
        req.open(method, url, true);
        req.responseType = 'json';
        req.send();
    })
}

export const getApiAndGenerate = () => {
    callApi('GET', 'http://localhost:8080/api/endpoint')
        .then(success => {
            progressBar(success.response)
        })
        .catch(error => {
            const errorElement = document.getElementById('error')
            errorElement.innerText = error.response
        });
}

getApiAndGenerate()