import {geneticAlgorithm} from './services/geneticAlgorithm.js'




console.log(geneticAlgorithm([-50, 50], "time", "-x^2+50*x", "max", 200, NaN, 4000));

console.log(geneticAlgorithm([-50, 50], "generations", "-x^2+50*x", "max", 200, 400, NaN));