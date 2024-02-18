import { differenceInSeconds } from "date-fns";
import { tr } from "date-fns/locale";
import inquirer from "inquirer";


let time = await inquirer.prompt({
    type: "number",
    name: "timeCount",
    message: "Enter number of seconds: ",
    validate: (input)=>{
        if(isNaN(input)){
            return "Please enter a valid number";
        }else if(input>60){
            return "Please enter a number lesser than or equal to 60";
        }else{
            return true;
        }
    }
});

function startTimer(val: number){
    const startTime = new Date().setSeconds(new Date().getSeconds()+ val);
    const intervalTime = new Date(startTime);
    setInterval(()=>{
        const currentTime = new Date();
        const timeDiff = differenceInSeconds(intervalTime, currentTime);
        if(timeDiff <=0){
            console.log("Timer has expired");
            process.exit();
        }
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24)
    //   minutes = Math.floor((difference / 1000 / 60) % 60),
    //   seconds = Math.floor((difference / 1000) % 60),
        const min = Math.floor((timeDiff%(3600 * 24)) / 3600);
        const sec = Math.floor(timeDiff % 60);
        console.log(`${min.toString().padStart(2,"0")}:${sec.toString().padStart(2, "0")}`)
    }, 1000);
}

// Set the date we're counting down to
//var countDownDate = new Date("feb 18, 2024 13:43:00").getTime();



startTimer(time.timeCount)



  