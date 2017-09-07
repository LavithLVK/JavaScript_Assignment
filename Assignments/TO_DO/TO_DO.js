var Task={
          id:'',
          name:"",
          status: "",
          tags:""
}

var idCount=0;
var taskList=[];
var btnAdd=document.getElementById('addButton');
var taskArea =document.getElementById('taskArea');
var statusDrop=document.getElementById('statusDrop');
var tagInput=document.getElementById('tagInput');
var pendingCount=document.getElementById('pendingCount');
var completedCount=document.getElementById('completedCount');
var progress=document.getElementById('progress');
// var btnTag=document.getElementById('btnTag');
var table=document.getElementById('table');
var tagList=[];//TODO
var currentRow=0;
var currentRowId=0;

//TODO
// function addTagToList(){
//     tagList.push(tagInput.value);
//     refreshTags();
// }

function refreshTags(){

}

function addOrUpdate(){
  var addString=btnAdd.textContent;
  var tempTask = Task;
  if(addString === "ADD"){
    if(taskArea.value!=""&&statusDrop.value!="Select Any1"&&tagInput.value!=""){
      tempTask.id=++idCount;
      tempTask.name=taskArea.value;
      tempTask.status=statusDrop.value;
      tempTask.tags=tagInput.value;
      // tagList=[];//TODO
      taskList.push(tempTask);
      refreshTable(table.rows.length,false);
    }else{
      alert("Please Enter Records to ADD...")
    }
  }
  else if (addString === "UPDATE") {
    tempTask.name=taskArea.value;
    tempTask.status=statusDrop.value;
    tempTask.tags=tagInput.value;
    // tagList=[];//TODO
    taskList.forEach(function(task){
      if(task.id == currentRowId)
      {
        task=tempTask;
      }
    });
    btnAdd.textContent="ADD";
    refreshTable(currentRow,true);
  }
  taskArea.value="";
  statusDrop.value="Select Any1";
  tagInput.value="";
}

function refreshTable(row, isUpdate){
  var tempTask=taskList[row-1];
  if(isUpdate)
  table.deleteRow(row);
  var rowTask=table.insertRow(row);
  var sNo=rowTask.insertCell(0);
  var idNo = rowTask.insertCell(1);
  var name=rowTask.insertCell(2);
  var tags=rowTask.insertCell(3);
  var status=rowTask.insertCell(4)
  var actionSteps=rowTask.insertCell(5);
  sNo.innerHTML = row;
  idNo.innerHTML= tempTask.id;
  name.innerHTML=tempTask.name;
  tags.innerHTML=tempTask.tags;
  status.innerHTML= tempTask.status;
  actionSteps.innerHTML="<button type=\"button\" onClick=\"editTask(this)\" style=\"border-radius:5px;background-color:#e0ebeb;\"><i class=\"fa fa-edit\" aria-hidden=\"true\"></i></button><button type=\"button\" onClick=\"removeTask(this)\" style=\"border-radius:5px;background-color:#e0ebeb;margin-left:40px;\"><i class=\"fa fa-trash\"  aria-hidden=\"true\"></i></button>"
  pendingCount ="Pending Tasks : "+ taskList.filter(function(task){
    return task.status == "Pending";
  }).length;
  completedCount = "Completed Tasks : " + taskList.filter(function(task){
    return task.status == "Completed";
  }).length;
  // progress = taskList.forEach(function(task){
  //   task.status == "Pending";
  // }).count;
}

function editTask(element){
  currentRow=element.closest("tr").rowIndex;
  currentRowId=taskList[currentRow-1].id;
  taskArea.value=taskList[currentRow-1].name;
  statusDrop.value=taskList[currentRow-1].status;
  tagInput.value=taskList[currentRow-1].tags;
  btnAdd.textContent="UPDATE";
}
