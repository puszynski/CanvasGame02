var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Game;
(function (Game) {
    var canvas;
    var c;
    var drawFoodArray = new Array();
    // Food object values
    var foodObjectsCount = 10;
    var dustFoodCount = 100;
    var maxFoodObjectArea = 5000;
    var maxFoodObjectEnergy = 5000;
    // Player start values
    var startPlayerArea = 500;
    var startPlayerEnergy = 500;
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
        // creating randomly foodObject
        for (var i = 0; i < foodObjectsCount; i++) {
            drawFoodArray.push(new RoundFood(Math.random() * maxFoodObjectArea, Math.random() * maxFoodObjectEnergy, Math.random() * window.innerWidth, Math.random() * window.innerHeight, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5));
        }
        // dust object
        for (var i = 0; i < dustFoodCount; i++) {
            drawFoodArray.push(new RoundFood(Math.random() * 10, Math.random() * 1000, Math.random() * window.innerWidth, Math.random() * window.innerHeight, (Math.random() - 0.5) * 1, (Math.random() - 0.5) * 1));
        }
        gameLoop();
    };
    var RoundObject = /** @class */ (function () {
        function RoundObject(_area, _energy, _x, _y) {
            var _this = this;
            this.showObjectInfo = function (event) {
                var x = event.x;
                var y = event.y;
                if (x > _this.x - _this.radius
                    && y > _this.y - _this.radius
                    && x < _this.x + _this.radius
                    && y < _this.y + _this.radius) {
                    // Draw a line between player and object
                    c.beginPath();
                    c.moveTo(player.x, player.y);
                    c.lineTo(_this.x, _this.y);
                    c.strokeStyle = 'white';
                    c.setLineDash([2, 7]);
                    c.stroke();
                    // Display objects info
                    var msg = "area: " + Math.round(_this.area) + ", energy: " + Math.round(_this.energy);
                    c.font = '13px Times New Roman';
                    c.fillText(msg, _this.x + _this.radius + 5, _this.y);
                }
            };
            this.area = _area;
            this.energy = _energy;
            this.x = _x;
            this.y = _y;
            window.addEventListener("mousemove", this.showObjectInfo, false); //mousedown            
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
    var RoundFood = /** @class */ (function (_super) {
        __extends(RoundFood, _super);
        function RoundFood(_area, _energy, _x, _y, _dx, _dy) {
            var _this = _super.call(this, _area, _energy, _x, _y) || this;
            _this.dx = _dx;
            _this.dy = _dy;
            return _this;
        }
        return RoundFood;
    }(RoundObject));
    var player = new RoundObject(startPlayerArea, startPlayerEnergy, window.innerWidth / 2, window.innerHeight / 2);
    // GAMELOOP FUNCTION TO ANIMATE OBJECTS
    function gameLoop() {
        requestAnimationFrame(gameLoop);
        // clearing old frames from objects
        c.clearRect(0, 0, innerWidth, innerHeight);
        // drawing player objects:
        player.draw();
        // Drawing and moving food objects
        for (var i = 0; i < drawFoodArray.length; i++) {
            var d = drawFoodArray[i];
            d.draw();
            if (d.x - 10 * d.radius > innerWidth || d.x + 10 * d.radius < 0)
                d.dx = -d.dx;
            if (d.y - 10 * d.radius > innerHeight || d.y + 10 * d.radius < 0)
                d.dy = -d.dy;
            d.x = d.x + d.dx;
            d.y = d.y + d.dy;
        }
    }
})(Game || (Game = {}));
//# sourceMappingURL=app.js.map