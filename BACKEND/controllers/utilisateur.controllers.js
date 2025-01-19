const { ACCESS_TOKEN_SECRET } = require("../config.js");

const jwt = require('jsonwebtoken');

function generateAccessToken(user) {
  return jwt.sign(user, ACCESS_TOKEN_SECRET, { expiresIn: '1800s' });
}

const db = require("../models");
const Utilisateurs = db.utilisateurs;
const Op = db.Sequelize.Op;

// Find a single Utilisateur with an login
exports.login = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
    Utilisateurs.findOne({
      where: {
        [Op.and]: {
          login: utilisateur.login,
          pass: utilisateur.password,
        }
      }
    })
      .then(data => {
        if (data) {
          const user = {
            id: data.id,
            name: data.nom,
            email: data.email
          };

          let accessToken = generateAccessToken(user);
          res.setHeader('Authorization', `Bearer ${accessToken}`);
          res.send(data);
        } else {
          res.status(404).send({
            message: `Cannot find Utilisateur with login=${utilisateur.login}.`
          });
        }
      })
      .catch(err => {
        res.status(400).send({
          message: "Error retrieving Utilisateur with login=" + utilisateur.login
        });
      });
  } else {
    res.status(400).send({
      message: "Login ou password incorrect"
    });
  }
};

exports.addUser = (req, res) => {
  const utilisateur = {
    login: req.body.login,
    password: req.body.password,
    nom: req.body.nom,
    prenom: req.body.prenom,
    mail: req.body.mail,
  };

  // Test
  let pattern = /^[A-Za-z0-9]{1,20}$/;
  if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
    Utilisateurs.findOne({
      where: {
        login: utilisateur.login,
      }
    })
      .then(data => {
        if (!data) {
          Utilisateurs.create(utilisateur);
          res.send(data);
        }
        else {
          res.status(400).send({
            message: "Login ou password incorrect"
          });
        }
      })
  }
};
  exports.updateUser = (req, res) => {
    const utilisateur = {
      login: req.body.login,
      password: req.body.password,
      nom: req.body.nom,
      prenom: req.body.prenom,
      mail: req.body.mail,
      id: req.body.id
    };

    // Test
    let pattern = /^[A-Za-z0-9]{1,20}$/;
    if (pattern.test(utilisateur.login) && pattern.test(utilisateur.password)) {
      Utilisateurs.findOne({where:{id:utilisateur.id}}).then(data=>{
        if(data){
          data.password = utilisateur.password;
          data.nom = utilisateur.nom;
          data.prenom = utilisateur.prenom;
          data.mail = utilisateur.mail;
           data.save();
        }
      })
    };
  };

  exports.getUser = (req, res) => {
    Utilisateurs.findOne({where:{id:req.query.id}}).then(data=>{
      if(data){
        res.send(data);
      }
    })
  };
