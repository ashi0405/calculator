let runningTotal=0;   //to perform operations  //like 2+5=7(runningTotal)
let buffer="0";         //to keep a track of input //we are treating it as a string to concatenate te digits and not add tem
let previousOperator=null;  //like +-*/
const screen=document.querySelector(".screen");    //screen means black vala block jaa ans dikega


//calc-buttons is all te buttons excluding blck box vala 0
document.querySelector(".calc-buttons").addEventListener("click",function(event){
    buttonClick(event.target.innerText);
})

//value is basically jo hum input denge and buffer imag variable ai jo dyaan rkega inputs ka

function buttonClick(value){   
   if(isNaN(parseInt(value))){                            //to check if te input is not a number(NaN) 
        handleSymbol(value);                              //parseInt converts a string to an integer
   }
   
   else{
       handleNumber(value);
   }
   rerender();                     //to put the nos on the screen basically in black box

}


function handleNumber(value){
    if(buffer==="0"){
        buffer=value;           //matlab agar 0 input diya jaaye to 0 i re
    }
    else{
        buffer+=value;
    }
                         
}


function handleSymbol(value){
    switch(value){
        
        case 'C':
            buffer="0";
            runningTotal=0;
            previousOperator=null;
            break;

        case '=':
            if(previousOperator===null){          //condition to cHeck kaHi = aise Hi nHi press karra
                return;
            }

            doOperation(parseInt(buffer));   //function to perform operation after = as been pressed
                                            //used parseInt so as to convert tHe concatenated no as string into a no
            previousOperator=null;  
            buffer="" + runningTotal;
            runningTotal=0;
            break;
        
        case '←':
            if(buffer.length===1){
                buffer="0";
            }

            else{
                buffer=buffer.substring(0,buffer.length-1);
            }
            break;
            

        default:
            handleMath(value);
            break;

    }

}

function handleMath(value){
    const intBuffer=parseInt(buffer);
    if(runningTotal===0){
        runningTotal=intBuffer;
    } 
    
    else{
        doOperation(intBuffer);
    }

    previousOperator=value;
    buffer='0';
}

function doOperation(intBuffer){
    if(previousOperator==='+'){
        runningTotal+=intBuffer;
    }
    else if(previousOperator==='-'){
        runningTotal-=intBuffer;
    }
    else if(previousOperator==='x'){
        runningTotal*=intBuffer;
    }
    else{
        runningTotal/=intBuffer;
    }
}

function rerender(){
    screen.innerText=buffer;    //screen is black box which will display ans
}