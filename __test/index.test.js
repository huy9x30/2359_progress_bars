import {generateButtons, generateBars, generateSelectOptions, onChangeSelect, onButtonClick} from "../public";

test('generateButtons should return 4 button elements', () => {
    let button1 = document.createElement('button')
    button1.setAttribute('id', 'button-1')
    let button2 = document.createElement('button')
    button2.setAttribute('id', 'button-2')
    let button3 = document.createElement('button')
    button3.setAttribute('id', 'button-3')
    let button4 = document.createElement('button')
    button4.setAttribute('id', 'button-4')

    expect(generateButtons([21, 19, -48, -30], 130)).toEqual([button1, button2, button3, button4]);
});

test('generateBars should return 3 div elements with children', () => {
    let bar1 = document.createElement('div')
    bar1.classList.add('progress')
    bar1.classList.add('active')
    let filled1 = document.createElement('div')
    filled1.classList.add('filled')
    filled1.setAttribute('data-value', '62')
    filled1.setAttribute('style', 'width: 48%')
    let legend1 = document.createElement('div')
    legend1.classList.add('legend')
    bar1.appendChild(filled1).appendChild(legend1)

    let bar2 = document.createElement('div')
    bar2.classList.add('progress')
    let filled2 = document.createElement('div')
    filled2.classList.add('filled')
    filled2.setAttribute('data-value', '64')
    filled2.setAttribute('style', 'width: 49%')
    let legend2 = document.createElement('div')
    legend2.classList.add('legend')
    bar2.appendChild(filled2).appendChild(legend2)

    let bar3 = document.createElement('div')
    bar3.classList.add('progress')
    let filled3 = document.createElement('div')
    filled3.classList.add('filled')
    filled3.setAttribute('data-value', '83')
    filled3.setAttribute('style', 'width: 64%')
    let legend3 = document.createElement('div')
    legend3.classList.add('legend')
    bar3.appendChild(filled3).appendChild(legend3)

    expect(generateBars([62, 64, 83], 130)).toEqual([bar1, bar2, bar3]);
});

test('generateSelectOptions should return 3 option elements', () => {
    let option1 = document.createElement('option')
    option1.setAttribute('value', '1')
    let option2 = document.createElement('option')
    option2.setAttribute('value', '2')
    let option3 = document.createElement('option')
    option3.setAttribute('value', '3')

    expect(generateSelectOptions([62, 64, 83], 130)).toEqual([option1, option2, option3]);
});

test('onChangeSelect should add class active to second bar element', () => {
    let bar1 = document.createElement('div')
    bar1.classList.add('progress')
    bar1.classList.add('active')

    let bar2 = document.createElement('div')
    bar2.classList.add('progress')

    let bar3 = document.createElement('div')
    bar3.classList.add('progress')

    let barsElement = document.createElement('div')
    barsElement.setAttribute('id', 'bars')

    document.body.appendChild(barsElement)

    const barElements = [bar1, bar2, bar3]
    barElements.map(bar => barsElement.appendChild(bar))

    onChangeSelect(barElements, {target: {value: 2}})

    expect(bar1.classList.toString()).toBe('progress')
    expect(bar2.classList.toString()).toBe('progress active')
    expect(bar3.classList.toString()).toBe('progress')
});