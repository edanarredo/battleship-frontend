#include <iostream>
#include <ctime>
#include <cstdlib>
#include <iomanip>
#include <vector>
#include "battleship.h"
#include "Computer.h"
using namespace std;

void battleship::getCoordinates(battleship &targetBoard, const string& boatName, int size, int type){
    int x, y;
    char direction;
    do {
        cout << "x coordinate for " << boatName << "(" << size << " spaces)";
        cin >> x;
        cout << "y coordinate for " << boatName << "(" << size << " spaces)";
        cin >> y;
        cout << "Direction coordinate for " << boatName << "(" << size << " spaces)";
        cin >> direction; //direction is flipped (south means ^ east mean <-)
    }while(!checkBoats(targetBoard, x, y, size, direction));
    placeBoats(targetBoard , x , y, size, type, direction);
}
int battleship::checkBoats(battleship target, int x, int y, int size, char direction){ //checks boat placement
    int check;
    //returning 0 means the check failed
    if (direction == 'n'){
        if (y + size > 9){ //checks if x/y is in range since out of range array's act retarted
            return 0;
        }
        for (int i = 0; i < size;i++) {
            check = target.board[x][y + i]; //checks if boat is covering other boat
            if(check != 0){
                return 0;
            }
        }
    }
    if (direction == 'e'){
        if (x - size < 0){
            return 0;
        }
        for (int i = 0; i < size;i++) {
            check = target.board[x - i][y];
            if(check != 0){
                return 0;
            }
        }
    }
    if (direction == 's'){
        if (y - size < 0){
            return 0;
        }
        for (int i = 0; i < size;i++) {
            check = target.board[x][y - i];
            if(check != 0){
                return 0;
            }
        }
    }
    if (direction == 'w'){
        if (x + size > 9){
            return 0;
        }
        for (int i = 0; i < size;i++) {
            check = target.board[x + i][y];
            if(check != 0){
                return 0;
            }
        }
    }
    return 1;
}
void battleship::placeBoats(battleship &target, int x, int y, int size, int type, char direction){
    if (direction == 'n'){
        for (int i = 0; i < size;i++) {
            target.board[x][y + i] = type;

        }
    }
    if (direction == 'e'){
        for (int i = 0; i < size;i++) {
            target.board[x - i][y] = type;
            //remember the directions are flipped. So east means it's placing the boat spaces to the left of orgin
            //If it pisses you off too much I can change it
        }
    }
    if (direction == 's'){
        for (int i = 0; i < size;i++) {
            target.board[x][y - i] = type;
        }
    }
    if (direction == 'w'){
        for (int i = 0; i < size;i++) {
            target.board[x + i][y] = type;
        }
    }

}
void battleship::guessSpace(battleship & target){
    int x, y;
    do{
        cout << "Guess x";
        cin >> x;
        cout << "Guess y";
        cin >> y;
    } while (x > 9 || x < 0 || y > 9 || y < 0);
    chooseSpace(target, x, y);
}
void battleship::chooseSpace(battleship &target,int x, int y){
    if (target.board[x][y] > 2){ //not a miss or water space
        if (target.board[x][y] == 3){ //un-hit Carrier
            points++; //17 to win
            C++; //ship status
            cout << "You hit my Carrier";
            target.board[x][y] += 1; //changes to hit Carrier
        }
        else if (target.board[x][y] == 5){ //un-hit battleship
            points++;
            B++;
            cout << "You hit my Battleship";
            target.board[x][y] += 1;
        }
        else if (target.board[x][y] == 7){
            points++;
            D++;
            cout << "You hit my Destroyer";
            target.board[x][y] += 1;
        }
        else if (target.board[x][y] == 9){
            points++;
            S++;
            cout << "You hit my Submarine";
            target.board[x][y] += 1;
        }
        else if (target.board[x][y] == 11){
            points++;
            P++;
            cout << "You hit my Patrol Boat";
            target.board[x][y] += 1;
        }
        if (C == 5){ //if all spaces hit
            cout << "\nYou sunk my Carrier";
            C++; //C is now sunk
        }
        else if (B == 4){
            cout << "\nYou sunk my Battleship";
            B++;
        }
        else if (D == 3){
            cout << "\nYou sunk my Destroyer";
            D++;
        }
        else if (S == 3){
            cout << "\nYou sunk my Submarine";
            S++;
        }
        else if (P == 2){
            cout << "\nYou sunk my Patrol Boat";
            P++;
        }
    }
    else {
        cout << "miss";
        target.board[x][y] = 1;
    }
}
void battleship::printBoard(){
    cout << "\n\n   0|1|2|3|4|5|6|7|8|9" << endl;
    for(int i=0; i<10; i++)  //column loop
    {
        for(int j=0; j<10; j++)  //row loop
        {
            if(j==0)
            {
                cout << i << "  " ; //print row number
            }
            if (board[j][i] == 1){ //miss
                cout << 'O';
            }
            else if (board[j][i] == 3){ //carrier
                cout << 'C';
                //cout << ' ';
            }
            else if (board[j][i] == 4){
                cout << 'X';
            }
            else if (board[j][i] == 5){ //battleship
                cout << 'B';
                //cout << ' ';
            }
            else if (board[j][i] == 6){
                cout << 'X';
            }
            else if (board[j][i] == 7){ //destroyer
                cout << 'D';
                //cout << ' ';
            }
            else if (board[j][i] == 8){
                cout << 'X';
            }
            else if (board[j][i] == 9){ //submarine
                cout << 'S';
                //cout << ' ';
            }
            else if (board[j][i] == 10){
                cout << 'X';
            }
            else if (board[j][i] == 11){ //patrol boat
                cout << 'P';
                //cout << ' ';
            }
            else if (board[j][i] == 12){
                cout << 'X';
            }
            else {                      //water (empty space)
                cout << ' ';
            }
            if(j!=9){
                cout << "|";
            }
        }
        //2 is unused
        cout << endl;
    }
    cout << endl;
}
void battleship::onePlayer() {
    battleship player1(1);
    srand(time(0));
    battleship computer(2);
    Computer comp{};
    //player set's up computer's/other player board to mess with.
    player1.getCoordinates(computer, "Carrier", 5, 3);
    player1.getCoordinates(computer,"Battleship", 4, 5);
    player1.getCoordinates(computer,"Destroyer", 3, 7);
    player1.getCoordinates(computer,"Submarine", 3, 9);
    player1.getCoordinates(computer,"Patrol Boat", 2, 11);
    comp.cPlaceBoats(player1,5,3);
    comp.cPlaceBoats(player1,4,5);
    comp.cPlaceBoats(player1,3,7);
    comp.cPlaceBoats(player1,3,9);
    comp.cPlaceBoats(player1,2,11);
    while (computer.points != 17 || player1.points != 17) {
        player1.guessSpace(player1);
        player1.printBoard();
        comp.tryMove(computer);
        computer.printBoard();
    }
    if (player1.points == 17)
        cout << "\nPlayer 1 wins";
    else
        cout << "\ncomputer wins";

}
void battleship::twoPlayer() {
    battleship player1(1);
    battleship player2(2);
    player1.getCoordinates(player2, "Carrier", 5, 3);
    player1.getCoordinates(player2,"Battleship", 4, 5);
    player1.getCoordinates(player2,"Destroyer", 3, 7);
    player1.getCoordinates(player2,"Submarine", 3, 9);
    player1.getCoordinates(player2,"Patrol Boat", 2, 11);
    player2.getCoordinates(player1,"Carrier", 5, 3);
    player2.getCoordinates(player1,"Battleship", 4, 5);
    player2.getCoordinates(player1,"Destroyer", 3, 7);
    player2.getCoordinates(player1,"Submarine", 3, 9);
    player2.getCoordinates(player1,"Patrol Boat", 2, 11);
    while (player1.points != 17 || player2.points != 17) {
        player1.guessSpace(player1);
        player1.printBoard();
        player2.guessSpace(player2);
        player2.printBoard();
    }
    if (player1.points == 17)
        cout << "\nPlayer 1 wins";
    else
        cout << "\nPlayer 2 wins";
}
