
//event we are listening for DOMContentLoaded. And whenever it is ready you can invoke a function called init
//when the DOM content has fully loaded, ensuring that all necessary HTML is ready before JavaScript tries to manipulate it

 window.addEventListener('DOMContentLoaded',init);   
 const opts = ['*', '/', '+', '-', '9', '8',' 7','6','5','4','3','2','1','0','.'];   //all keys for calculator(options for calculator)
 const spec = ['*', '/', '+', '-'];  //special function keys


 function init(){   //init function setup calculator interface
     document.title = "JavaScript Project";  //title of the page will be "JavaScript Project"
     console.log('ready');  //Whenever the page is loaded you will see ready within the console. That means you are ready to interact with the elements 
     let decimal = false;
     let evaluation = false;
     const container = document.createElement('div');  //Creating a div which is the main container object. This allows to use the Document Object to create elements dynamically
     container.classList.add('container');
     container.style.maxWidth = '600px';
     container.style.margin = 'auto';
     document.body.appendChild(container);   //adding the container element as a child at the end of the body element of the document
     const output = document.createElement('input');    //output screen
     output.setAttribute('type','text'); 
     output.classList.add('output');
     output.style.width = '100%';
     output.style.lineHeight = '50px';
     output.style.fontSize = '3rem';
     output.style.textAlign = 'right';
      container.appendChild(output);
     const main = document.createElement('div');  //setup another container object
     main.classList.add('main');
     main.style.width = '100%';
     container.appendChild(main);
     opts.forEach(function(val){   //val represents each item in opts array
         //console.log(val);
         btnMaker(val,addOutput);
     })
    btnMaker('=',evaluationOutput);  //Creating = button to evaluate the output
    btnMaker('C',clearOutput);    //Clear Output


     function cOutput(v){    //helps with any error
         output.style.border = v +'1px solid';
         output.style.color = v;
     }


     function evaluationOutput(){
        cOutput('black');
          if(output.value === ""){   //when user click on the = button,before they enter anything, border will turn to red to emphasize enter a value
              cOutput('red');   
         } else if(evaluation){   //if one of the operator(not number) is pressed at the end. It makes sure output will end up with a number.  4+4+ ->error, ends with '+'
              cOutput('red');
              output.value ="Incomplete expression"; 
         }else {
            try {
                var result = eval(output.value);  //eval function in JS that evaluates JS code represented as a string and executes it. 
                output.value = Number(result).toFixed(4);  //Update the output with the result and round decimal parts to 4 digit
                decimal = result.toString().includes('.'); // Update the decimal flag based on the result
            } catch (e) {
                // If there's an error during evaluation, display an error message
                output.value = "Error"; // Show a generic error message
                console.error("Calculation error: ", e); // Log detailed error information
            }
            evaluation = false;    //Reset the evaluation after computation
        }    
     }


     function clearOutput(){      
         cOutput('black');
         output.value = "";       //clear the content
         decimal = false; // Reset decimal when clearing output
     }


     function btnMaker(txt, myFunction){
         let btn = document.createElement('button');
         btn.setAttribute('type', 'button');
         btn.style.width = '23%';
         btn.style.lineHeight = '50px';
         btn.style.margin = '1%';
         btn.style.fontSize = '2em';
         btn.value = txt;
         btn.textContent = txt;
         btn.addEventListener('click', myFunction);
         main.appendChild(btn);
     }


     function addOutput(e){  //handle the button when it gets clicked 
         console.log(decimal);
         cOutput('black');  //If user clicks = before entering any value, border will turn to red. Then after they start entering input, border will turn to black again
         let char = e.target.value;
         if(char == '.'){    //user will not enter more than 1 decimal like 4.4.4
             if(decimal){
                 char ='';
                 cOutput('red');
             }else{
                 decimal =true;
             }
         }
         evaluation = spec.includes(char);  //if second number has decimal -> 4.11+2.99. spec is an array, includes() method determines whether an array includes a certain value among its entries. Here '.' is checked
         if(evaluation){
             decimal = false;
         }
         output.value += char;
     }

 }