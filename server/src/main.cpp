#include <iostream>
#include <string>
#include "battleship.h"


using namespace std;

int main() {
    //main is for commenting out when unit testing
    battleship game{1};
    int players;
    cout << "Single player or Two player? (1 or 2)";
    cin >> players;
    if (players == 1) {
        game.onePlayer();
    }
    if (players == 2){
        game.twoPlayer();
    }
    return 0;
}