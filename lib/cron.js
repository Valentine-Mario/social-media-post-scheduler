const cron = require('node-cron');

class Cron{
    run(){
        //run every hour
        cron.schedule('0 * * * *', () => {
            console.log('running a task every minute');
          });
    }
}
module.exports = new Cron();
