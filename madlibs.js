// /**
//  * Complete the implementation of parseStory.
//  * 
//  * parseStory retrieves the story as a single string from story.txt
//  * (I have written this part for you).
//  * 
//  * In your code, you are required (please read this carefully):
//  * - to return a list of objects
//  * - each object should definitely have a field, `word`
//  * - each object should maybe have a field, `pos` (part of speech)
//  * 
//  * So for example, the return value of this for the example story.txt
//  * will be an object that looks like so (note the comma! periods should
//  * be handled in the same way).
//  * 
//  * Input: "Louis[n] went[v] to the store[n], and it was fun[a]."
//  * Output: [
//  *  { word: "Louis", pos: "noun" },
//  *  { word: "went", pos: "verb", },
//  *  { word: "to", },
//  *  { word: "the", },
//  *  { word: "store", pos: "noun" }
//  *  { word: "," }
//  *  ....
//  * 
//  * There are multiple ways to do this, but you may want to use regular expressions.
//  * Please go through this lesson: https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/regular-expressions/
//  */

 let arrOfObj = [];
 const idArray = [];

 function parseStory(rawStory) {
  // Your code here.
  
  const wordMap= {
    n: "noun",
    a: "adjective",
    v: "verb",
  }

  let arrOfWords = rawStory.split(/\s|\]/); // split to individual words and punctuation marks.

  const regexForCapture = /^\w+(?!...[n|a|v]])/;  
 
  const regexAllSpecialWords = /^\w+(?:...[n|a|v])/;

  for(let i = 0; i < arrOfWords.length; i++) {

    if (regexAllSpecialWords.test(arrOfWords[i])){
      
      let pos = arrOfWords[i][(arrOfWords[i].length - 1)];

      let word = (arrOfWords[i].match(regexForCapture)[0]); 

       arrOfObj.push({word : word, pos: wordMap[pos]});

    }
    else if (arrOfWords[i] === '') {
      continue;
    }
    else {
      let word = arrOfWords[i];
      arrOfObj.push({word : word})
    }
  }
 return arrOfObj; // This line is currently wrong :) NO ITS NOT !
}


function displayStory1 (story) {
  let madLibsEdit = document.querySelector(".madLibsEdit");
  console.log(story);
  for(let i=0; i< story.length;i++)
{
   if (story[i].pos){

    // `${"wordInput"i}`
    //element.setAttribute("style", "background-color: red;");
    //searchField.setAttribute("oninput", "search();");
    // const input = document.createElement("input");
    // input.type = "text";
    // input.id = ("wordInput" + i);
    // input.setAttribute = ("oninput", "changeInput()");
    // input.createAttribute = ("onkeydown", "focusNext(event)");
    // input.size = ("8");
    // input.maxLength = "20";
    // input.placeholder = story[i].pos;
    // madLibsEdit.appendChild(input);

    madLibsEdit.innerHTML= madLibsEdit.innerHTML+ " " +
    "<input type=\"text\" id=\"wordInput"+ i 
    +"\" oninput=\"changeInput("+ i +")\" onkeydown = \" focusNext(event)\" size = \"8\" name=\"word\" maxlength=\"20\" placeholder=\""+
    story[i].pos +"\">"+" "
    idArray.push("wordInput"+i);
    
   }
   else{
     madLibsEdit.innerHTML= madLibsEdit.innerHTML +" "+ story[i].word
   }
}


}
function focusNext(e) {
  try {
    for (let i = 0; i < idArray.length; i++) {
      if (e.keyCode === 13 && e.target.id === idArray[i]) {
       document.querySelector(`#${idArray[i+1]}`).focus()
      }
    }
  } catch (error) {
    console.error(error);
  }
}


function displayStory2(story){
  let madLibsPreview = document.querySelector(".madLibsPreview");
  for(let i=0; i< story.length;i++)
{
   if (story[i].pos){
    madLibsPreview.innerHTML= madLibsPreview.innerHTML+ " " +
    "<input style=\" border:none; outline: none;\" type=\"text\" size = \"8\"  id=\"wordOutput"+ i 
    +"\"  name=\"word\" disabled placeholder=("+
    story[i].pos +")>"+" "
   }
   else{
    madLibsPreview.innerHTML= madLibsPreview.innerHTML +" "+ story[i].word
   }
}


}
function changeInput(numberOfClass){
  let wordInput = document.querySelector("#wordInput"+numberOfClass);
  let wordOutput = document.querySelector("#wordOutput"+numberOfClass);
  wordOutput.value = wordInput.value;
  changeStyle(wordInput);
}

 function changeStyle(wordInput){
    if (wordInput.value){
      wordInput.style.backgroundColor= "rgba(128, 128, 128, 0.797)";
      wordInput.style.color = "white";
    }
    else {
      wordInput.style.backgroundColor = "none";
    }
}



getRawStory().then(parseStory).then((processedStory) => {
  
  displayStory1(processedStory);
  displayStory2(processedStory);
  });


