const cluster = require('cluster');
const os = require('os');


/* mock db call */
const numberOfUsersInDB = function(){
    this.count = this.count || 5;
    this.count = this.count * this.count;
    return this.count;
}

/* run for first time as master; */
if(cluster.isMaster){
    const cpus = os.cpus().length;

    console.log(`Forking for ${cpus} CPUs`);
    for(let i = 0; i<cpus; i++){
        cluster.fork();
    }
    
    /* broadcast a message to all workers */
    // console.dir(cluster.workers, {depth: 0});
    // Object.values(cluster.workers).forEach(worker => {
    //     worker.send(`Hello Worker ${worker.id}`)
    // });

    const updateWorkers = () => {
        const usersCount = numberOfUsersInDB();
        Object.values(cluster.workers).forEach(worker => {
            worker.send({usersCount})
        })
    }
    updateWorkers();
    setInterval(updateWorkers, 10000);
}


/* this time in worker mode (`isWorker`) or `!isMaster`*/
else {
require('./cluster-server');
}