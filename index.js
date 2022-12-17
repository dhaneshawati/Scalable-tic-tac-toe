let player1;
let player2;
let container = document.querySelector('#boxes');
let size;
let totalElements;
let flag = true;
// for(let i=0;i<totalElements;i++)
// {
//   let grid = document.createElement("div");
//   grid.className = 'column';
//   grid.setAttribute("id",`${i}`);
//   container.appendChild(grid);
// }

    // grid-template-columns: repeat(3,8vw);
// container.style.grid-template-rows = "repeat(3,8vw)";
// container.style.grid-template-rows = 'repeat(3,8vw)';
function createPlayer(){
    player1 = document.getElementById("p1").value === "" ? "Player1" : document.getElementById("p1").value;
    player2 = document.getElementById("p2").value === "" ? "Player2" : document.getElementById("p2").value;
    size = Number(document.getElementById("size").value);
    totalElements = size * size;
    // console.log(player1,player2);

if(flag)
   { for(let i=0;i<size;i++)
    {
        let trow = document.createElement("tr");
        trow.className = 'row';
        for(let j=0;j<size;j++)
      {
        let grid = document.createElement("td");
        grid.className = 'column';
        grid.setAttribute("id",`${i}${j}`);
        trow.appendChild(grid);
      }
        container.appendChild(trow);
    }
  } 

    let turn = player1;
    let symbol1 = "X";
    let symbol2 = "O";
    let sign = symbol1;
    let val1 = 1;
    let val2 = -1;
    let val = val1;
    let id;
    let rowNo;
    let colNo;
    let count = 0;
    let message = "";
    let gameEnd = false;

    // 2D Array Creation
    // let bord=[];
    // bord.length = 3;
    // let bordCol =[];
    // bordCol.length = 3;
    // bordCol.fill("");
    // bord.fill(bordCol);
    // console.log(bord);
    let bord = new Array(size);
    for(let i=0;i<size;i++)
    {
      bord[i] = new Array(size);
    }

    for(let i=0;i<size;i++)
    {
      for(let j=0;j<size;j++)
      {
        bord[i][j] = 0;
      }
    }
    // console.log(bord);

    const changeTurn = () => {
    return (turn === player1 ? player2 : player1);
    };

    const changeSign = () => {
    return (sign === symbol1 ? symbol2 : symbol1);
    };
    
    const changeVal = () => {
        return (val === val1 ? val2 : val1);
    };

    const checkWin = () => {
      // console.log("Inside checkWin");
      let rowsum = 0;
      let colsum = 0;
      let d1 = 0;
      let d2 = 0;

        for(let i=0;i<size;i++)
        {
          rowsum += bord[rowNo][i];
        }
        for(let j=0;j<size;j++)
        {
          colsum += bord[j][colNo];
        }

        for(let i=0;i<size;i++)
        {
          for(let j=0;j<size;j++)
          {
            if(i===j)
            {
              d1 += bord[i][j];
            }
            if((i+j) === size-1)
            {
              d2 += bord[i][j];
            }
          }
        }
        // console.log(rowsum,colsum,d1,d2,size);
        if(rowsum === size || colsum === size || d1 === size || d2 === size)
        {
          message = `${turn} Wins the Game 🎉🎊🎊`;
          gameEnd = true;
        }
        else if(rowsum === -size || colsum === -size || d1 === -size || d2 === -size)
        {
          message = `${turn} Wins the Game 🎉🎊🎊`;
          gameEnd = true;
        }
        else if (count === totalElements){
            message = `The Game is DRAW`;
            gameEnd = true;
        }
        document.getElementById('game-result').innerText = message;
         rowsum = 0;
         colsum = 0;
         d1 = 0;
         d2 = 0;
    };
    
    document.getElementById('playerTurn').innerText = `${turn}'s Turn`;

    
    // LOGIC
    
    // let table = document.getElementById('boxes');
    
    let selectedDiv;

    container.onclick = function(event) {
      let target = event.target;
    
      while (target != this) {
        if (target.tagName == 'TD' && (!gameEnd)) {
          fillContent(target);
          return;
        }
        target = target.parentNode;
      }
    }
    
    function fillContent(node) {
      // console.log(node);
      selectedDiv = node;
      if(selectedDiv.innerText === '')
      { 
        selectedDiv.innerText = sign;
        id = Number(selectedDiv.id);
        // console.log(id);
        rowNo = Math.floor(id/10);
        colNo = (id%10);
        // console.log(rowNo,colNo);
        bord[rowNo][colNo] = val;
       
        // console.log(bord);
        count++;
   
        checkWin();
        sign = changeSign();
        turn = changeTurn();
        val = changeVal();

        
        document.getElementById('playerTurn').innerText = `${turn}'s Turn`;
        // console.log(bord);
      }
    }
  
      document.getElementById('reset').addEventListener("click",setDefault);
      function setDefault(){
        var arr;
        flag = false;
        arr = document.querySelectorAll(".column");

        for(let i = 0;i<totalElements;i++)
        {
          arr[i].innerText = "";
        }
        document.getElementById('game-result').innerText = "";
        document.getElementById('playerTurn').innerText = "";
        createPlayer();
        // console.log(bord);
      }
}
