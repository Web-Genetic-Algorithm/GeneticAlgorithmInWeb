import { convertToBinarParents, binarCrossover, addValue, binarChengebility, workForDuration } from '../utils/geneticSupportFunctions.js'
import { evaluate } from "https://cdn.jsdelivr.net/npm/mathjs@12.4.1/+esm";
import {newGeniration, getTheBestByNumArray, getTheBestByNum,firstNumsArray} from './geneticAlgorithmFunctions.js'



export function geneticAlgorithm(funcRange, breakType, customFunc, maxOrMin, cacheNumber, genCount, workTime) {
  let generationNumber = 0;

  let allNumsFromGeniration = [];

  let bestNumsFromGeniration = [];
  let bestNumFromGeneration = NaN;


  let historyOfGenirations = []

  //Creation of the first geniration
  for (let i = 0; i < 12; i++) {
    allNumsFromGeniration[i] = firstNumsArray(funcRange);
  }

  bestNumsFromGeniration = getTheBestByNumArray(allNumsFromGeniration, maxOrMin, customFunc, 8);
  bestNumFromGeneration = getTheBestByNum(allNumsFromGeniration, maxOrMin, customFunc);
  addValue(generationNumber, bestNumFromGeneration, cacheNumber, historyOfGenirations)
  console.log(`№${generationNumber} Генерация:${bestNumsFromGeniration} Лучшее ${bestNumFromGeneration}`);

  if (breakType === "generations") {
    for (generationNumber = 1; generationNumber < genCount; generationNumber++) {
      allNumsFromGeniration = newGeniration(bestNumsFromGeniration);

      bestNumsFromGeniration = getTheBestByNumArray(allNumsFromGeniration, maxOrMin, customFunc, 8);

      bestNumFromGeneration = getTheBestByNum(allNumsFromGeniration, maxOrMin, customFunc);

      addValue(generationNumber, bestNumFromGeneration, cacheNumber, historyOfGenirations)
      //console.log(historyOfGenirations);

      console.log(`№${generationNumber} Генерация:${bestNumsFromGeniration} Лучшее ${bestNumFromGeneration}`);

      if (historyOfGenirations.length >= cacheNumber && historyOfGenirations.every(val => val.answer === historyOfGenirations[0].answer)) {
        console.log(historyOfGenirations);
        break;
      }
    }
    console.log(historyOfGenirations)
    return {
      "bestIndividual": {
        "value": bestNumFromGeneration,
        "fitness": evaluate(customFunc, { x: bestNumFromGeneration })
      },
      "history": historyOfGenirations
    }
  }
  else if (breakType === "time") {
    workForDuration(async () => {
      //for (generationNumber=1; generationNumber < genCount;generationNumber++){
      allNumsFromGeniration = newGeniration(bestNumsFromGeniration);

      bestNumsFromGeniration = getTheBestByNumArray(allNumsFromGeniration, maxOrMin, customFunc, 8);

      bestNumFromGeneration = getTheBestByNum(allNumsFromGeniration, maxOrMin, customFunc);

      addValue(generationNumber, bestNumFromGeneration, cacheNumber, historyOfGenirations)
      //console.log(historyOfGenirations);

      console.log(`№${generationNumber} Генерация:${bestNumsFromGeniration} Лучшее ${bestNumFromGeneration}`);

      if (historyOfGenirations.length >= cacheNumber && historyOfGenirations.every(val => val.answer === historyOfGenirations[0].answer)) {
        //console.log(historyOfGenirations);
        return {
          "bestIndividual": {
            "value": bestNumFromGeneration,
            "fitness": evaluate(customFunc, { x: bestNumFromGeneration })
          },
          "history": historyOfGenirations
        }
      }

      //}
      //console.log(historyOfGenirations)
     generationNumber++;
    }, workTime)

     return {
        "bestIndividual": {
          "value": bestNumFromGeneration,
          "fitness": evaluate(customFunc, { x: bestNumFromGeneration })
        },
        "history": historyOfGenirations
      }
    //TO DO ASENHRONIC ALGORITHM//
  }
  else {
    console.error("Ошибка ввода параметра stopType")
  }
}

//console.log(binarChengebility(binarCrossover(convertToBinarParents([3, 50]))));



