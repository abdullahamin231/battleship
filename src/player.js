export default class Player{
    
    attack(x, y, enemy){
        enemy.recieveAttack(x, y);
    }
    
    move(){
        return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    }
    

}