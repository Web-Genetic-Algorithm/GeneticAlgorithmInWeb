import {convertToBinarParents, binarCrossover,addValue, binarChengebility, getRandomIntOnInterval} from '../utils/geneticSupportFunctions.js'
import { evaluate } from "https://cdn.jsdelivr.net/npm/mathjs@12.4.1/+esm";



function newGeniration(priviosGenerationBests){
  let parentAllVariability = new Array();

  for (let i = 0; i<priviosGenerationBests.length; i++){
    for (let j = i+1; j<priviosGenerationBests.length; j++){
      parentAllVariability.push([priviosGenerationBests[i],priviosGenerationBests[j]]);
    }
  }
  let newGenerationInBinar =[];
  for (let i = 0; i<parentAllVariability.length; i++){
    newGenerationInBinar.push(binarCrossover(convertToBinarParents(parentAllVariability[i])));
  }
  console.log(newGenerationInBinar);
  let isChngebility = Math.random() <= 0.25;
  if (isChngebility){
    //console.log("Is chengeing")
    let randomFromGeneration = Math.floor(Math.random() * newGenerationInBinar.length);
    //console.log(`Index${randomFromGeneration}, What${newGenerationInBinar[randomFromGeneration]}`)
    newGenerationInBinar[randomFromGeneration] = binarChengebility(newGenerationInBinar[randomFromGeneration]);
        //console.log(`After change: ${newGenerationInBinar[randomFromGeneration]}`);
  }
  
  let normalizedNewGeneration = [];
  for (let elem of newGenerationInBinar){
    normalizedNewGeneration.push(parseInt(elem, 2))
  }

  return normalizedNewGeneration
}

function getTheBestByNumArray(arrayOfNums, param, customFunc, countOfBest) {
  // Calculating value of the function for each number
  const results = arrayOfNums.map(num => ({
    value: num,
    result: evaluate(customFunc, { x: num }) // предполагаем, что функция использует x
  }));

  // Sorting by value
  results.sort((a, b) => {return param === "max" ? b.result - a.result : a.result - b.result;});

  
  return results.slice(0, countOfBest).map(item => item.value);
}

function getTheBestByNum(arrayOfNums, param, customFunc) {
  // Calculating value of the function for each number
  const results = arrayOfNums.map(num => ({
    value: num,
    result: evaluate(customFunc, { x: num }) // предполагаем, что функция использует x
  }));

  // Sorting by value
  results.sort((a, b) => {return param === "max" ? b.result - a.result : a.result - b.result;});

  // Return just first value
   return results[0].value
}

function firstNumsArray(funcRange){
  return getRandomIntOnInterval(funcRange[0], funcRange[1])
}


function geneticAlgorithm(funcRange, breakType, customFunc, maxOrMin, cacheNumber, genCount, workTime){
  let generationNumber = 0;

  let allNumsFromGeniration = [];

  let bestNumsFromGeniration =[];
  let bestNumFromGeneration = NaN;


  let historyOfGenirations = []

  //Creation of the first geniration
  for (let i = 0; i < 12; i++){
    allNumsFromGeniration[i] =firstNumsArray(funcRange);
  }

  bestNumsFromGeniration = getTheBestByNumArray(allNumsFromGeniration, maxOrMin, customFunc, 8);
  bestNumFromGeneration = getTheBestByNum(allNumsFromGeniration, maxOrMin, customFunc);
  addValue(generationNumber,bestNumFromGeneration, cacheNumber, historyOfGenirations)
  console.log(`№${generationNumber} Генерация:${bestNumsFromGeniration} Лучшее ${bestNumFromGeneration}`);
  if (breakType ==="generations"){
    for (generationNumber=1; generationNumber < genCount;generationNumber++){
      allNumsFromGeniration = newGeniration(bestNumsFromGeniration);

      bestNumsFromGeniration = getTheBestByNumArray(allNumsFromGeniration, maxOrMin, customFunc, 8);

      bestNumFromGeneration = getTheBestByNum(allNumsFromGeniration, maxOrMin, customFunc);
      
      addValue(generationNumber,bestNumFromGeneration, cacheNumber, historyOfGenirations)
      //console.log(historyOfGenirations);
    
      console.log(`№${generationNumber} Генерация:${bestNumsFromGeniration} Лучшее ${bestNumFromGeneration}`);

      if (historyOfGenirations.length >= cacheNumber && historyOfGenirations.every(val => val === historyOfGenirations[0].answer)){
        console.log(historyOfGenirations);
        break;
      }
    }
    console.log(historyOfGenirations)
    return {
      "bestIndividual": {
      "value": bestNumFromGeneration,
      "fitness": evaluate(customFunc, {x:bestNumFromGeneration})
    },
      "history": historyOfGenirations
    }
  }
  else{
    //TO DO ASENHRONIC ALGORITHM//
  }
}

console.log(binarChengebility(binarCrossover(convertToBinarParents([3,50]))));




geneticAlgorithm([0, 50],"generations","-x^2+50*x", "max", 200, 250, NaN)

/*
{
  "range": [0, 100],
  "stopType": "time", // или "generations"
  "customFunction": "x * sin(x)", // опционально
  "taskType": "max", // или "min"
  "cacheNum": 20 // опционально, для кеширования
}
  */