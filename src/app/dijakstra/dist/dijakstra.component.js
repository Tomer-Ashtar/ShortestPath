"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DijakstraComponent = void 0;
var core_1 = require("@angular/core");
var grid_component_1 = require("../grid/grid.component");
var heap_js_1 = require("heap-js");
var DijakstraComponent = /** @class */ (function () {
    function DijakstraComponent() {
        this.pathArray = []; //Array for the final path 
        this.Un_visited_Suquares_Heap = new heap_js_1.Heap(function (a, b) { return a.distance - b.distance; });
    }
    DijakstraComponent.prototype.fillHeap = function () {
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 57; j++) {
                this.Un_visited_Suquares_Heap.push(grid_component_1.GridComponent.arguments.squares[i][j]);
            }
        }
    };
    DijakstraComponent = __decorate([
        core_1.Component({
            selector: 'app-dijakstra',
            templateUrl: './dijakstra.component.html',
            styleUrls: ['./dijakstra.component.css']
        })
    ], DijakstraComponent);
    return DijakstraComponent;
}());
exports.DijakstraComponent = DijakstraComponent;
