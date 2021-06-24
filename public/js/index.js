window.addEventListener("load",async ()=>{
    let response = await fetch("/getCalender");
    let getDays = await response.json();
    $("#Cdates").html("");
    getDays.result.forEach(day => {
            if(!day.isCurrentMonth){
                $("#Cdates").append(`<li class="prev">${day.dayOfMonth}</li>`)
            }
            else{
                $("#Cdates").append(`<li onclick="getTaskCount(${day.dayOfMonth},${getDays.month},${getDays.year})">${day.dayOfMonth}</li>`)   
            }
    });  
    $("#displayMonth").html(getDays.monthname)
    $("#displayYear").html(getDays.year)

    for(let i =2000;i<=2021;i++){
        $("#yearlist").append(`<option value="${i}">${i}</option>`)
    }

    $("#monthlist").val(getDays.month);
    $("#yearlist").val(getDays.year)
})


const displayCalender = async () =>{
    
    let month = $("#monthlist").val();
    let year = $("#yearlist").val();
    let response = await fetch(`/getCalender?&year=${year}&month=${month}`);
    let getDays = await response.json();
    console.log(getDays)
    $("#Cdates").html(" ");
    getDays.result.forEach(day => {
        if(!day.isCurrentMonth){
            $("#Cdates").append(`<li class="prev">${day.dayOfMonth}</li>`)
        }
        else{
            $("#Cdates").append(`<li onclick="getTaskCount(${day.dayOfMonth},${getDays.month},${getDays.year})">${day.dayOfMonth}</li>`)   
        }
});  
$("#displayMonth").html(getDays.monthname)
$("#displayYear").html(getDays.year)

}


const getTaskCount = async (day,month,year) =>{
    let view = $("#views").val();
    let response = await fetch(`/getTaskCount?viewBy=${view}&date=${year}/${month}/${day}`)
    let tasks = await response.json();
    console.log(tasks);
    $("#tasklist").html(" ");
    $("#panetitle").html("Click on the date to view all task of that date")
    tasks.forEach(task =>{
        let card = `<div class="cards">
        <div class="pallete primary" onclick="getAllTask(${year},${month},${day})">
        <h2>${task.date}</h2>
        <h4>Total Task : ${task.total_task}</h4>
    </div></div>`
    $("#tasklist").append(card);
    });

    if($("#tasklist").html().trim()===""){
        $("#pane-title").html("No schedule is present");
    }
    else{
        $("#pane-title").html("Click on the date to view all task of that date")
    }
}

const getAllTask = async (year,month,day) =>{
    let response = await fetch(`/alltask?date=${year}/${month}/${day}`)
    let tasks = await response.json();
    $("#tasklist").html(" ");
    $("#pane-title").html(`Schedules for ${day}/${month}/${year} `)
    tasks.forEach(task =>{
        let card = `<div class="cards">
        <div class="pallete primary">
        <h2>${task.batch}</h2>
        <h4>Schedule for : ${task.Teacher.name}</h4>
    </div></div>`
    $("#tasklist").append(card);

    })

}

const openModal = () => {
    $("#addScheudlemodal").show();
    showSnackbar("Modal opened");
}

const closeModal = () => {
    $("#addScheudlemodal").hide();
    showSnackbar("Modal closed",true);
}

const showSnackbar = (message,error=false) =>{
    if(error){
        $("#messageBar").addClass("error");
    }
    $("#messageBar").html(message);
    $("#messageBar").animate({bottom:"30px"},"0.5s",()=>{
        setTimeout(() => {
            $("#messageBar").animate({bottom:"-100px"},"0.6s",()=>{
                if(error){
                    $("#messageBar").removeClass("error");
                }
            });
            
        }, 2000);
    })
}

const addScheu

