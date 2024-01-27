const { parentPort } = require("worker_threads");


parentPort.on("message", (jobs) =>{


    for(let job of jobs){
        let cnt = 0;
        for(let i = 0;i < job; i++){
            cnt++;
        }
    }
    parentPort.postMessage('done')
})