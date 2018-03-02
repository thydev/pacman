var randomNumberBetween = function(min, max){
    return Math.random()*(max-min) + min;
}

var world = [];

        var worldDict = {
            0: 'blank',
            1: 'wall',
            2: 'sushi',
            3: 'onigiri'
        }
        
        //Score of how many Sushi's NinjaMan eats
        var score = 0;

        function drawWorld(){
            var output = "";
            for(var row = 0; row < world.length; row++){
                output += "<div class='row'>";
                for(var x = 0; x < world[row].length; x++) {
                    //console.log("element:", worldDict[world[row][x]]);
                    if (row == 1 && x == 1) {
                        //pacman started position
                        output += "<div class='" + worldDict[0] + "'></div>"
                    } else {
                        output += "<div class='" + worldDict[world[row][x]] + "'></div>";
                    }
                }
                output += "</div>";
            }
            document.getElementById('world').innerHTML = output;
        }

        //drawWorld();

        var ninjaman = {
            x: 1,
            y: 1
        }

        function drawNinjaman(){

            document.getElementById('ninjaman').style.top = ninjaman.y * 20 + 'px';
            document.getElementById('ninjaman').style.left = ninjaman.x * 20 + 'px';
            
        }

        //drawNinjaman();

        document.onkeydown = function(e) {
            if (e.keyCode === 37) { //left
                //Can not get through wall
                rotateNinja("scaleX(1)");
                if (world[ninjaman.y][ninjaman.x - 1] != 1) {
                    ninjaman.x--;
                }
            } else if (e.keyCode === 39) { //right
                rotateNinja("rotate(180deg)");
                rotateNinja("scaleX(-1)");
                if (world[ninjaman.y][ninjaman.x + 1] != 1) {
                    ninjaman.x++;
                }
            } else if (e.keyCode === 40) { //down
                rotateNinja("rotate(-90deg)");
                if (world[ninjaman.y + 1][ninjaman.x] != 1) {
                    ninjaman.y++;
                }
            } else if (e.keyCode === 38) { //up
                rotateNinja("rotate(90deg)");
                if (world[ninjaman.y - 1][ninjaman.x] != 1) {
                    ninjaman.y--;
                }
            } else if (e.keyCode === 32) { //Space
                if (ninjaman.y - 1 > 0) { //Avoid to destroy the top wall
                    if (ninjaman.x-1 > 0) world[ninjaman.y-1][ninjaman.x-1] = 0; //Avoid to destroy the left wall
                    world[ninjaman.y-1][ninjaman.x] = 0;
                    if (ninjaman.x+1 < world[ninjaman.y-1].length - 1 ) world[ninjaman.y-1][ninjaman.x+1] = 0;
                }

                if (ninjaman.x-1 > 0) world[ninjaman.y][ninjaman.x-1] = 0; //Avoid to destroy the left wall
                if (ninjaman.x+1 < world[ninjaman.y].length - 1 ) world[ninjaman.y][ninjaman.x+1] = 0;

                //Avoid to destroy the bottom wall
                if (ninjaman.y + 1 < world.length - 1 ) {
                    if (ninjaman.x-1 > 0) world[ninjaman.y+1][ninjaman.x-1] = 0; //Avoid to destroy the left wall
                    world[ninjaman.y+1][ninjaman.x] = 0;
                    if (ninjaman.x+1 < world[ninjaman.y+1].length - 1 ) world[ninjaman.y+1][ninjaman.x+1] = 0;
                }

            }
            console.log(world[ninjaman.y][ninjaman.x]);
            if (world[ninjaman.y][ninjaman.x] === 2) { // eat sushi
                score += 10;
            } else if (world[ninjaman.y][ninjaman.x] === 3) { // eat onigiri
                score += 5;
            } 

            world[ninjaman.y][ninjaman.x] = 0;
            drawWorld();
            drawNinjaman();
            updateScore();
            
        } // keydown

        //Rotate the ninjaman
        function rotateNinja (rotate) {
            document.getElementById('ninjaman').style.transform = rotate;    
        }

        //Display score information
        function updateScore() {
            document.getElementById('score').innerHTML = score;
        }

        function generateWorld(){
            var myWorld = [];
            var row = Math.floor(randomNumberBetween(10, 25)); // Generate random number from 5 to 10
            var col = Math.floor(randomNumberBetween(10, 45)); // Generate random number from 5 to 10
            for(var i = 0; i < row; i++) {
                myWorld.push([]);
                for(var j = 0; j < col; j++) {
                    myWorld[i].push(1); // wall
                    if (i !== 0  && j !== 0) {
                        if ( i !== row - 1 && j !== col - 1){
                            myWorld[i][j] = Math.floor(randomNumberBetween(0, 3));
                        }
                    }
                }
            }
            
            console.log(row, col);
            return myWorld;
        }

        function resetGame() {
            score = 0;
            world = generateWorld();
            drawWorld();
            drawNinjaman();
            updateScore();
            rotateNinja("scaleX(-1)");
        }

        window.onload = function() {resetGame()};
        /*
        (Basic) Keep Score of how many Sushi's NinjaMan eats -> done
        (Basic) Add Onigiri as an alternative food to eat -> done
        (Intermediate) Random world generated when loading the page -> done
        (Advanced) Add Ghosts that chase NinjaMan around
        (Advanced) Give NinjaMan 3 lives where Game Over occurs when a ghost hits NinjaMan 3 times
        */