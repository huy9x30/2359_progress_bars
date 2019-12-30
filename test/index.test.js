import {generateButtons} from '../public/index'

test('generateButtons should display 3 buttons', () => {
    let node = {
        appendChild(buttons) {
            console.log({buttons});
            // buttons.toString();
            let dom = document.createElement('p').appendChild(buttons).innerHTML;

            console.log({dom});
            expect(buttons).toEqual('');
            return {buttons};
        }
    };

    let buttons = generateButtons( [9, -12, 45], 1).map(b => {
        let p = document.createElement('p');
        p.appendChild(b);
        return p.innerHTML;
    });

    console.log({buttons});

    expect(buttons).toEqual(
        [
            `<button id="button-1"></button>`,
            `<button id="button-2"></button>`,
            `<button id="button-3"></button>`,
        ]
    );

    // expect(generateButtons( [9, -12, 45], 1)).toBe([
    //     `<button id="button-1"></button>
    //     `
    // ]);
    // expect(document.getElementById(`button-0`).text()).toEqual('+9');
    // expect(document.getElementById(`button-1`).text()).toEqual('-12');
    // expect(document.getElementById(`button-2`).text()).toEqual('+45');
    // expect(generateButtons(node, [9, -12, 45], 1)).toEqual('+45');
});

// test('generateBarSelect should display select tag with 3 options', () => {
//     expect(progressBar).toBe(3);
// });

// test('the data is peanut butter', done => {
//     function callback(data) {
//         expect(data).toBe('peanut butter');
//         done();
//     }
//
//     fetchData(callback);
// });