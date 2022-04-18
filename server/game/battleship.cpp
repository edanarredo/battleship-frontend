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
            board1[i][j]=0;
            board2[i][j]=0;
        }
    }
}
void placeBoats(int player, const string& boatName, int size, int type){
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
            if (player == 1) {
                board1[x][y + i] = type;
            }
            else{
                board2[x][y + i] = type;
            }
        }
    }
    if (direction == 'e'){
        for (int i = 0; i < size;i++) {
            if (player == 1) {
                board1[x + i][y] = type;
            }
            else{
                board2[x + i][y] = type;
            }
        }
    }
    if (direction == 's'){
        for (int i = 0; i < size;i++) {
            if (player == 1) {
                board1[x][y - i] = type;
            }
            else{
                board2[x][y - i] = type;
            }
        }
    }
    if (direction == 'w'){
        for (int i = 0; i < size;i++) {
            if (player == 1) {
                board1[x - i][y] = type;
            }
            else{
                board2[x - i][y] = type;
            }
        }
    }
}

void guessSpace(int targetBoard[][10], int player){
    int x, y, C, B, D, S, P;
    if (player == 1){
        C = C1, B = B1, D = D1, S = S1, P = P1;
    }
    else{
        C = C2, B = B2, D = D2, S = S2, P = P2;
    }
    cout << "Guess x";
    cin >> x;
    cout << "Guess y";
    cin >> y;
    if (targetBoard[x][y] > 2){
        if (targetBoard[x][y] == 3){
            C++;
            cout << "You hit my Carrier";
        }
        else if (targetBoard[x][y] == 4){
            B++;
            cout << "You hit my Battleship";
        }
        else if (targetBoard[x][y] == 5){
            D++;
            cout << "You hit my Destroyer";
        }
        else if (targetBoard[x][y] == 6){
            S++;
            cout << "You hit my Submarine";
        }
        else if (targetBoard[x][y] == 7){
            P++;
            cout << "You hit my Patrol Boat";
        }
        if (player == 1) {
            board1[x][y] = 2;
            points1++;
        }
        else{
            board2[x][y] = 2;
            points2++;
        }
        if (C == 5){
            cout << "\nYou sunk my Carrier";
            //C = 0;
        }
        else if (B == 4){
            cout << "\nYou sunk my Battleship";
            //B = 0;
        }
        else if (D == 5){
            cout << "\nYou sunk my Destroyer";
            //D = 0;
        }
        else if (S == 6){
            cout << "\nYou sunk my Submarine";
            //S = 0;
        }
        else if (P == 7){
            cout << "\nYou sunk my Patrol Boat";
            //P = 0;
        }
    }
    else {
        cout << "miss";
        if (player == 1) {
            board1[x][y] = 1;
        }
        else{
            board2[x][y] = 1;
        }
    }
    if (player == 1){
        C1 = C, B1 = B, D1 = D, S1 = S, P1 = P;
    }
    else{
        C2 = C, B2 = B, D2 = D, S2 = S, P2 = P;
    }
    cout << endl;
}
void printBoard(int board[][10])  //Print the board1 with the boats placed on it
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
            if (board[j][i] == 1){ //miss
                cout << 'O';
            }
            else if (board[j][i] == 2){ //hit
                cout << 'X';
            }
            else if (board[j][i] == 3){ //carrier
                //cout << 'C';
                cout << ' ';
            }
            else if (board[j][i] == 4){ //battleship
                //cout << 'B';
                cout << ' ';
            }
            else if (board[j][i] == 5){ //destroyer
                //cout << 'D';
                cout << ' ';
            }
            else if (board[j][i] == 6){ //submarine
                //cout << 'S';
                cout << ' ';
            }
            else if (board[j][i] == 7){ //patrol boat
                //cout << 'P';
                cout << ' ';
            }
            else {                      //water (empty space)
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
    placeBoats(player1,"Carrier", 5, 3);
    placeBoats(player1,"Battleship", 4, 4);
    placeBoats(player1,"Destroyer", 3, 5);
    placeBoats(player1,"Submarine", 3, 6);
    placeBoats(player1,"Patrol Boat", 2, 7);
    placeBoats(player2,"Carrier", 5, 3);
    placeBoats(player2,"Battleship", 4, 4);
    placeBoats(player2,"Destroyer", 3, 5);
    placeBoats(player2,"Submarine", 3, 6);
    placeBoats(player2,"Patrol Boat", 2, 7);
    while (points1 != 17 || points2 != 17) {
        guessSpace(board2, player1);
        printBoard(board2);
        guessSpace(board1, player2);
        printBoard(board1);
    }
    if (points1 == 17)
    cout << "\nYou win";
    return 0;
}
