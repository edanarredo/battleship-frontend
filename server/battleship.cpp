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
void placeBoats(string boatName, int size, int type){
    int x, y;
    char direction;
    cout << "x coordinate for " << boatName << "(" << size << " spaces)";
    cin >> x;
    cout << "y coordinate for " << boatName << "(" << size << " spaces)";
    cin >> y;
    cout << "Direction coordinate for " << boatName << "(" << size << " spaces)";
    cin >> direction;
    if (direction == 'n'){
        for (int i = 0; i < size;i++) {
            board[x][y + i] = type;
        }
    }
    if (direction == 'e'){
        for (int i = 0; i < size;i++) {
            board[x + i][y] = type;
        }
    }
    if (direction == 's'){
        for (int i = 0; i < size;i++) {
            board[x][y - i] = type;
        }
    }
    if (direction == 'w'){
        for (int i = 0; i < size;i++) {
            board[x - i][y] = type;
        }
    }
}

void guessSpace(){
    int x, y;
    cout << "Guess x";
    cin >> x;
    cout << "Guess y";
    cin >> y;
    if (board[x][y] > 2){
        if (board[x][y] == 3){
            C++;
            cout << "You hit my Carrier";
        }
        else if (board[x][y] == 4){
            B++;
            cout << "You hit my Battleship";
        }
        else if (board[x][y] == 5){
            D++;
            cout << "You hit my Destroyer";
        }
        else if (board[x][y] == 6){
            S++;
            cout << "You hit my Submarine";
        }
        else if (board[x][y] == 7){
            P++;
            cout << "You hit my Patrol Boat";
        }
        board[x][y] = 2;
        points++;
        if (C == 5){
            cout << "\nYou sunk my Carrier";
        }
        else if (B == 4){
            cout << "\nYou sunk my Battleship";
        }
        else if (D == 5){
            cout << "\nYou sunk my Destroyer";
        }
        else if (S == 6){
            cout << "\nYou sunk my Submarine";
        }
        else if (P == 7){
            cout << "\nYou sunk my Patrol Boat";
        }
    }
    else {
        cout << "miss";
        board[x][y] = 2;
    }
    cout << endl;
}
void printBoard()  //Print the board with the boats placed on it
{
    cout << "   0|1|2|3|4|5|6|7|8|9" << endl;
    for(int i=0; i<10; i++)  //column loop
    {
        for(int j=0; j<10; j++)  //row loop
        {
            if(j==0)
            {
                cout << i << "  " ; //print row number and spaces before new row
            }
            if (board[j][i] == 1){
                cout << 'O';
            }
            else if (board[j][i] == 2){
                cout << 'X';
            }
            else if (board[j][i] == 3){
                cout << 'C';
            }
            else if (board[j][i] == 4){
                cout << 'B';
            }
            else if (board[j][i] == 5){
                cout << 'D';
            }
            else if (board[j][i] == 6){
                cout << 'S';
            }
            else if (board[j][i] == 7){
                cout << 'P';
            }
            else {
                cout << ' ';
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
    placeBoats("Carrier", 5, 3);
    placeBoats("Battleship", 4, 4);
    placeBoats("Destroyer", 3, 5);
    placeBoats("Submarine", 3, 6);
    placeBoats("Patrol Boat", 2, 7);
    while (points != 17) {
        guessSpace();
        printBoard();
    }
    cout << "\nYou win";
    return 0;
}
