const { weekdays } = require("moment");

require("dotenv").config();
const express = require("express"),
    cors = require("cors"),
    { sequelize, Teachers, Schedules } = require("./db"),
    moment = require("moment"),
    { Op } = require("sequelize"),
    app = express();

app.use(cors())
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const getEventCount = async (startdate, enddate,teacherId) => {

    let queryObj = {
        attributes: [
            "date",
            [sequelize.fn('COUNT', sequelize.col('id')), "total task"]
        ],

        where: {
            date: {
                [Op.gte]: startdate,
                [Op.lte]: enddate
            }
        },
        group: [
            ["date"]
        ],
        order: [
            ["date", "ASC"]
        ]
    }
    if(teacherId){
        queryObj.where["teacherId"] = teacherId; 
    };
    var result = await Schedules.findAll(queryObj);

    return result;
}


app.get("/getTaskCount", async (req, res) => {
    let viewBy = req.query.viewBy
    let startdate = "", enddate = "";
    let date = req.query.date
    let targetDate;
    if (!date) {
        targetDate = moment()
    }
    else {
        date = new Date(date)
        targetDate = moment(date)
    }
    if (!viewBy || viewBy.toLowerCase() === "day") {
        startdate = moment(targetDate).format();
        enddate = startdate;
        console.log(startdate, enddate);
    }
    else if (viewBy.toLowerCase() === "week") {

        startdate = moment(targetDate).startOf('week').format();
        enddate = moment(targetDate).endOf('week').format();
        console.log(startdate, enddate);
    }
    else if (viewBy.toLowerCase() === "month") {
        startdate = moment(targetDate).startOf('month').format();
        enddate = moment(targetDate).endOf('month').format();
        console.log(startdate, enddate);
    }
    else {
        res.send("404");
    }
    let result = await getEventCount(startdate, enddate,req.query.teacherId)
    res.send(JSON.stringify(result));
})


app.get("/alltask", async (req, res) => {
    let date = req.query.date
    date = moment(date).format()
    let queryObject = {
        attributes: [
            "batch",
            "date"
        ],
        include: [
            {
                model: Teachers,
                attributes: [
                    "name"
                ],
                required: true,
            }
        ],
        where: {
            date: {
                [Op.eq]: date
            }
        },
        order: [
            ["date"]
        ]
    }
    let teacherId = req.query.teacherId
    if(teacherId){
        queryObject.where["teacherId"] = teacherId
    }
    let result = await Schedules.findAll(queryObject)

    return res.send(JSON.stringify(result));
})

app.post("/scheduleTask", async (req, res) => {
    console.log(req.body);
    let { teacherId, batch, date } = req.body;
    let check = await Schedules.findAll({
        where: {
            "teacherId": teacherId,
            "date": moment(date).format()
        }
    });
    if (check.length > 0) {
        return res.send("Teacher already has a schedule on the given date");
    }
    else {
        let result;
        try {
            result = await Schedules.create({ "batch": batch, "teacherId": teacherId, "date": moment(date).format() })
        }
        catch (e) {
            console.log(e);
            res.send("Some error occured")
        }
        console.log(result)
        return res.send(JSON.stringify(result));
    }


})




const server_port = process.env.PORT || 5000 || 80,
    server_host = "0.0.0.0" || "localhost";


app.listen(server_port, server_host, () => {
    console.log(`Server on ${server_host}:${server_port}`)

});

