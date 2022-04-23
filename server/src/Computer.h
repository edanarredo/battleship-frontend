#ifndef COMPUTER_H
#define COMPUTER_H

#include <vector>
#include <utility>
#include <random>
#include <ctime>
#include "battleship.h"

class Computer {
public:
    vector<pair<int, int>> shots;
    int reverseCheck;
    int cPlaceBoats(battleship &, int size, int type);
    int tryMove(battleship &);
    int tryAdjacent(battleship, int &x, int &y);
};


#endif //COMPUTER_H
