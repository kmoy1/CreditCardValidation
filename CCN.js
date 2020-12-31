//Valid CCN
const validtest = [4,5,3,9,6,8,9,8,8,7,7,0,5,7,9,8];
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// Invalid CCN
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Tests
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

function calcLuhnSum(arr){
  luhnsum = arr[arr.length-1];
  double = true;
  for (let i = arr.length - 2; i >= 0; i--){
    let digit = arr[i];
    if (double){
      digit = digit * 2;
      if (digit > 9){
        digit = digit - 9;
      }
    }
    luhnsum = luhnsum + digit;
    double = !double;
  }
  return luhnsum;
}

// Add your functions below:
function validateCred(arr){
  //Check digit = arr[arr.length-1];
  let luhnsum = calcLuhnSum(arr);
  return luhnsum % 10 == 0;
}


function findInvalidCards(cardNums){
  invalids = []
  cardNums.forEach(card=>{
    if (!validateCred(card)) invalids.push(card);
  })
  return invalids;
}

const COMPANIES = {
  3: 'Amex',
  4: 'Visa',
  5: 'MasterCard',
  6: 'Discover'
};

function idInvalidCardCompanies(invalids){
  let comps = new Set();
  invalids.forEach(card =>{
    if (!(card[0] in COMPANIES)){
      console.log('Company not found.');
    }
    else{
      comps.add(COMPANIES[card[0]]);
    }
  })
  return comps;
}
// Validations on mysteries
// batch.slice(10).forEach(mysteryCard => {
//   if (validateCred(mysteryCard) == true){
//     console.log("Valid");
//   }
//   else{
//     console.log("Invalid");
//   }
// })

//Invalid card issuers
// console.log(idInvalidCardCompanies(findInvalidCards(batch)));

//Convert credit card number (string) to array of digits
function sToArr(CCNString){
  return CCNString.split('').map(function(digit) {return +digit});
  //Unary plus (+) converts string to number.
}

//console.log(sToArr('1234567890'));

//Transform invalid CCN (digit array) to valid CCN (digit array)
function transform(invalidCCN){
  //If num digits EVEN, next digit added (to front) will NOT be doubled. 
  if (validateCred(invalidCCN)){
    console.log("Your credit card number is already valid.");
    return invalidCCN;
  }
  else{
    let invalidLuhn = calcLuhnSum(invalidCCN);
    let double = invalidCCN.length % 2 == 0? false : true;
    if (double){
      for (let i = 0; i < 10; i++){
        let doubled = (i * 2 > 9)? i * 2 - 9 : i * 2;
        if ((invalidLuhn + doubled) % 10 == 0){
            return [i].concat(invalidCCN);
          }
      }
    }
    else{
      for (let i = 0; i < 10; i++){
        if ((invalidLuhn + i) % 10 == 0){
            return [i].concat(invalidCCN);
          }
      }
    }
  }
}

// console.log(calcLuhnSum(invalid3));
// console.log(invalid3.length);
// console.log(validateCred(transform(invalid5)));
