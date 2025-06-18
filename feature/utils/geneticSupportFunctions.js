function convertToBinarParents(parenst){
    const parentOne = parenst[0];
    const parentTwo = parenst[1];

    let binarParentOne = parentOne.toString(2);
    let binarParentTwo = parentTwo.toString(2);

    console.log(binarParentOne);
    console.log(binarParentTwo);

    let differ = 0;
    if (binarParentOne.length > binarParentTwo.length ){
        differ = binarParentOne.length - binarParentTwo.length;
        for (let i = 0; i <differ; i++){
            binarParentTwo = '0' + binarParentTwo;
        }
    }
    else if (binarParentOne.length < binarParentTwo.length){
        let differ =binarParentTwo.length- binarParentOne.length;
        for (let i = 0; i <differ; i++){
            binarParentOne = '0' + binarParentOne;
        }
    }

    if (binarParentOne.length % 2 !== 0){
        binarParentOne = '0' + binarParentOne;
        binarParentTwo = '0' + binarParentTwo;
    }
    
    console.log(binarParentOne);
    console.log(binarParentTwo);
    
    return [binarParentOne, binarParentTwo];
}

function binarCrossover(binarParents){
    let newChild = ''
    for (let i = 0; i< binarParents[0].length; i++ ){
        if (i %2 !==0){
            newChild =newChild+binarParents[0][i];
        }
        else{
            newChild =newChild+binarParents[1][i];
        }
    }

    return newChild
}

// 25% что у 1 из потомков будет изменение 
function binarChengebility(binarNum){
    let changedBinarNum = binarNum.split('');
    const binarNumLength = binarNum.length;
    let randomPosition = Math.floor(Math.random() * binarNumLength);
    console.log(randomPosition);
    
    if (changedBinarNum[randomPosition] == '1' ){
        console.log("Is one");
        changedBinarNum[randomPosition] = '0';
    }
    else{
        changedBinarNum[randomPosition] = '1';
        console.log("Is zero");
    }

    return changedBinarNum.join("");
}




console.log(binarChengebility(binarCrossover(convertToBinarParents([3,50]))));