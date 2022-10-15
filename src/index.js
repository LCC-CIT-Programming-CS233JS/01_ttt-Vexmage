// Create a class called TTT
class TTT
{
    /*
        Add a constructor that 
        -   defines and initializes all variables
        -   binds the keyword this to the class for each function because
            this will otherwise will refer to the clicked square
            -   this.calculateWinner = this.calculateWinner.bind(this);
            -   DON'T bind this for handleClick at this point
        -   calls the init method
    */
    constructor() {
        this.xIsNext = true;
        this.winner = null;
        this.squares = Array(9).fill(null);
        this.winningLine = Array();
        this.lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
            ];

        this.init();
    }
    /*
        Convert each function to a method
        -   move it inside the class
        -   remove the keyword function
        -   add this to all of the variables that belong to the class
        -   change var to let or const for local variables
        -   add this to all method calls */

    init() {
        let squares = document.getElementsByName("square");
        for (let i = 0; i < squares.length; i++) {
            squares[i].onclick = this.handleClick.bind(this, i);
        }
    }

    handleClick(index) {
        // 🎃 👻 swapped out the X's and O's with Pumpkins and Ghosts
        if (this.xIsNext) {
            this.squares[index] = "🎃";
        } else {
            this.squares[index] = "👻";
        }

        let squareElement = document.getElementById(index);
        squareElement.innerHTML = this.squares[index];

        squareElement.onclick = () => {}

        this.xIsNext = !this.xIsNext;

        let statusElement = document.getElementById("status");

        if (this.calculateWinner()) {
            this.highlightWinner();
            this.disableAll();
        } else {
            if (this.xIsNext) {
                statusElement.innerHTML = "🎃 next player";
            } else {
                statusElement.innerHTML = "👻 next player";
            }
        }
    }

    calculateWinner() {
        for (let i = 0; i < this.lines.length; i++) {
            let [a, b, c] = this.lines[i];
            if (this.squares[a] && 
            this.squares[a] === this.squares[b] && 
            this.squares[a] === this.squares[c]) {
                this.winner = this.squares[a];
                this.winningLine = this.lines[i];
                return true;
            }
        }
        this.winner = null;
        this.winningLine = Array();
        return false;
    }

    highlightWinner() {
        if (this.xIsNext) {
            document.getElementById("status").innerHTML = "👻 WINS!!";
        } else {
            document.getElementById("status").innerHTML = "🎃 WINS!!";
        }
        for (let i = 0; i < this.winningLine.length; i++) {
            let squareIndex = this.winningLine[i];
            document.getElementById(squareIndex).classList.add("red");
        }
    }

    disableAll() {
        for (let i = 0; i < this.squares.length; i++) {
            document.getElementById(i).onclick = () => {};
        } 
    }
    

/*
        Init
        -   bind both this and i to handleClick
            -   this.handleClick.bind(this, i);

        CalculateWinner
        -   use destructuring assingment to assign values to
            a b and c in one line

        HandleClick
        -   add a parameter i rather than getting i from this
            -   this now refers to the class not the square
        -   remove the local variable i
        -   add a local variable to refer to the clicked square
            -   remember that squares have an integer id 0 - 8
    */
}

// declare a variable ttt
let ttt;
// add an onload handler to the window that assigns ttt to a TTT
window.onload = () => {ttt = new TTT();}