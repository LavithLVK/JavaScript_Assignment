function Task(id,name,status,tags){
          this.id = id;
          this.name = name;
          this.status = status;
          this.tags = tags;
}

var idCount=0;
var taskList=[];
var btnAdd=document.getElementById('addButton');
var taskArea =document.getElementById('taskArea');
var statusDrop=document.getElementById('statusDrop');
var tagInput=document.getElementById('tagInput');
var pendingList=[];
var pendingCount=document.getElementById('pendingCount');
var completedList=[];
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
  var tempTask;
  if(addString === "ADD"){
    if(taskArea.value!=""&&statusDrop.value!="Select Any1"&&tagInput.value!=""){
      // tempTask.id=++idCount;
      // tempTask.name=taskArea.value;
      // tempTask.status=statusDrop.value;
      // tempTask.tags=tagInput.value;
      // tagList=[];//TODO
      taskList.push(new Task(++idCount,taskArea.value,statusDrop.value,tagInput.value));
      refreshTable(table.rows.length,false);
    }else{
      alert("Please Enter Records to ADD...")
    }
  }
  else if (addString === "UPDATE") {
    tempTask=taskList.filter(function(task){return task.id == currentRowId})[0];
    tempTask.name=taskArea.value;
    tempTask.status=statusDrop.value;
    tempTask.tags=tagInput.value;
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
  pCount = taskList.filter(function(task){
    return task.status == "Pending";
  }).length;
  cCount = taskList.filter(function(task){
    return task.status == "Completed";
  }).length;
  pendingCount.textContent ="Pending Tasks : "+ pCount;
  completedCount.textContent = "Completed Tasks : " + cCount;
  progressCount = (cCount/taskList.length) * 100 + "";//parseFloat(cCount/taskList.length) * 100;
  progress.textContent = "Progress : " + progressCount.substring(0,4) + "%";
}

function editTask(element){
  currentRow=element.closest("tr").rowIndex;
  currentRowId=taskList[currentRow-1].id;
  taskArea.value=taskList[currentRow-1].name;
  statusDrop.value=taskList[currentRow-1].status;
  tagInput.value=taskList[currentRow-1].tags;
  btnAdd.textContent="UPDATE";
}
