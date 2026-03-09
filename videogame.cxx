#include <iostream>
#include <string>
using namespace std;
class GameCharacter {
private:
    string name;
    int health;
    int maxHealth;  
public:
    GameCharacter(string n, int maxH) {
        name = n;
        maxHealth = maxH;
        health = maxHealth;
    }    
    string getName() {
        return name;
    }    
    int getHealth() {
        return health;
    }
    void takeDamage(int damage) {
        health -= damage;
        if (health < 0) {
            health = 0;
            cout << "Character has fainted." << endl;
        }
    }    
    void heal(int amount) {
        health += amount;
        if (health > maxHealth) {
            health = maxHealth;
        }
    }
};
int main() {
    GameCharacter hero("Arthur", 100);
    hero.takeDamage(120);
    hero.heal(50);
    hero.heal(200);
    cout << "Final Health: " << hero.getHealth() << endl;
    return 0;
}