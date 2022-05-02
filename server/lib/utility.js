const generateId = () => {
   var length = 10;
   var result = '';
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
         charactersLength));
   }
   return result;
}

const printBoard = (board) => {
   var string = "";
   for (let i = 0; i < 100; i++) {
      if (i % 9 == 0)
         string += " \n";
         console.log(string);
      string += board[i] + "  ";

   }
}

module.exports = { generateId, printBoard };