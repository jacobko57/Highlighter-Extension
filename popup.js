const matches = document.querySelectorAll("p");

console.log("Hello World!");

if (matches) {
  console.log("Matches is not null")
  console.log("Matches length is: " + matches.length);
  for (let i = 0; i < matches.length; i++) {
    console.log("Printing");
  }
} else {
  console.log("Matches is null");
}

console.log("I make it to the end")