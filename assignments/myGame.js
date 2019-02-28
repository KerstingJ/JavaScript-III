const readline = require('readline-sync');

function Game(attr){
    this.createdAt = attr.createdAt;
    this.location = attr.location;
    this.name = attr.name;
    this.rep = attr.rep.toUpperCase();
}
Game.prototype.inspect = function(){
    return `it looks like a ${this.name}`;
}

function Character(attr){
    Game.call(this, attr);
    this.health = attr.health;
    this.strength = attr.strength;
    this.defense = attr.defense;
}
Character.prototype = Object.create(Game.prototype);

function Hero(attr){
    Character.call(this, attr);
}
Hero.prototype = Object.create(Character.prototype);
Hero.prototype.move = function(location){
    this.location = location;
}
Hero.prototype.heal = function(){
    let amt = Math.floor(Math.random() * 20);
    hero.health += amt;
    return amt;
}

function GameMap(){
    Array.call(this);
    this.size = 20;
    for(let i=0; i<this.size; i++){
        let row = [];
        row.length = this.size;
        row.fill(' ')
        this.push(row);
    }
}
GameMap.prototype = Object.create(Array.prototype);
GameMap.prototype.draw = function(){
    console.clear();
    this.forEach(row => {
        console.log(row.reduce((total, col) => total += " " + col), " ");
    })
}
GameMap.prototype.removeObject = function(gameObject){
    let x = gameObject.location[0] + 1;
    let y = gameObject.location[1] + 1;
    this[y][x] = " ";
}
GameMap.prototype.addObject = function(gameObject){
    let x = gameObject.location[0] + 1;
    let y = gameObject.location[1] + 1;
    this[y][x] = gameObject.rep;
}
GameMap.prototype.getLocation = function(loc){
    return this[loc[1] + 1][loc[0] + 1];
}

function addPoints(loc1, moveTo){
    let newLoc = [];
    newLoc.push(loc1[0] + moveTo[0]);
    newLoc.push(loc1[1] + moveTo[1]);
    return newLoc;
}

function move(gameMap, hero, newLoc){
    gameMap.removeObject(hero);
    hero.location = newLoc;
    gameMap.addObject(hero);
}

function combat(hero, enemy){
    let con = true;
    let answer = 'f';
    console.log("\n\n\n\n\n")
    while(hero.health > 0 && enemy.health > 0 && con === true){
        console.clear();
        let heroDmg = Math.floor(Math.random() * hero.strength);
        let enemyDmg = Math.floor(Math.random() * enemy.strength);
        if (answer === 'h'){
            console.log(`You healed yourself ${hero.heal()} points. your health is now at ${hero.health}`);
        } else {
            enemy.health -= heroDmg;
            console.log(`${hero.name} hit ${enemy.name} for ${heroDmg}`)
        }
        hero.health -= enemyDmg;
        console.log(`${enemy.name} hit ${hero.name} for ${enemyDmg}`)
        if (hero.health > 0){
            answer = readline.question("Run? or keep fighting?\n" + 
            `you have ${hero.health} health \ngoblin has ${enemy.health} health left\nr = run f = fight h = heal\n`);
            con = answer[0].toLowerCase() === 'r'? false : true;
        }
    }

    return hero.health > 0 ? 1 : -1;
}

function processMove(answer, game, hero, enemy){
    let newLoc = [0,0];
    if (answer.toLowerCase() === 'l') {
        newLoc = addPoints(hero.location, [-1, 0]);
    }else if (answer.toLowerCase() === 'r') {
        newLoc = addPoints(hero.location, [1, 0]);
    } else if (answer.toLowerCase() === 'u') {
        newLoc = addPoints(hero.location, [0, -1]);
    } else if (answer.toLowerCase() === 'd'){
        newLoc = addPoints(hero.location, [0, 1]);
    } else if (answer.toLowerCase() === 'q'){
        play = false;
    }
    if (game.getLocation(newLoc) === "0"){
        if (combat(hero, enemy) < 1){
            play = false;
            console.log("\n\n\n\n\nSorry you died!!!!\n\n\n\n\n\n") 
            return;
        }

        console.log(`You wooped that ${enemy.name}`) 

    }
    move(game, hero, newLoc);
};

let game = new GameMap();
let hero = new Hero({
    createdAt: new Date(),
    location: [1,1],
    name: 'Josh',
    rep: 'X',
    health: 100,
    strength: 100,
    defense: 100
});
let enemy = new Character({
    createdAt: new Date(),
    location: [12, 5],
    name: 'Goblin',
    rep: '0',
    health: 1000,
    strength: 15,
    defense: 25
});
game.addObject(hero);
game.addObject(enemy);

let play = true;

while(play === true){
    game.draw();
    let answer = readline.question('\nWhere do you want to move?\nYou can chain movements as long as you dont run into anything\nex. l = left, r=right, u=up, d=down\n' +
    '\'X\' is you \'0\' is the goblin\n');
    answer = answer.split('');
    answer.forEach(x => processMove(x, game, hero, enemy));
}