namespace Game {
    var canvas: HTMLCanvasElement;
    var c: CanvasRenderingContext2D;
    var drawFoodArray: Array<RoundFood> = new Array<RoundFood>();

    // Food object values
    var foodObjectsCount: number = 10;
    var dustFoodCount: number = 100;
    var maxFoodObjectArea: number = 5000;
    var maxFoodObjectEnergy: number = 5000;

    // Player start values
    var startPlayerArea: number = 500;
    var startPlayerEnergy: number = 500;



    window.onload = () => {
        canvas = <HTMLCanvasElement>document.getElementById("gameCanvas");  //or: canvas = document.querySelector("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        c = canvas.getContext("2d");

        // increasing canvas(Id("gameCanvas")) size during resizing browser
        window.addEventListener("resize", function (event) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });

        // creating randomly foodObject
        for (var i = 0; i < foodObjectsCount; i++) {
            drawFoodArray.push(new RoundFood(Math.random() * maxFoodObjectArea, Math.random() * maxFoodObjectEnergy, Math.random() * window.innerWidth, Math.random() * window.innerHeight, (Math.random()-0.5) * 5, (Math.random()-0.5) * 5));
        }
        // dust object
        for (var i = 0; i < dustFoodCount; i++) {
            drawFoodArray.push(new RoundFood(Math.random() * 10, Math.random() * 1000, Math.random() * window.innerWidth, Math.random() * window.innerHeight, (Math.random()-0.5) * 1, (Math.random()-0.5) * 1));
        }
        
        gameLoop();
    }



    interface IAllObjectsRequirements {
        area: number;
        energy: number; // max: 5000
        x: number;
        y: number;

        draw(): void;
        showObjectInfo(e);
    }


    class RoundObject implements IAllObjectsRequirements {

        readonly area: number;
        readonly energy: number;
        public x: number;
        public y: number;

        constructor(_area: number, _energy: number, _x: number, _y: number) {
            this.area = _area;
            this.energy = _energy;
            this.x = _x;
            this.y = _y;
         
            window.addEventListener("mousemove", this.showObjectInfo, false); //mousedown            
        }

        get radius(): number {  //getter - radius will be value, not method; It`s dynamic - it will change when area will, user cant change value of radius; Y can also use Setters
            return Math.sqrt(this.area / Math.PI);
        }

        draw(): void {              // same?    public draw = (): void => {
            c.fillStyle = "white";
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.shadowBlur = this.energy / 100;
            c.shadowColor = 'white';
            c.fill();         

            //if (player || bot) { render randomly moving circles to simulate life form }
        }

        public showObjectInfo = (event: MouseEvent): void => {
            var x: number = event.x;
            var y: number = event.y;

            if (x > this.x - this.radius
                && y > this.y - this.radius
                && x < this.x + this.radius
                && y < this.y + this.radius) {

                // Draw a line between player and object
                c.beginPath();
                c.moveTo(player.x, player.y); 
                c.lineTo(this.x, this.y);
                c.strokeStyle = 'white';
                c.setLineDash([2, 7]);
                c.stroke();

                // Display objects info
                var msg: string = "area: " + Math.round(this.area) + ", energy: " + Math.round(this.energy);
                c.font = '13px Times New Roman';
                c.fillText(msg, this.x + this.radius + 5, this.y);
            }
        }        
    }



    class RoundFood extends RoundObject {
        public dx: number;
        public dy: number;

        constructor(_area: number, _energy: number, _x: number, _y: number, _dx:number, _dy: number) {
            super(_area, _energy, _x, _y);
            this.dx = _dx;
            this.dy = _dy;
        }
    }




    var player = new RoundObject(startPlayerArea, startPlayerEnergy, window.innerWidth / 2, window.innerHeight / 2);





    // GAMELOOP FUNCTION TO ANIMATE OBJECTS
    function gameLoop(): void {
        requestAnimationFrame(gameLoop);

        // clearing old frames from objects
        c.clearRect(0, 0, innerWidth, innerHeight);

        // drawing player objects:
        player.draw();
        

        // Drawing and moving food objects
        for (var i: number = 0; i < drawFoodArray.length; i++) {
            var d: RoundFood = drawFoodArray[i];
            d.draw();

            if (d.x - 10 * d.radius > innerWidth  || d.x + 10 * d.radius < 0) d.dx = - d.dx;
            if (d.y - 10 * d.radius > innerHeight || d.y + 10 * d.radius < 0) d.dy = - d.dy;

            d.x = d.x + d.dx;
            d.y = d.y + d.dy;
        }
    }
}
