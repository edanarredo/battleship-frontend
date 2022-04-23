#ifndef BATTLESHIP_H
#define BATTLESHIP_H
#include <iostream>
#include <string>
using namespace std;
class battleship{
public:
    int board [10][10]{0}; //initializes all to water
    int points = 0,
    C = 0, B = 0, D = 0, S = 0, P = 0, //ship status's
    player;
    battleship(int x){
        player = x; //this was to keep track of which player is which but it became obsolete
    }
    void getCoordinates(battleship &, const string& boatName, int size, int type);
    int checkBoats(battleship, int x, int y, int size, char direction);
    void placeBoats(battleship &, int x, int y, int size, int type, char direction);
    void chooseSpace(battleship &, int x, int y);
    void guessSpace(battleship &);
    void printBoard();
    void onePlayer();
    void twoPlayer();
};
#endif //BATTLESHIP_H
