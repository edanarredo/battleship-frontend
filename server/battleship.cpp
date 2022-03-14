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
        board[x][y] = 3;
    }
    else {
        cout << "miss";
        board[x][y] = 2;
    }
}
void printBoard()  //Print the board with the boats placed on it
{
    cout << "   0|1|2|3|4|5|6|7|8|9" << endl << endl;
    for(int i=0; i<10; i++)  //column loop
    {
        for(int j=0; j<10; j++)  //row loop
        {
            if(j==0)
            {
                cout << i << "  " ; //print row number and spaces before new row
            }
            if (board[i][j] == 1){
                cout << '=';
            }
            else if (board[i][j] == 2){
                cout << ' ';
            }
            else if (board[i][j] == 3){
                cout << 'X';
            }
            else {
                cout << 'O';
            }
            if(j!=9)
            {
                cout << "|";
            }
        }
        cout << endl; //new line at end of column
    }
    cout << endl;
}
int main() {
    initialize();
    placeBoats();
    guessSpace();
    printBoard();
    return 0;
}
