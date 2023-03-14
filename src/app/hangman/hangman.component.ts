import { Component } from '@angular/core';

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent {

   hangmanWords: string[] = [
    "elephant",
    "airplane",
    "computer",
    "telephone",
    "restaurant",
    "basketball",
    "umbrella",
    "library",
    "guitar",
    "pizza",
    "sunglasses",
    "butterfly",
    "kangaroo",
    "octopus",
    "rainbow",
    "snowflake",
    "strawberry",
    "volleyball",
    "watermelon",
    "zebra"
  ];
  letter:String | any
  word:String | any
  wordHidden:String[] |any
  wordShown:String |any
  btn:HTMLButtonElement | any
  divLetters:HTMLDivElement | any
  buttons:HTMLButtonElement[] | any
  wrong:number=0

  ngOnInit()
  {
    this.makeHidden()
    this.makeButtons()
  }
  ngAfterViewInit()
  {
    this.putClickEvent()

  }
  public klik(button:HTMLButtonElement):void {
    button.disabled=true
    this.letter=button.innerText
    this.checkLetter()

  }

  public makeButtons() {
    this.divLetters=document.getElementById('divLetters')
    for(let i='a'.charCodeAt(0);i<='z'.charCodeAt(0);i++)
    {
     this.letter=String.fromCharCode(i)
     this.btn=document.createElement('button')
     this.btn.innerText=this.letter
     this.btn.classList.add("btn")
     this.btn.classList.add("btn-success")
     this.btn.classList.add("m-1")
     this.btn.classList.add("kopce")
    this.divLetters?.appendChild(this.btn)
    }
  }
  public makeHidden() {
    this.word=this.hangmanWords[Math.floor(Math.random() * this.hangmanWords.length)];
    this.wordHidden=new Array(this.word.length)
    for(let i=0;i<this.word.length;i++)
    {
      if(i==this.word.length-1)
      {
        this.wordHidden[i]="_"
      }
      else{
      this.wordHidden[i]="_ "
    }
    }
   this.wordShown=this.wordHidden.join("")
    
    
  }
  
  
public putClickEvent() {
  this.buttons=document.getElementsByClassName("kopce")
  for(let i=0;i<this.buttons.length;i++)
  {
    this.buttons[i].addEventListener('click', () =>
    {
      this.klik(this.buttons[i])

    });

    
  }
}
public checkLetter() {
  let flag=0;
  for(let i=0;i<this.word.length;i++)
  {
    if(this.word[i]==this.letter)
    {
      flag=1
      for(let j=0;j<this.wordHidden.length;j++)
      {

        if(j==i)
        {
        this.wordHidden[i]=this.letter
          console.log("here");
        }
      }
      }
    }
    if(flag==0)
    {
      this.wrong++
      this.drawMan()
      if(this.wrong==6)
      {
        this.endDisplay("You Lost")
        
      }
    }
    this.wordShown=this.wordHidden.join("")
    if(this.wordShown==this.word)
    {
      this.endDisplay("You Won")
    }
}
public endDisplay(str:string) {
  this.divLetters.hidden=true
  alert(str)
  var divF=document.getElementById("firstDiv")
  var h3=document.createElement("h1")
  h3.innerText=str
  divF?.appendChild(h3)
}
public reload()
{
  window.location.reload()
}
public drawMan() {
  switch(this.wrong) {
    case 1:
    document.getElementById("head")?.setAttribute("display","inline")
      break;
    case 2:
      document.getElementById("body")?.setAttribute("display","inline")
      break;
    case 3:
      document.getElementById("leftArm")?.setAttribute("display","inline")
      break;
    case 4:
      document.getElementById("rightArm")?.setAttribute("display","inline")
      break;
    case 5:
      document.getElementById("leftLeg")?.setAttribute("display","inline")
      break;
    case 6:
      document.getElementById("rightLeg")?.setAttribute("display","inline")
      break;
}
}
}

