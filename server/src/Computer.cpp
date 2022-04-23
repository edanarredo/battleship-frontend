#include "Computer.h"
#include <iostream>
#include <algorithm>


using namespace std;
int Computer::cPlaceBoats(battleship &target, int size, int type) {
    int r; //rand
    int x = 0;
    int y = 0;
    char d; //direction
    int attempts = 0;
    while (attempts < 1000) {
        r = rand() % 10; //each direction equally likely
        if (r < 2){
            d = 'n';
        }
        else if (r < 4){
            d = 'e';
        }
        else if (r < 6){
            d = 's';
        }
        else{
            d = 'w';
        }
        switch (size){//coordinate orgin is generated and rand range is based on boat size
            case 5:
                if (d == 'n') {
                    x = rand() % 5;
                    y = rand() % 10;
                }
                else if (d == 'e'){
                    x = rand() % 10;
                    y = rand() % 5;
                }
                else if (d == 's') {
                    x = rand() % 5 + 5;
                    y = rand() % 10;
                }
                else{
                    x = rand() % 10;
                    y = rand() % 5 + 5;
                }
                break;
            case 4:
                if (d == 'n') {
                    x = rand() % 6;
                    y = rand() % 10;
                }
                else if (d == 'e'){
                    x = rand() % 10;
                    y = rand() % 6;
                }
                else if (d == 's') {
                    x = rand() % 6 + 4;
                    y = rand() % 10;
                }
                else {
                    x = rand() % 10;
                    y = rand() % 6 + 4;
                }
                break;
            case 3:
                if (d == 'n') {
                    x = rand() % 7;
                    y = rand() % 10;
                }
                else if (d == 'e'){
                    x = rand() % 10;
                    y = rand() % 7;
                }
                else if (d == 's') {
                    x = rand() % 7 + 3;
                    y = rand() % 10;
                }
                else {
                    x = rand() % 10;
                    y = rand() % 7 + 3;
                }
                break;
            case 2:
                if (d == 'n') {
                    x = rand() % 8; //should be between 0 and 6
                    y = rand() % 10;
                }
                else if (d == 'e'){
                    x = rand() % 10;
                    y = rand() % 8;
                }
                else if (d == 's') {
                    x = rand() % 8 + 2; //should be between 2 and 9
                    y = rand() % 10;
                }
                else {
                    x = rand() % 10;
                    y = rand() % 8 + 2;
                }
        }
        if (!target.checkBoats(target, x, y, size, d)){//checks if boat will fit
            attempts++;//if not starts it over again
            continue;
        }
        target.placeBoats(target , x, y, size, type, d);//places boat
        return 0;
    }
    return -1;
}
int Computer::tryMove(battleship &target){
    int attempts = 0, x, y;
    if (target.C == 6){ //if ship is sunk, ship hit's are removed from vector
        for (int i = 0; i < 5; i++){
            shots.pop_back();
        }
    }
    else if (target.B == 5){
        for (int i = 0; i < 4; i++){
            shots.pop_back();
        }
    }
    else if (target.D == 4 || target.S == 4){
        for (int i = 0; i < 3; i++){
            shots.pop_back();
        }
    }
    else if (target.P == 3){
        for (int i = 0; i < 2; i++){
            shots.pop_back();
        }
    }
    while(attempts < 100){
        if (tryAdjacent(target, x, y) != 0) { //attempt to hit around a previous hit
            x = (rand() % 10); //random shot if not
            y = (rand() % 10);
        }
        if (x < 0 || x > 9 || y < 0 || y > 9){ //makes sure coordinate is in range (try adjacent does some weird stuff)
            continue;
        }
        switch (target.board[x][y])
        {
            case 0:
                target.chooseSpace(target, x , y ); //water space that ai will make move on
                shots.emplace_back(x, y);// stores shot (apparent later)
                return 0;
            case 1 : //miss, ai does not make the same mistake twice
                attempts++;
                reverse(shots.begin(),shots.end()); //in case of bamboozle (apparent later)
                reverseCheck++;
                break;
            case 2: //unused (was hit)
                attempts++;
                break;

            default:
                if (target.board[x][y] > 2 && target.board[x][y] % 2 == 1
                    && target.board[x][y] < 13){ //aka unhit ship space
                    target.chooseSpace(target, x , y);
                    shots.emplace_back(x, y);//stores shot as well
                    reverseCheck = 0; //no longer possible to double reverse (apparent later)
                    return 0;
                }
                else{ //hit ship space (was also an off the grid space but stupid array gives those a value of 0 too)
                    attempts++;
                    reverse(shots.begin(),shots.end());
                    reverseCheck++;
                    break;
                }
        }
    }
    return -1;
}
int Computer::tryAdjacent(battleship target, int &x, int &y) { //this took me 8 hours to figure out
    if (!shots.empty()){
        int r = rand() % 10;
        x = shots.back().first; //gets previous shot
        y = shots.back().second;
        if (target.board[x][y] != 1) { //if last shot was not a miss
            if (shots.size() == 1) { //if only one shot to go off of
                if (r < 2){
                    x++; //shoot in random direction
                }
                else if (r < 4){
                    x--;
                }
                else if (r < 6){
                    y++;
                }
                else{
                    y--;
                }
                return 0;
            }
            else {
                if (reverseCheck > 1) { //if in the middle of bamboozle act like only last hit is relevant.
                    if (r > 2) {
                        x++;
                    } else if (r > 4) {
                        x--;
                    } else if (r > 6) {
                        y++;
                    } else {
                        y--;
                    }
                }
                else if (shots.rbegin()[1].first == x) { //if last two shots are horizontal/vertical
                    if (y == 0 || y == 9){
                        reverse(shots.begin(),shots.end());
                        //if last shot was at edge, reverse and look at the first two shots in queue
                        y = 11;
                        return 0; //also restart the process
                    }
                    y += y - shots.rbegin()[1].second; //shoot next space in line (hit streak)
                    return 0;
                }
                else if (shots.rbegin()[1].second == y) {
                    if (x == 0 || x == 9){
                        reverse(shots.begin(),shots.end());
                        x = 11;
                        return 0;
                    }
                    x += x - shots.rbegin()[1].first;
                    return 0;
                }
            }
        }
        else{ //if shot missed
            shots.pop_back(); //remove miss from queue

            if (shots.size() > 1){//If on shot streak (at least two shot's by each other) and it ran into water.
                if (reverseCheck > 1){
                    if (r > 2){
                        x++;
                    }
                    else if (r > 4){
                        x--;
                    }
                    else if (r > 6){
                        y++;
                    }
                    else{
                        y--;
                    }
                }
                else {
                    reverse(shots.begin(), shots.end());//Then ai will turn around and get the rest of ship
                    reverseCheck++;
                    //However in the case the row of hits is on two different ships, it could get turned around more
                    //than once. To prevent it from being stuck in a loop, if it reverses at least twice it takes shot
                    //on random adjacent spots until it finds a new row. Once one ship is sunk the ai will no longer
                    //reverse.
                }
            }
            else{
                x = 11; //tries again if there are still hit ships that are not sunk
            }
            return 0;
        }
    }
    return 1;
}