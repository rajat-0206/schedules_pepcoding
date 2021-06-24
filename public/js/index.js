window.addEventListener("load", async () => {
    $("#instruction").show();
    let response = await fetch("/getCalender");
    let getDays = await response.json();
    $("#Cdates").html("");
    getDays.result.forEach(day => {
        if (!day.isCurrentMonth) {
            $("#Cdates").append(`<li class="prev">${day.dayOfMonth}</li>`)
        }
        else {
            $("#Cdates").append(`<li onclick="getTaskCount(${day.dayOfMonth},${getDays.month},${getDays.year})" ondblclick="openModal(${getDays.year},${getDays.month},${day.dayOfMonth})">${day.dayOfMonth}</li>`)
        }
    });
    $("#displayMonth").html(getDays.monthname)
    $("#displayYear").html(getDays.year)

    for (let i = 2000; i <= 2021; i++) {
        $("#yearlist").append(`<option value="${i}">${i}</option>`)
    }

    $("#monthlist").val(getDays.month);
    $("#yearlist").val(getDays.year)

    response = await fetch("/getTeachers");
    let teachers = await response.json();
    console.log(teachers)
    teachers.forEach(teacher => {
        $("#teacherlist").append(`<option value="${teacher.id}">${teacher.name}</option>`)
        $("#selTeacher").append(`<option value="${teacher.id}">${teacher.name}</option>`)
    })

})


const displayCalender = async () => {

    let month = $("#monthlist").val();
    let year = $("#yearlist").val();
    let response = await fetch(`/getCalender?&year=${year}&month=${month}`);
    let getDays = await response.json();
    console.log(getDays)
    $("#Cdates").html(" ");
    getDays.result.forEach(day => {
        if (!day.isCurrentMonth) {
            $("#Cdates").append(`<li class="prev">${day.dayOfMonth}</li>`)
        }
        else {
            $("#Cdates").append(`<li onclick="getTaskCount(${day.dayOfMonth},${getDays.month},${getDays.year})" ondblclick="openModal(${getDays.year},${getDays.month},${day.dayOfMonth})">${day.dayOfMonth} </li>`)
        }
    });
    $("#displayMonth").html(getDays.monthname)
    $("#displayYear").html(getDays.year)

}


const getTaskCount = async (day, month, year) => {
    let view = $("#views").val();
    let teacher = $("#teacherlist").val();
    if (teacher == "0") {
        url = `/getTaskCount?viewBy=${view}&date=${year}/${month}/${day}`;
    }
    else {
        url = `/getTaskCount?viewBy=${view}&date=${year}/${month}/${day}&teacherId=${teacher}`
    }
    let response = await fetch(url)
    let tasks = await response.json();
    console.log(tasks);
    $("#tasklist").html(" ");
    $("#panetitle").html("Click on the date to view all task of that date")
    tasks.forEach(task => {
        let temp = task.date.split("-")
        let tyear = temp[0],tmonth = temp[1],tday = temp[2];
        let card = `<div class="cards" onclick="getAllTask(${tyear},${tmonth},${tday})">
        <div class="pallete primary" >
        <p>${task.date}</p>
        <span>${task.total_task} ${task.total_task==1?'task':'tasks'}</span>
    </div> <i class="material-icons">arrow_forward</i>
    </div>`
        $("#tasklist").append(card);
    });

    if ($("#tasklist").html().trim() === "") {
        $("#pane-title").html("No schedule is present");
    }
    else {
        $("#pane-title").html("Click on the date to view all task of that date")
    }
}

const getAllTask = async (year, month, day) => {
    let teacher = $("#teacherlist").val();
    if (teacher == "0") {
        url = `/alltask?date=${year}/${month}/${day}`;
    }
    else {
        url = `/alltask?date=${year}/${month}/${day}&teacherId=${teacher}`
    }

    let response = await fetch(url)
    let tasks = await response.json();
    $("#tasklist").html(" ");
    $("#pane-title").html(`Schedules for ${day}/${month}/${year} `)
    tasks.forEach(task => {
        let card = `<div class="cards">
        <div class="pallete primary">
        <p>${task.Teacher.name}'s schedule</p>
        <span>${task.batch}</span>
       
    </div></div>`
        $("#tasklist").append(card);

    })

}


const openModal = (year, month, day) => {
    if (day) {
        day = String(day).length === 1 ? "0" + day : day;
        month = String(month).length === 1 ? "0" + month : month;
        let date = `${year}-${month}-${day}`;
        console.log(date)
        $("#seldate").val(date);
    }
    $("#addScheudlemodal").show();
}

const closeModal = () => {
    $("#addScheudlemodal").hide();
    $("#seldate").val("");
    $("#selTeacher").val("");
    $("#batch").val("");
}

const showSnackbar = (message, error = false) => {
    if (error) {
        $("#messageBar").addClass("error");
    }
    $("#messageBar").html(message);
    $("#messageBar").animate({ bottom: "30px" }, "0.5s", () => {
        setTimeout(() => {
            $("#messageBar").animate({ bottom: "-100px" }, "0.6s", () => {
                if (error) {
                    $("#messageBar").removeClass("error");
                }
            });

        }, 2000);
    })
}


const submitSchedule = async() => {
    let teacherId = $("#selTeacher").val();
    let batch = $("#batch").val();
    let date = $("#seldate").val();
    console.log(date)
    if (!teacherId || !batch.trim()  || !date) {
        showSnackbar("Please enter all the information",true);
        return;
    }
    let response = await fetch("/scheduleTask", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            teacherId:Number(teacherId),
            batch:batch,
            date:date
        })
    });

    let check = await response.json();
    if(check.response){
        showSnackbar(check.response,true);
    }
    else{
        showSnackbar("The schedule has been successfully added!");
        closeModal();
    }


}

