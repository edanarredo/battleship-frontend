#include <iostream>
#include <cassert>
#include "battleship.h"
#include "Computer.h"
using namespace std;
int testBoard [10][10] = {{3,0,0,0,0,0,0,0,0,0},
                          {3,0,0,0,0,0,0,0,0,0},
                          {3,0,0,0,0,0,11,0,0,0},
                          {3,0,0,0,0,0,11,0,0,0},
                          {3,0,0,0,0,0,0,0,0,0},
                          {0,0,0,0,9,9,9,0,0,0},
                          {0,0,5,0,0,0,0,0,0,0},
                          {0,0,5,0,7,7,7,0,0,0},
                          {0,0,5,0,0,0,0,0,0,0},
                          {0,0,5,0,0,0,0,0,0,0},};
int testBoard2 [10][10] = {{3,0,0,0,0,0,0,0,0,0},
                           {4,0,0,0,0,0,0,0,0,0},
                           {4,0,0,0,0,0,11,0,0,0},
                           {3,0,0,0,0,0,11,0,0,0},
                           {3,0,0,0,0,0,0,0,0,0},
                           {0,0,5,7,9,9,9,0,0,0},
                           {0,1,6,8,1,0,0,0,0,0},
                           {0,0,5,7,0,0,0,0,0,0},
                           {0,0,5,0,0,0,0,0,0,0},
                           {0,0,0,0,0,0,0,0,0,0},};
int tempBoard [10][10];

int main(){
    battleship test(1);
    Computer comp{};
    srand(1);
    copy(&testBoard[0][0], &testBoard[0][0]+10*10,&test.board[0][0]);
    assert(comp.cPlaceBoats(test,5,3) == 0);
    cout << "cPlaceBoats test passed";
    copy(&testBoard[0][0], &testBoard[0][0]+10*10,&test.board[0][0]);
    assert(test.checkBoats(test,0,1,5,'w') == 1);
    cout << "\ncheckBoats (valid boat) test passed";
    assert(!test.checkBoats(test,1,4,5,'w'));
    cout << "\ncheckBoats (invalid boat / last space full) test passed";
    assert(!test.checkBoats(test,0,0,5,'n'));
    cout << "\ncheckBoats (invalid boat / first space full) test passed";
    assert(!test.checkBoats(test,3,5,5,'e'));
    cout << "\ncheckBoats (invalid boat / off board fail) test passed\n";
    copy(&testBoard2[0][0], &testBoard2[0][0]+10*10,&test.board[0][0]);
    comp.shots.emplace_back(2,0);
    comp.shots.emplace_back(1,0);
    comp.tryMove(test);
    cout << "\n";
    comp.tryMove(test);
    assert(test.board[3][0] == 4);
    cout << "\nEdge test passed. Carrier should be hit twice.\n";
    comp.shots.pop_back();
    comp.shots.pop_back();
    comp.shots.pop_back();
    comp.shots.pop_back();
    comp.shots.emplace_back(6,2);//hit
    comp.shots.emplace_back(6,3);//hit
    comp.shots.emplace_back(6,4);//miss
    comp.reverseCheck = 1;
    comp.tryMove(test);
    assert(test.board[comp.shots.back().first][comp.shots.back().second] == 6 ||
           test.board[comp.shots.back().first][comp.shots.back().second] == 8);
    cout << "\nShot queue on two ships passed. Either Destroyer or Battleship should be hit";
    return 0;
};
