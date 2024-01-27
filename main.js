const {Worker} = require("worker_threads");

const jobs = Array.from({length:100},()=> 1e9)

function Chunkify(arr, n) {
    let chunks = [];
    for(let i = n;i> 0;i--){
        chunks.push(arr.splice(0,Math.ceil(arr.length / i)))
    }
    return chunks;
    
}

function run(jobs, cW) {

    const chunks = Chunkify(jobs,cW);

    const tick = performance.now();
    let completedWorkers = 0;

    chunks.forEach((data, i)=>{
        const worker = new Worker('./worker.js');
        worker.postMessage(data);
        worker.on("message", ()=>{
            console.log(`Worker ${i} completed`)
            completedWorkers++;
            if (completedWorkers=== cW) {
                console.log(`${cW} worker took ${performance.now()}`);
                process.exit();
                
            }
        })

    })


    
}

run(jobs,9);