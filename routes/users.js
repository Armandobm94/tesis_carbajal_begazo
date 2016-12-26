var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var ObjectId = require("mongojs").ObjectId;
var db = mongojs("mongodb://chiqui:chiqui@ds145148.mlab.com:45148/chiquidb", ["drinks", "users"]);
var randomstring = require("randomstring");


router.get('/all', (req, res) => {
  db.drinks.find((err, docs) => {
    res.send(docs);
  });
});

router.post('/adddrink', (req, res) => {
  var _id = req.body.id;
  var drink = req.body.drink;
  db.drinks.findOne({ _id: ObjectId(drink) }, (err, dr) => {
    db.users.update({ _id: ObjectId(_id) }, { $set: { drink: dr, state: 1 } }, (err, result) => {
      res.send(result);
    });
  });
});

router.post("/login", (req, res) => {
  var user = req.body.user;
  var pwd = req.body.pwd;
  db.users.findOne({ user: user, pwd: pwd }, (err, user) => {
    if (!user) {
      res.send({ cod: 0, msg: "Usuario no registrado, comunicarse con el Ing Miguel Bernedo para su autorizacion." });
    } else {
      if (user.state === 1) {
        res.send({ cod: 1, page: 1, msg: "Bienvenido : " + user.name + " mira la lista de tragos que llevaran cada chiqui.", name: user.name, id: user._id, img: user.img });
      } else {
        res.send({ cod: 1, page: 2, msg: "Bienvenido : " + user.name + " escoge la botella que piesas llevar el 30.", name: user.name, id: user._id, img: user.img });
      }
    }
  });
});

router.get("/allusers", (req, res) => {
  db.users.find({ state: 1 }, { name: 1, "drink.name": 1, "drink.img": 1 }, (err, docs) => {
    res.send(docs);
  });
});

router.post("/addusers", (req, res) => {
  var users = [
    {
      name: "Diego Renteria",
      user: "drenteria",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/164581.jpg",
      state: 2
    },
    {
      name: "Diego Rojas",
      user: "drojas",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/168468.jpg",
      state: 2
    },
    {
      name: "Sebastian Rey",
      user: "srey",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/177625.jpg",
      state: 2
    },
    {
      name: "Miguel De la Torre",
      user: "mtorre",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/168468.jpg",
      state: 2
    },
    {
      name: "Jose Luis Granados",
      user: "jgranados",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-9/12274480_1171044926241110_5295347446077022513_n.jpg?oh=3ae78ea1be10782848c4ae370725f726&oe=58E7C652",
      state: 2
    },
    {
      name: "Armando Begazo",
      user: "abegazo",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/183405.jpg",
      state: 2
    },
    {
      name: "Miguel Bernedo",
      user: "mbernedo",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/157209.jpg",
      state: 2
    },
    {
      name: "Christian Valencia",
      user: "cvalencia",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-9/259945_2063704080234_5728216_n.jpg?oh=e92f4122057407ad701a197209d6eef3&oe=58F3A7B1",
      state: 2
    },
    {
      name: "Anthony Dextre",
      user: "adextre",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-9/12006106_10207702116498112_5155125007053126956_n.jpg?oh=c6beb282dac0b62da5257ca3f45bbb16&oe=58D8661D",
      state: 2
    },
    {
      name: "Diandra Sanchez",
      user: "dsanchez",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-9/14680577_10208470341650880_5768653489564199336_n.jpg?oh=be8d888267e6abe126de8c145075e1b9&oe=58D73FF0",
      state: 2
    },
    {
      name: "Claudia Martinez",
      user: "cmartinez",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-9/14732412_10209860401202707_2151036888054841052_n.jpg?oh=72578e623f920c22a7333872d1f65e31&oe=58E044A0",
      state: 2
    },
    {
      name: "Carlos Chacchi",
      user: "cchacchi",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-0/p206x206/10653646_10152266735650766_3839259479635758962_n.jpg?oh=d59dac985a41b2bd57c0c7d4390bad15&oe=58F164F3",
      state: 2
    },
    {
      name: "Josep Aliaga",
      user: "jaliaga",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-0/p206x206/13770295_1320386584638244_7053609256074835219_n.jpg?oh=824f1360395a87f29cc001f50df4ff0a&oe=58E5503D",
      state: 2
    },
    {
      name: "Jhonatan Anaya",
      user: "janaya",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-9/10525619_10203414951286401_3157309915068300721_n.jpg?oh=cbccbb382590cc74a99117e4803d8f21&oe=5922B22F",
      state: 2
    },
    {
      name: "Christopher Fernandez",
      user: "cfernandez",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/178333.jpg",
      state: 2
    },
    {
      name: "Gino Begazo",
      user: "gbegazo",
      img: "https://scontent.fgig1-1.fna.fbcdn.net/v/t1.0-9/12193524_10207080877155516_3742180351197639912_n.jpg?oh=2bb490124129ce11d99579d80a345101&oe=58E9EEB1",
      state: 2
    },
    {
      name: "Augusto Espinoza",
      user: "aespinoza",
      img: "http://oliva.ulima.edu.pe/imagenes/fotos/178420.jpg",
      state: 2
    }
  ];

  for (var i = 0; i < users.length; i++) {
    users[i].pwd = getRandomCode();
    db.users.insert(users[i], (err, use) => {
      console.log(use);
    })
  }
});

function getRandomCode() {
  return randomstring.generate({
    length: 5,
    charset: 'alphanumeric',
    capitalization: "uppercase"
  });
}

module.exports = router;
