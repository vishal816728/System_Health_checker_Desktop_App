const os=require('os')
const osu=require('os-utils')
const path = require('path')

document.getElementById('comp-name').innerText=os.hostname()

document.getElementById('os').innerText=`${os.type()} ${os.arch()}`

document.getElementById('cpu-model').innerText=os.cpus()[0].model

// document.getElementById('sys-uptime').innerText=os.cpus()[0].times.sys
document.getElementById('sys-uptime').innerText=os.uptime()

document.getElementById('mem-total').innerText=os.totalmem()


// check usage of cpu after every 2 seconds
var progress=document.getElementById('progress-bar')
const cpuOverLoadValue=document.getElementById('cpu-overload')
const savebtn=document.querySelector('.btn')
var userSettedValueforOverload=90;
cpuOverLoadValue.addEventListener('change',(e)=>{
    savebtn.addEventListener('click',(ev)=>{
         ev.preventDefault()
        userSettedValueforOverload=e.target.value  
        if(e.target.value){
  
            console.log(userSettedValueforOverload)  
        }
    })
})
setInterval(()=>{
     osu.cpuUsage((indo)=>{
         document.getElementById('cpu-usage').innerText=(indo*100).toFixed(2)+'%'
         //setting the value of progress value as the value changes
         progress.setAttribute("value",indo*100)
         
         if((indo*100)>userSettedValueforOverload  /*&& runNotify(frquency)*/){
             notifyUser({
                 title:'Cpu Overloading',
                 body:`cpu usages are above ${(indo*100).toFixed(2)}`,
                 icon:path.join(__dirname,'img','bg.png')
             })
            //  localstorage.setItem('lastNotify',+new Date())

            //  if you want to add notification according to the timestamp 
            // you can use the localstorage that will work same as web because electron uses chromium 
         }
     })


},2000)

setInterval(()=>{
    osu.cpuFree(free=>{
        document.getElementById('cpu-free').innerText=(free*100).toFixed(2)+'%'
    })
},2000)

const getAttribute=progress.getAttribute('value').valueOf()

function notifyUser(options){
    new Notification(options.title,options)
}


// for localstorage

// function runNotify(frequency){
//     if(localstorage.getItem('lastNotify')===null){
//         localStorage.setItem('lastNotify',+new Date())
// return true
//     }
    //  const notifyTime=new Date(parseInt(localStorage.getItem('lastNotify')))
    // const minutepassed=Math.ceil(Math.abs(new Date()-notifyTIme)/1000*60)
    // if(minutepassed>frequncy){
    //     return true
    // }else{
    //     return false
    // }
// }

// + means nothing but to convert the value into number