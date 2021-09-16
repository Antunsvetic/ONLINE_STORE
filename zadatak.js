const readline = require("readline");


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});



/////////////////////////////////////
// Varijable za sve

let proizvodi = [];
let cartItems = [];
let racun = [];
let poljeRacuna = [];
let zbroj = 0;
////////////////////////////////


/**************PROIZVODI******************/

function add() {
  console.clear();
  console.log("PROIZVODI");
  console.log("_________________________________________________________________________________");
  rl.question("Dodavanje novog proizvoda ----> ENTER \nPrelazak na košaricu      ----> 'END'\n --> ", odgovor => {
    if (odgovor === "END") {
      console.clear();
      cart();
    } else {
      console.log("_________________________________________________________________________________");
      rl.question('SKU: ', (sku) => {
        console.log("_________________________________________________________________________________");
        rl.question("NAME: ", (name) => {
          console.log("__________________________________________________________________________________");
          rl.question("QUANTITY: ", quant => {
            console.log("_________________________________________________________________________________");
            rl.question("PRICE: ", price => {

              noviProizvod = {
                sku: sku,
                name: name,
                quant: quant,
                price: price
              };

              proizvodi.push(noviProizvod);
              console.log(proizvodi);

              console.clear();

              add();
            })
          })
        })

      });
    }
  })

}

add();

/**********KOŠARICA*************/

function cart() {
  console.log("KOŠARICA");
  console.log("_________________________________________________________________________________");
  rl.question("Dodaj proizvod u košaricu                  ----> ENTER\nNapravi račun                              ----> 'CHECKOUT'\nIspis računa                               ----> 'END'\nIzbriši proizvod iz košarice               ----> 'REMOVE' \n --> ", odgovor => {
    if (odgovor === "END") {
      console.clear();
      end();
    } else if (odgovor === "CHECKOUT") {

      checkout();
      console.clear();
      console.log("Uspješno dodani proizvod u košaricu!");
      cart();

    } else if (odgovor === 'REMOVE'){
      console.clear();
      remove();
    } else {
      console.log("Dostupni proizvodi: ");
      console.log(proizvodi);
      console.log("_________________________________________");
      rl.question("SKU: ", sku => {

        rl.question("QUANTITY: ", quant => {

          const noviCartItem = {
            sku: sku,
            quant: quant
          }
          cartItems.push(noviCartItem);


          proizvodi.forEach(proizvod => {
            if (proizvod.sku === noviCartItem.sku) {

              let noviRacun = {
                name: proizvod.name,
                quant: noviCartItem.quant,
                price: proizvod.price,
                total: proizvod.price * noviCartItem.quant,
                totalZbroj: zbroj + (proizvod.price * noviCartItem.quant)
              }
              zbroj = zbroj + (proizvod.price * noviCartItem.quant);
              racun.push(noviRacun);

              console.clear();
            }
          });

          cart();
        })

      })
    }
  })

}

/*******CHECKOUT******/

function checkout() {
  poljeRacuna.push(racun);

  racun = [];
  zbroj = 0;
}

/****REMOVE****/

function remove() {

  console.log("________________________");
  rl.question("Vrati se na košaricu ---> 'CART'\nObrisati proizvod      ----> ENTER\n --> ", odgovor => {
    if(odgovor === "CART"){
      console.clear();
      cart();
    } else {
      console.log("CARTITEMS: ");
      console.log(cartItems);

      rl.question("SKU: ", sku =>{

            const removeIndex = cartItems.findIndex( x => x.sku === sku );
            cartItems.splice( removeIndex, 1 );
            remove();
        })
      }

    remove();
  })
  };



/*******END********/
function end() {

  console.clear()
  console.log("RAČUNI: ");
  console.log("________________________________");


  for (x = 0; x < poljeRacuna.length; x++) {
    var total = 0;

    poljeRacuna[x].forEach(item => {
      console.log(item.name + " " + item.quant + " x " + item.price + " = " + item.total);
      total = total + (item.quant * item.price);

    })
    console.log("TOTAL: " + total);
      console.log("---------------------------------------");
  }

  console.log("_________________________________________")
  rl.question("Za povratak na košaricu upišite 'BACK'\n --> ", odgovor => {
    if(odgovor === "BACK"){
      console.clear();
      cart();
    }
  })
}
