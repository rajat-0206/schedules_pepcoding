require("dotenv").config();
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(process.env.DB, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});

const connection = async () => { 
    await sequelize.authenticate();
    console.log("DB connected successfully");
};


const sync = async () => {
    try{
    let isSynced = await sequelize.sync({force:false});
    if(isSynced){
        console.log("DB synced")
    }
    }
    catch(e){
        console.log(e);
        console.log("Databases are not synced");
    }
}


const Teachers = sequelize.define("Teachers", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement:true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    connection,
    freezeTableName: true
})



const Schedules =  sequelize.define("Schedules",{
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },
    batch : {
        type:DataTypes.STRING,
        allowNull:false,
    },
    date : {
        type:DataTypes.DATEONLY,
        allowNull:true,
        defaultValue:DataTypes.NOW
    },
    teacherId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:"Teachers",
            key:"id",
        }
    }
},{
    connection,
    freezeTableName:true
})


connection()
sync()

if(!connection){
    console.log("Unable to connect to database");
}
if(!sync){
    console.log("Unable to sync DBs");
}

module.exports = {sequelize,Teachers,Schedules}