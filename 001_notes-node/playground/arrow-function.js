const square = x => x * x;
console.log(square(9));

const user = {
  name: 'Phil',
  sayHi: () => {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  },
  // use the concise method syntax for this and `arguments` binding
  sayHiAlt() {
    console.log(arguments);
    console.log(`Hi. I'm ${this.name}`);
  }
};

console.log('sayHi: ', user.sayHi(1, 2, 3));
console.log('sayHiAlt: ', user.sayHiAlt(1, 2, 3));
