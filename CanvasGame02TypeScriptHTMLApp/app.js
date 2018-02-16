var Game;
(function (Game) {
    var canvas;
    var c;
    var drawFoodArray = new Array();
    window.onload = function () {
        canvas = document.getElementById("gameCanvas"); //or: canvas = document.querySelector("canvas");
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
    };
    var RoundObject = /** @class */ (function () {
        function RoundObject(_area, _energy, _x, _y) {
            var _this = this;
            //public radius: number; - instead of it getter was used
            this.isMouseDown = false;
            this.showObjectInfo = function (event) {
                var x = event.x;
                var y = event.y;
                if (x > _this.x - _this.radius
                    && y > _this.y - _this.radius
                    && x < _this.x + _this.radius
                    && y < _this.y + _this.radius) {
                    alert("Area: " + _this.area + ", energy: " + _this.energy);
                }
            };
            this.mouseUp = function (e) {
                _this.isMouseDown = false;
            };
            this.area = _area;
            this.energy = _energy;
            this.x = _x;
            this.y = _y;
            //document.getElementById('player').addEventListener("mouseover", this.showObjectInfo2, false);            
            window.addEventListener("mousedown", this.showObjectInfo, false); //mousedown
            window.addEventListener("mouseup", this.mouseUp, false);
        }
        Object.defineProperty(RoundObject.prototype, "radius", {
            get: function () {
                return Math.sqrt(this.area / Math.PI);
            },
            enumerable: true,
            configurable: true
        });
        RoundObject.prototype.draw = function () {
            c.fillStyle = "white";
            c.beginPath();
            c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            c.shadowBlur = this.energy / 100;
            c.shadowColor = 'white';
            c.fill();
            //if (player || bot) { render randomly moving circles to simulate life form }
        };
        return RoundObject;
    }());
    var player = new RoundObject(600, 800, 400, 400); // SPRAWDZ CZY NIE TRZEBA PRZENIESC TEGO NA DÓŁ! ŻEBY DZIAŁO POD CHROMEM
    // GAMELOOP FUNCTION TO ANIMATE OBJECTS
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        // clearing old frames from objects
        c.clearRect(0, 0, innerWidth, innerHeight);
        // drawing player objects:
        player.draw();
        // Drawing all objects from drawFooObject (pushed to array in window.onload)
        for (var i = 0; i < drawFoodArray.length; i++) {
            var d = drawFoodArray[i];
            d.draw();
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=app.js.map