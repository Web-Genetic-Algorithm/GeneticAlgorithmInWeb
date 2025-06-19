import { convertToBinarParents, binarCrossover, binarChengebility, getRandomIntOnInterval} from '../utils/geneticSupportFunctions.js'
import { evaluate } from 'mathjs';


export function newGeniration(priviosGenerationBests) {
  let parentAllVariability = new Array();

  for (let i = 0; i < priviosGenerationBests.length; i++) {
    for (let j = i + 1; j < priviosGenerationBests.length; j++) {
      parentAllVariability.push([priviosGenerationBests[i], priviosGenerationBests[j]]);
    }
  }
  let newGenerationInBinar = [];
  for (let i = 0; i < parentAllVariability.length; i++) {
    newGenerationInBinar.push(binarCrossover(convertToBinarParents(parentAllVariability[i])));
  }
  //console.log(newGenerationInBinar);
  let isChngebility = Math.random() <= 0.25;
  if (isChngebility) {
    //console.log("Is chengeing")
    let randomFromGeneration = Math.floor(Math.random() * newGenerationInBinar.length);
    //console.log(`Index${randomFromGeneration}, What${newGenerationInBinar[randomFromGeneration]}`)
    newGenerationInBinar[randomFromGeneration] = binarChengebility(newGenerationInBinar[randomFromGeneration]);
    //console.log(`After change: ${newGenerationInBinar[randomFromGeneration]}`);
  }

  let normalizedNewGeneration = [];
  for (let elem of newGenerationInBinar) {
    normalizedNewGeneration.push(parseInt(elem, 2))
  }

  return normalizedNewGeneration
}

export function getTheBestByNumArray(arrayOfNums, param, customFunc, countOfBest) {
  // Calculating value of the function for each number
  const results = arrayOfNums.map(num => ({
    value: num,
    result: evaluate(customFunc, { x: num }) // предполагаем, что функция использует x
  }));

  // Sorting by value
  results.sort((a, b) => { return param === "max" ? b.result - a.result : a.result - b.result; });


  return results.slice(0, countOfBest).map(item => item.value);
}

export function getTheBestByNum(arrayOfNums, param, customFunc) {
  // Calculating value of the function for each number
  const results = arrayOfNums.map(num => ({
    value: num,
    result: evaluate(customFunc, { x: num }) // предполагаем, что функция использует x
  }));

  // Sorting by value
  results.sort((a, b) => { return param === "max" ? b.result - a.result : a.result - b.result; });

  // Return just first value
  return results[0].value
}

export function firstNumsArray(funcRange) {
  return getRandomIntOnInterval(funcRange[0], funcRange[1])
}

