const { weekdays } = require("moment");
const getCalender  = require("./calender");

require("dotenv").config();
const express = require("express"),
    cors = require("cors"),
    { sequelize, Teachers, Schedules } = require("./db"),
    moment = require("moment"),
    { Op } = require("sequelize"),
    app = express();

app.use(cors()) 

app.use(express.static("public"));

app.set("views",__dirname + "/views");


app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

const getEventCount = async (startdate, enddate,teacherId) => {

    let queryObj = {
        attributes: [
            "date",
            [sequelize.fn('COUNT', sequelize.col('id')), "total_task"]
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
    }
    else if (viewBy.toLowerCase() === "week") {

        startdate = moment(targetDate).startOf('week').format();
        enddate = moment(targetDate).endOf('week').format();
    }
    else if (viewBy.toLowerCase() === "month") {
        startdate = moment(targetDate).startOf('month').format();
        enddate = moment(targetDate).endOf('month').format();
    }
    else {
        res.send("404");
    }
    let result = await getEventCount(startdate, enddate,req.query.teacherId)
    res.send(JSON.stringify(result));
})

app.get("/getCalender",(req,res)=>{
    let {month,year} = req.query;
    let result = getCalender(year,month);
    if(!month && !year){
        month = moment(moment(),"YYYY/MM/DD").format("MM")
        year =  moment(moment(),"YYYY/MM/DD").format("YYYY")
    }
    let monthList = ["January","February","March","April","May","June","July","August","September","October","November","December"]
    monthname = monthList[Number(month) -1]
    return res.json({result,month,year,monthname});

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
    let { teacherId, batch, date } = req.body;
    let check = await Schedules.findAll({
        where: {
            "teacherId": teacherId,
            "date": moment(date).format()
        }
    });
    if (check.length > 0) {
        return res.json({"response":"Teacher already has a schedule on the given date"});
    }
    else {
        let result;
        try {
            result = await Schedules.create({ "batch": batch, "teacherId": teacherId, "date": moment(date).format() })
        }
        catch (e) {
            console.log(e);
            res.json({"response":"Some error occured"})
        }
        return res.json(result);
    }


})


app.get("/",async (req,res)=>{
    res.sendFile(__dirname + "/views/index.html");

})

app.get("/getTeachers",async(req,res)=>{

    let teachers = await Teachers.findAll({
        attributes:[
            "id",
            "name"
        ]
    });
    return res.json(teachers);
})


const server_port = process.env.PORT || 5000 || 80,
    server_host = "0.0.0.0" || "localhost";


app.listen(server_port, server_host, () => {
    console.log(`Server on ${server_host}:${server_port}`)

});

