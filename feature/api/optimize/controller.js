import { v4 as uuidv4 } from 'uuid';
import { validateApiRoutesParams } from "./validation.js";
import { createCacheKey, getTaskByJobId, setDoneJobToCache, setPendingJobToCache, findCashedJobByFunctionName } from "../../services/cacheService.js";
import { geneticAlgorithm } from "./../../services/geneticAlgorithm.js"

function runAlgorithm(params){
    console.log("TEST ALGORITHM", params);
   
    const {
        range, 
        stopType,
        customFunction,
        taskType,
        cacheNumber,
        generationsCount,
        timeOfWork
    } = params;

    const result = geneticAlgorithm(
        range, 
        stopType,
        customFunction,
        taskType,
        cacheNumber,
        generationsCount,
        timeOfWork
    );

    if (stopType === "generations") {
        return Promise.resolve(result);
    } else if (stopType === "time"){
        if(result instanceof Promise){
            return result;
        }
    } else {
        return Promise.reject("Invalid stopType");
    }
}
export async function handlePostRequest(req, res){
    console.log("POST /optimize received");
    console.log("Request body:", req.body);
    const params = req.body;

    const validationResult = validateApiRoutesParams(params);
    if (validationResult !== true){
        return res.status(400).json({ error: validationResult });
    }

    const cachedJob = findCashedJobByFunctionName(params.customFunction);

    if(cachedJob){
        if(cachedJob.status === "done"){
            return res.status(200).json({
                jobId: cachedJob.jobId,
                status: "done",
                result: cachedJob.result,
            });
        }
        if (cachedJob.status === "pending"){
            return res.status(202).json({
                jobId: cachedJob.jobId,
                status: "pending",
                message: "Job is still processing",
            });
        }
    }
    const jobId = uuidv4();
    setPendingJobToCache(params, jobId);

    runAlgorithm(params).then((result) => {
        setDoneJobToCache(params, jobId, result);
    });

    res.status(202).json({
        jobId,
        status: "pending",
        message: "Job started",
    });
    res.json({ message: "Запрос принят" });
}

export function handleGetResult(req, res) {
    const { jobId } = req.params;
    const task = getTaskByJobId(jobId);

    if(!task){
        return res.status(404).json({ error: "Job not found" });
    }

    if(task.status === "pending") {
        return res.status(200).json({ status: "pending" });
    }
    if(task.status === "done"){
        const { result } = task;
        return res.status(200).json({
            status: "done",
            bestIndividual: result.bestIndividual,
            history: result.history,
            fullResult: result,
        });
    }
  return res.status(500).json({ error: "Unexpected job status" });
}
