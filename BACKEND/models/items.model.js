module.exports = (sequelize, Sequelize) => {
    const Items = sequelize.define("items", {
  
     id: {
          type: Sequelize.STRING,
          primaryKey:true,
          allowNull: false
        },  
        reference: {
        type: Sequelize.STRING,
        allowNull: false
      },
      libelle: {
        type: Sequelize.STRING
        // allowNull defaults to true
      },    
      prix: {
          type: Sequelize.STRING,
          allowNull: false
      }
   });
  return Items;
  };
  