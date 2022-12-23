'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
// movements.forEach(function(movement){
//   if(movement>0) console.log(`you deposited ${movement}`);
//   else if(movement<0) console.log(`you withdrawn ${Math.abs(movement)}`);
//   else console.log("no amt movement in your acc");
// })
// movements.forEach(function(movement,index,arr){
//   console.log(`${arr},fff`);
//   if(movement>0) console.log(`you deposited ${movement}`);
//   else if(movement<0) console.log(`you withdrawn ${Math.abs(movement)}`);
//   else console.log("no amt movement in your acc");
// })
const displayMovements=(movements,sort=false)=>{
  containerMovements.innerHTML="";
  const movs=sort?movements.slice().sort((a,b)=> a-b):movements;
  movs.forEach(function(mov,i){
    const type=mov>0?'deposit':'withdrawal';
   const html=` <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
          <div class="movements__value">${mov}</div>
        </div>

  `;
  containerMovements.insertAdjacentHTML('afterbegin',html);});
  
};

const calcDisplayBalance=(acc)=>{
  // reduce
  acc.balance=acc.movements.reduce((acc,val)=>acc+val,0);
  labelBalance.textContent=`${acc.balance} EUR`;
  };

const createUserNames=(accounts)=>{
  accounts.forEach(accs=>{
  // map
  accs.userName=accs.owner.toLowerCase().split(" ").map(name=>name[0]).join("");
  });
};
createUserNames(accounts);
console.log(accounts);

const calcDisplaySummary=(acc)=>{
  const income=acc.movements.filter(mov=> mov>0).reduce((acc,val)=> acc+val,0);
  labelSumIn.textContent=`${income}`;

  const Exit=acc.movements.filter(mov=> mov<0).reduce((acc,val)=> Math.abs(acc-val),0);
  labelSumOut.textContent=`${Exit}`;

  const interest=acc.movements.filter(mov => mov>0).map(deposit => (deposit*acc.interestRate)/100).filter(int => int>=1).reduce((acc,int) => acc+int,0);
  labelSumInterest.textContent= `${interest}`  ;
};

const updateUI=(acc)=>{
    displayMovements(account1.movements);
    calcDisplayBalance(account1);
    calcDisplaySummary(account1);
};

let currentAccount;

btnLogin.addEventListener("click",(e)=>{
  e.preventDefault();
  currentAccount=accounts.find((acc) => acc.userName=== inputLoginUsername.value);
  console.log(currentAccount);
  if(currentAccount && currentAccount.pin===Number(inputLoginPin.value) ){
    labelWelcome.textContent=`welcome ${currentAccount.owner}`;
    containerApp.style.opacity=100;
    inputLoginUsername.value=inputLoginPin.value="";
    // functioncalls
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click",(e)=>{
  e.preventDefault();
  const amount =Number(inputTransferAmount.value);
  const amountResv=accounts.find((acc)=> acc.userName===inputTransferTo.value);
  inputTransferAmount.value=inputTransferTo.value="";
  if(amount>0 && amountResv && currentAccount.balance>=amount && amountResv?.userName !== currentAccount.userName){
    currentAccount.movements.push(-amount);
    amountResv.movements.push(amount);
    // functioncalls
    updateUI(currentAccount);
  }
});

btnClose.addEventListener("click",(e)=>{
  e.preventDefault();
  if(inputCloseUsername.value===currentAccount.userName && Number(inputClosePin.value)===currentAccount.pin){
    const index=(acc)=>{
      acc.userName===currentAccount.userName;
    };
    accounts.splice(index,1);
    containerApp.style.opacity=0;
  }
  inputCloseUsername.value=inputClosePin.value="";
});

btnLoan.addEventListener("click",(e)=>{
  e.preventDefault();
  const amount=Number(inputLoanAmount.value);
  if(amount>0 && currentAccount.movements.some(mov => mov>= amount/10)){
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value="";
});

let sorted=false;
btnSort.addEventListener("click",(e)=>{
  e.preventDefault();
  displayMovements(currentAccount.movements,!sorted);
  sorted=!sorted;
});

// filter
const deposites=movements.filter((mov)=>{
  return mov>0;
});

// filter
const withdrew=movements.filter(mov=>mov<0);
console.log(withdrew);

// max value
const max =movements.reduce((acc,val,i)=>{

});

