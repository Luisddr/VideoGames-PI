const { DataTypes, UUID } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
    sequelize.define('genre',{
    // ID: {
    //     type: DataTypes.UUID,
    //   defaultValue: DataTypes.UUIDV4,
    //   primaryKey: true
    // },
    name: {
        type: DataTypes.STRING,
        unique: true
    }
    })
}