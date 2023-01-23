
const ToDoList = [];
var compfunction = alwaysTrue;

function addtoTable(){
    const newTask = {task : document.getElementById("inp").value, completed : false};
    ToDoList.push(newTask);
    save();
    render();
    document.getElementById("inp").value = "";
    document.getElementById("inputrow").hidden = "hidden";
}

function alwaysTrue(val) {
    return true;
}

function onlyCompleted(val) {
    return val;
}

function onlyIncomplete(val) {
    return !val;
}

function render(){
    var text = "";
    const keys = ToDoList.keys();
    let src, taskcls;
    for (let i of keys){
        if (compfunction(ToDoList[i].completed)){
            if (ToDoList[i].completed){
                src = "complete.png";
                taskcls = "taskinner completed";
            } else {
                src = "notcomplete.png";
                taskcls = "taskinner";
            }
            let tex1 = (`<td class='checker' id='status${i}' onclick='togglestatus(${i})'><img src='${src}'></td>`);
            let tex2 = (`<td class='task'><span class='${taskcls}' onclick='changeTask(${i})' id='task${i}'>${ToDoList[i].task}</span></td>`);
            text += (`<tr>${tex1}${tex2}<td class='del' onclick='delElement(${i})'>DEL</td></tr>` );
        };
    }
    lastrow = "<tr id='inputrow' hidden='hidden'><td></td><td class='task'><input type='text' id='inp' placeholder='Enter task'></td></tr>";
    text += lastrow;
    document.getElementById("ToDoListTable").innerHTML = text;
    document.getElementById("inp").addEventListener("keyup", function (event){
        if (event.key == "Enter") {
            addtoTable();
        }
    });
}

function delElement(a){
    ToDoList.splice(a,1);
    save();
    render();
}

function save(){
    const text = JSON.stringify(ToDoList);
    localStorage.ToDoList = text;
}

function init(){
    const text = localStorage.ToDoList;
    try {
        Tolist = JSON.parse(text);
        for (let i of Tolist){
            ToDoList.push(i);
        }
        render();
    } catch(excp) {
        localStorage.setItem("ToDoList", JSON.stringify([]));
        console.log("created new element ToDoList");
    }
}

function displayInput(){
    document.getElementById("inputrow").removeAttribute("hidden");
    document.activeElement = document.getElementById("inp");
}

function changeTask(a){
    let newinp = document.createElement("input");
    newinp.id = "newinp" + a ;
    newinp.placeholder = "Enter Task";
    const taskid = "task" + a ;
    let child = document.getElementById(taskid);
    parent = child.parentNode;
    newinp.addEventListener("keyup", function (event){
        if (event.key == "Enter"){
            ToDoList[a].task = newinp.value;
            save();
            render();
        };
    })
    parent.replaceChild(newinp, document.getElementById(taskid))
    newinp.value = ToDoList[a].task;
}

function changefunc(){
    let dummyvar = document.getElementById("tabletype").value;
    if (dummyvar == "All"){
        compfunction = alwaysTrue; 
    } else if (dummyvar == "Completed") {
        compfunction = onlyCompleted;
    } else {
        compfunction = onlyIncomplete;
    }
    render();
}

function togglestatus(a) {
    ToDoList[a].completed = !ToDoList[a].completed;
    save();
    render();
}
init();

function clearall(){
    let dummyvar = ToDoList.length;
    for (let i=0; i<dummyvar; i++){
        ToDoList.pop();
    };
    save();
    render();
}

function displayhelp(){
    var addnewtask = "To add a new task:\nclick NewTask-> Enter the Task-> Press 'Enter'";
    var edittask = "To edit a task click on the task";
    var completetask = "To mark a task as completed, click on the checkbox of corresponding task";
    var clearlist = "clearlist: Delete all tasks";
    let alertout = (`\n${addnewtask}\n\n${edittask}\n\n${completetask}\n\n${clearlist}`)
    alert(alertout);
}