## Task Scheduler

Project made by <a href="https://itsrajat.xyz">Rajat Shrivastava</a>

<br>
<img src="https://img.shields.io/badge/MYSQL-4EA94B?style=for-the-badge&logo=mysql&logoColor=white" /><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" /><img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node-dot-js&logoColor=white" /><img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white" />

<br />

A web app to schedule task for different teachers. APIs are made in express and frontend is made using HTML,CSS and Javascript. MySQL is the database used.



## Screenshot (s)

<a href="https://ibb.co/1T8FnJ9"><img src="https://i.ibb.co/hVD3M1K/instruction.jpg" alt="instruction" border="0"></a>
<center>Instruction</center>
<br>
<a href="https://ibb.co/mRLqhVc"><img src="https://i.ibb.co/S6hnV43/main-page.jpg" alt="main-page" border="0"></a>
<center>Landing Page</center>
<br>
<a href="https://ibb.co/12Pq2hZ"><img src="https://i.ibb.co/vzTPzg1/add-schedule.jpg" alt="add-schedule" border="0"></a>
<center>Add Schedules</center>
<br>
<a href="https://ibb.co/dG3Mg9K"><img src="https://i.ibb.co/5Bz4FDc/month-view.jpg" alt="month-view" border="0"></a>
<center>Month wise view</center>
<br>
<a href="https://ibb.co/Lzc8hsT"><img src="https://i.ibb.co/QFTfjxW/task.jpg" alt="task" border="0"></a>
<center>Day wise view</center>
<br>
<a href="https://ibb.co/gRmtxs9"><img src="https://i.ibb.co/FDm8FG3/actual.jpg" alt="actual" border="0"></a>
<center>Actual Task</center>
<br>

## Installation and Setup Instructions

<ol>
<li> Clone down this repository using following command.</li>

```
git clone https://github.com/rajat-0206/schedules_pepcoding
```

<li> You will need `node` and `npm` installed globally on your machine.  Install it from <a href="https://node.org/downloads">here</a>.</li>

<li> Install the required package using following command.</li>

```
npm install
    
```
  
<li>Start server using following command</li>

    
```
    npm start
    
```

<li>Visit the following url to browse web app.</li>

`localhost:5000`
</ol>


## REST API DOCUMENTATION

<p>Documentation for the rest apis start here. 
</p>

## Schedule task

### Request

`POST https://scheduler-pep.herokuapp.com/scheduleTask`

    {
    "teacherId":<teacherId>,
    "batch":"< Some task / schedule  or batch>",
    "date":"<date>"
}

### Response
```
{
  "id": <task id>,
  "batch": "< Some task / schedule  or batch",
  "teacherId": <teacherId>,
  "date": "<date>",
  "updatedAt": "<update time>",
  "createdAt": "<creation time>"
}
```

## Get task by Month

### Request

`GET https://scheduler-pep.herokuapp.com/getTaskCount?viewBy=month&date=2021/06/05&teacherId=1`

<p> Here all the parameters are optional. Default values are following:</p>
<ol>
<li>viewBy : day</li>
<li>date : today's Date </li>
<li>teacherId : null || Tasks for all teachers will comes</li>
</ol>
    
### Response
```
[
  {
    "date": "<date>",
    "total_task": <task count>
  }
]
```

## Get task by week

### Request

`GET https://scheduler-pep.herokuapp.com/getTaskCount?viewBy=week&date=2021/06/05&teacherId=1`

<p> Tasks for the week in which given date belongs will come.</p>

### Response
```
[
  {
    "date": "<date>",
    "total_task": <task count>
  }
]
```


## Get task by Month

### Request

`GET https://scheduler-pep.herokuapp.com/getTaskCount?viewBy=month&date=2021/06/05&teacherId=1`

<p> Tasks for the month in which given date belongs will come.</p>

### Response
```
[
  {
    "date": "<date>",
    "total_task": <task count>
  }
]
```

## Get Calender 

### Request

`GET https://scheduler-pep.herokuapp.com/getCalender?year=2021&month=06`


### Response
```
{
  "result": [
    {
      "date": "2021-05-31",
      "dayOfMonth": 31,
      "isCurrentMonth": false
    },
    {
      "date": "2021-06-01",
      "dayOfMonth": 1,
      "isCurrentMonth": true
    },
    {
      "date": "2021-06-02",
      "dayOfMonth": 2,
      "isCurrentMonth": true
    },

    ...Rest of the date values

}
```

## Get all task of the day

### Request

`GET https://scheduler-pep.herokuapp.com/alltask?date=2021/05/06`

<p>If no date is given the task for current date will come.</p>

### Response
```
[
  {
    "batch": "<some task / schedule or batch>",
    "date": "<some date>",
    "Teacher": {
      "name": "<teacher name>"
    }
  }
]
```

## Get all teachers

### Request

`GET https://scheduler-pep.herokuapp.com/getTeachers`

<p>If no date is given the task for current date will come.</p>

### Response
```
[
  {
    "id": <teacherId>,
    "name": "<teacher Name>"
  }
]
```

## INSTRUCTION TO USE

 <ul>
                <li>On the left hand side select month and year and click on <strong>Show canlender</strong> to display calender of that month.</li>
                <li>Click on any date to view the number of schedules of that date.</li>
                <li>Clicking on schedule on the right panel will give you all the schedules of that date.</li>
                <li>From the left side select teacher name from <strong>Filter by teacher</strong> to display schedule of specific teacher.</li>
                <li>Select <strong>Filter by duration</strong> to view schedule by week wise or month wise.</li>
                <li>While in week wise or month wise view click on any date to view schedule of that week or that month.</li>
                <li><strong>Double click</strong>  on the date to add schedule for that date.</li>
                <li>You can also click on <strong>Add</strong> button on bottom right to add schedule.</li>
                <li>If a teacher has a schedule for that date, further schedule cannot be added to it.</li>
            </ul>



## FEATURES

- Add task / schedules for teachers.
- View schedule day wise, week wise and month wise.
- Filter schedule with teacher name also.
- Teacher cannot have overlapping schedule that is two schedule on same day.
- Multiple teacher can have schedule on that day.
