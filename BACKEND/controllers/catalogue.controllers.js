
const db = require("../models");
const Items = db.items;
const Op = db.Sequelize.Op;

exports.get = (req, res) => {
	Items.findAll({

	}).then(data=>{
		res.setHeader('Content-Type', 'application/json');
      
		res.send(data);
	})
   };    

