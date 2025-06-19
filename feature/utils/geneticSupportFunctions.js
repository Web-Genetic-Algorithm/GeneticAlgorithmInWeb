/**
 * Converts array of numbers to binar number
 * @param {*} parenst array of cuple of numbers
 * @returns binar represintation of
 */
export function convertToBinarParents(parenst) {
    const parentOne = parenst[0];
    const parentTwo = parenst[1];

    let binarParentOne = parentOne.toString(2);
    let binarParentTwo = parentTwo.toString(2);
    /*
    console.log(binarParentOne);
    console.log(binarParentTwo);
    */
    let differ = 0;
    if (binarParentOne.length > binarParentTwo.length) {
        differ = binarParentOne.length - binarParentTwo.length;
        for (let i = 0; i < differ; i++) {
            binarParentTwo = '0' + binarParentTwo;
        }
    }
    else if (binarParentOne.length < binarParentTwo.length) {
        let differ = binarParentTwo.length - binarParentOne.length;
        for (let i = 0; i < differ; i++) {
            binarParentOne = '0' + binarParentOne;
        }
    }

    if (binarParentOne.length % 2 !== 0) {
        binarParentOne = '0' + binarParentOne;
        binarParentTwo = '0' + binarParentTwo;
    }
    /*
    console.log(binarParentOne);
    console.log(binarParentTwo);
    */
    return [binarParentOne, binarParentTwo];
}


/**
 * Crossovers two binar numbers
 * @param {*} binarParents - cupple of binar numbers 
 * @returns - crosovered child of two numbers
 */
export function binarCrossover(binarParents) {
    let newChild = '';
    const condition = Math.random() < 0.5 ? (i) => i % 2 === 0 : (i) => i % 2 !== 0;
    for (let i = 0; i < binarParents[0].length; i++) {
        if (condition(i)) {
            newChild = newChild + binarParents[0][i];
        }
        else {
            newChild = newChild + binarParents[1][i];
        }
    }

    return newChild;
}


/**
 * 
 * @param {*} binarNum - binar nuber to mutate
 * @returns binar number with mutation
 */
export function binarChengebility(binarNum) {
    let changedBinarNum = binarNum.split('');
    const binarNumLength = binarNum.length;
    let randomPosition = Math.floor(Math.random() * binarNumLength);
    console.log(randomPosition);

    if (changedBinarNum[randomPosition] == '1') {
        //console.log("Is one");
        changedBinarNum[randomPosition] = '0';
    }
    else {
        changedBinarNum[randomPosition] = '1';
        //console.log("Is zero");
    }

    return changedBinarNum.join("");
}

export function getRandomIntOnInterval(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}


export function addValue(gen, val, historyLength, lastValues) {
    lastValues.push({ generation: gen, answer: val });
    if (lastValues.length > historyLength) {
        lastValues.shift(); // удаляем самое старое значение
    }
}

export async function workForDuration(fn, timeDuration) {
    const end = Date.now() + timeDuration;
    while (Date.now() < end) {
        await fn();
    }
}



//console.log(binarChengebility(binarCrossover(convertToBinarParents([3,50]))));