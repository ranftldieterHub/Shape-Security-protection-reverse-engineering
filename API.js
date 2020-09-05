const { Worker } = require('worker_threads');
const Chance = require('chance');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();

app.disable('x-powered-by');
app.use(bodyParser.json({limit: '10mb', extended: true}));

app.post('/resolveStarbucks', async (req, res)=>{
  var info = req.body;
  if (typeof info == 'object') {
    const chance = new Chance(info.login + info.password);
    info.device = chance.pickone([
      'Intel(R) HD Graphics 6000',
      'Intel(R) Iris(TM) Graphics 6100',
      'Intel(R) Iris(TM) Plus Graphics 640',
      'Intel Iris Pro OpenGL Engine',
      'Intel HD Graphics 4000 OpenGL Engine',
      'Google SwiftShader',
      'ANGLE (Intel(R) HD Graphics 620 Direct3D11 vs_5_0 ps_5_0)',
      'Intel HD Graphics 5000 OpenGL Engine',
      'ANGLE (Intel(R) HD Graphics 520 Direct3D11 vs_5_0 ps_5_0)',
      'Intel Iris OpenGL Engine',
      'ANGLE (Intel(R) HD Graphics Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (Intel(R) HD Graphics 4600 Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (Intel(R) HD Graphics 530 Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (Intel(R) HD Graphics 630 Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0)',
      'Intel(R) Iris(TM) Graphics 650',
      'ANGLE (Intel(R) HD Graphics 5500 Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (Intel(R) HD Graphics Family Direct3D11 vs_5_0 ps_5_0)',
      'Mesa DRI Intel(R) HD Graphics 400 (Braswell)',
      'ANGLE (Intel(R) HD Graphics 4000 Direct3D11 vs_5_0 ps_5_0)',
      'Intel(R) Iris(TM) Graphics 550',
      'AMD Radeon Pro 560 OpenGL Engine',
      'ANGLE (NVIDIA GeForce GTX 1060 6GB Direct3D11 vs_5_0 ps_5_0)',
      'Intel(R) Iris(TM) Plus Graphics 655',
      'NVIDIA GeForce GT 750M OpenGL Engine',
      'AMD Radeon Pro 555 OpenGL Engine',
      'NVIDIA GeForce GT 650M OpenGL Engine',
      'Mesa DRI Intel(R) Bay Trail',
      'ANGLE (NVIDIA GeForce GTX 1050 Ti Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (NVIDIA GeForce GTX 1070 Direct3D11 vs_5_0 ps_5_0)',
      'AMD Radeon R9 M370X OpenGL Engine',
      'Intel(R) Iris(TM) Graphics 540',
      'ANGLE (Intel(R) HD Graphics Direct3D9Ex vs_3_0 ps_3_0)',
      'ANGLE (NVIDIA GeForce GTX 970 Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (Intel(R) HD Graphics Direct3D11 vs_4_1 ps_4_1)',
      'ANGLE (NVIDIA GeForce GTX 1060 3GB Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (NVIDIA GeForce GTX 960 Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (Intel(R) UHD Graphics 630 Direct3D11 vs_5_0 ps_5_0)',
      'ANGLE (NVIDIA GeForce GTX 750 Ti Direct3D11 vs_5_0 ps_5_0)',
      'Intel HD Graphics 3000 OpenGL Engine',
      'ANGLE (Intel(R) HD Graphics 3000 Direct3D11 vs_4_1 ps_4_1)',
      'ANGLE (Intel(R) HD Graphics 4400 Direct3D11 vs_5_0 ps_5_0)'
    ]);
    info.plugins = chance.pickset([981297737,916307581,898033484,869960091,687022554,625671294,58093980,575402456,496174873,387189185,2016954155,1572083700,151579294,135847005,1167269810,1134561353,1078363890,1030100700,-863110926,-6140116,-534463146,-482629523,-1909134559,-1833164366,-1792453962,-1237605859,-1211528927], chance.integer({ min: 1, max: 6 }));
    info.timezone = chance.pickone(["Sun Aug 05 1945 19:16:00 GMT-0400 (Eastern Daylight Time)", "Sun Aug 05 1945 13:46:00 GMT-0930 (Hawaii-Aleutian Standard Time)", "Sun Aug 05 1945 14:16:00 GMT-0900 (Alaska Daylight Time)", "Sun Aug 05 1945 16:16:00 GMT-0700 (Pacific Daylight Time)", "Sun Aug 05 1945 18:16:00 GMT-0500 (Central Daylight Time)", "Sun Aug 05 1945 20:16:00 GMT-0300 (Atlantic Daylight Time)", "Mon Aug 06 1945 02:16:00 GMT+0300 (Central European Summer Time)", "Mon Aug 06 1945 03:16:00 GMT+0400 (Gulf Standard Time)", "Mon Aug 06 1945 05:46:00 GMT+0630 (India Standard Time)", "Mon Aug 06 1945 06:16:00 GMT+0700 (Indochina Time)", "Mon Aug 06 1945 08:16:00 GMT+0900 (Singapore Standard Time)", "Mon Aug 06 1945 08:16:00 GMT+0900 (Japan Standard Time)"]);
    var time = Date.now();
    info.screen = chance.pickone([
      {
        width: 1920,
        height: 1080
      },
      {
        width: 1366,
        height: 768
      },
      {
        width: 1536,
        height: 864
      },
      {
        width: 1440,
        height: 900
      },
      {
        width: 2560,
        height: 1440
      },
      {
        width: 1680,
        height: 1050
      },
      {
        width: 1280,
        height: 720
      },
      {
        width: 1280,
        height: 800
      },
      {
        width: 1600,
        height: 900
      }
    ]);
    var [result, timeToDelay] = await runWorker([info, decodeURIComponent(info.toEval)]);
    console.log(Date.now() - time, result.status);
    res.json({result, timeToDelay});
  }
});

app.listen(44694);

function runWorker(workerData) {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./worker.js', { workerData });
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    })
  })
}
