require("dotenv").config();
const express = require("express"),
    cors = require("cors"),
    { sequelize,Teachers, Schedules } = require("./db"),
    moment = require("moment"),
    { Op } = require("sequelize"),
    app = express();


app.get("/", async (req, res) => {
    let currentDate = moment()
    let startdate = moment(moment()).startOf('month').format();
    let enddate = moment(moment()).endOf('month').format();
    console.log(startdate, enddate);
    var result = await Schedules.findAll({
        attributes:[
            "date",
            [sequelize.fn('COUNT',sequelize.col('id')),"total task" ]
        ],
        where: {
            date: {
                [Op.gte]: startdate,
                [Op.lte]: enddate
            }
        },
        group:[
            ["date"]
        ],
        order: [
            ["date", "ASC"]
        ]
    });
    res.send(JSON.stringify(result));
})





const server_port = process.env.PORT || 5500 || 80,
    server_host = "0.0.0.0" || "localhost";


app.listen(server_port, server_host, () => {
    console.log(`Server on ${server_host}:${server_port}`)

});

