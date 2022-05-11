const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false

    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    description:{
      allowNull: false,
      type: DataTypes.STRING
    },
    released:{
      type: DataTypes.DATEONLY
    },
    rating:{
      type: DataTypes.FLOAT
    },
    platforms:{
    
      allowNull: false,
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    }
    // genres: {
    //   type: DataTypes.ARRAY(DataTypes.JSON),
    //    defaultValue: [],
    // }
      
    
  });
};
