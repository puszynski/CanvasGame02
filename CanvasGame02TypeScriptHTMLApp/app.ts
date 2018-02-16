namespace Game {
    var canvas: HTMLCanvasElement;
    var c: CanvasRenderingContext2D;
    var drawFoodArray: Array<IAllObjectsRequirements> = new Array<IAllObjectsRequirements>();
     
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

        drawFoodArray.push(new RoundObject(200, 300, 200, 300));
        drawFoodArray.push(new RoundObject(800, 800, 333, 123));        

        gameLoop();
    }
    
    interface IAllObjectsRequirements {
        area: number;
        energy: number; // max: 5000
        x: number;
        y: number;

        draw(): void;
        //showObjectInfo(e);
    }


    class RoundObject implements IAllObjectsRequirements {

        public area: number;
        public energy: number;
        public x: number;
        public y: number;
        //public radius: number; - instead of it getter was used
        public isMouseDown: boolean = false;

        constructor(_area: number, _energy: number, _x: number, _y: number) {
            this.area = _area;
            this.energy = _energy;
            this.x = _x;
            this.y = _y;

            //document.getElementById('player').addEventListener("mouseover", this.showObjectInfo2, false);            
            window.addEventListener("mousedown", this.showObjectInfo, false); //mousedown
            window.addEventListener("mouseup", this.mouseUp, false);
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

                alert("Area: " + this.area + ", energy: " + this.energy);
            }
        }

        public mouseUp = (e: MouseEvent): void => {
            this.isMouseDown = false;
        }

        //public showObjectInfo2 = (event: MouseEvent): void => {  // old name: mouseDown
        //    alert("Object area(mass?):" + this.area + "<br />, object energy:" + this.energy);                 
        //}
    }

    var player = new RoundObject(600, 800, 400, 400); // SPRAWDZ CZY NIE TRZEBA PRZENIESC TEGO NA DÓŁ! ŻEBY DZIAŁO POD CHROMEM


    // GAMELOOP FUNCTION TO ANIMATE OBJECTS
    function gameLoop(): void {
        requestAnimationFrame(gameLoop);

        // clearing old frames from objects
        c.clearRect(0, 0, innerWidth, innerHeight);

        // drawing player objects:
        player.draw();

        // Drawing all objects from drawFooObject (pushed to array in window.onload)
        for (var i: number = 0; i < drawFoodArray.length; i++) {
            var d: IAllObjectsRequirements = drawFoodArray[i]
            d.draw();
        }
    }
}