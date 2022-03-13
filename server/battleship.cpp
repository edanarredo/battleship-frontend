#include <iostream>
#include <iostream>
#include <string>
#include <cstdlib>
#include <iomanip>
#include <vector>
#include "battleship.h"
using namespace std;


void initialize(){
    for(int i=0; i < 10; i++){
        for(int j=0; j < 10; j++){
            board[i][j]=0;
        }
    }
}
void placeBoats(){
    int x, y;
    char direction;

    cout << "x coordinate for Carrier (5 spaces)";
    cin >> x;
    cout << "y coordinate for Carrier (5 spaces)";
    cin >> y;
    cout << "Direction coordinate for Carrier (5 spaces)";
    cin >> direction;
    if (direction == 'n'){
        board[x][y]=1;
        board[x][y+1]=1;
        board[x][y+2]=1;
        board[x][y+3]=1;
        board[x][y+4]=1;
    }
    if (direction == 'e'){
        board[x][y]=1;
        board[x+1][y]=1;
        board[x+2][y]=1;
        board[x+3][y]=1;
        board[x+4][y]=1;
    }
    if (direction == 's'){
        board[x][y]=1;
        board[x][y-1]=1;
        board[x][y-2]=1;
        board[x][y-3]=1;
        board[x][y-4]=1;
    }
    if (direction == 'w'){
        board[x][y]=1;
        board[x-1][y]=1;
        board[x-2][y]=1;
        board[x-3][y]=1;
        board[x-4][y]=1;
    }
}
void guessSpace(){
    int x, y;
    cout << "Guess x";
    cin >> x;
    cout << "Guess y";
    cin >> y;
    if (board[x][y] == 1){
        cout << "hit";
    }
    else
        cout << "miss";
}
int main() {
    initialize();
    placeBoats();
    guessSpace();
    return 0;
}
