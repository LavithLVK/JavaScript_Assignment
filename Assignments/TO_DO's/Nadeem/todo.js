var TaskList=[];



function addTask(){
    var cur = document.getElementsByName("newtask")[0].value;

    var temp = new  Object();
    for(var i=0;i<TaskList.length;i++)
    {
        if(TaskList[i].name==cur)
        {
            alert("TASK Already Present");
            return;
        }
    }
    temp.name=cur;
    temp.status="InComplete";
    temp.id=TaskList.length+1;
    TaskList.push(temp);
   var InComplete=document.getElementById("InCompleted");
    var entry =document.createElement('li');
    entry.appendChild(document.createTextNode(cur));
    entry.appendChild(createButton("1"));
    entry.appendChild(createButton("2"));
    InComplete.appendChild(entry);
    TaskPercentage();
  
    
}


function createButton(i){
   btn=document.createElement('input');
if(i==1){
   btn.type='button'
   btn.value="Remove";
   btn.onclick=RemoveTask
   btn.class="RemoveTask"

}
else if (i==2){
   btn.type='button'
   btn.value="Completed";
   btn.onclick=CompledTask
}
    return btn;
}




function RemoveTask(){
     var parent=this.parentElement;
     var text=parent.childNodes[0].nodeValue;
     for(var i=0;i<=TaskList.length;i++){

         if(TaskList[i].name===text){
             TaskList.splice(i,1);
              this.parentElement.remove();
              break;
         }
     }
     TaskPercentage();
}

function CompledTask(){
    var parent=this.parentElement;
    var text=parent.childNodes[0].nodeValue;
     for(var i=0;i<=TaskList.length;i++){

         if(TaskList[i].name==text){
             console.log(TaskList[i].name)
           TaskList[i].status="Completed"
              break;
         }
     }
    var Complete=document.getElementById("Completed");
    var entry =document.createElement('li');
    entry.appendChild(document.createTextNode(text));
    entry.appendChild(createButton("1"));
    Complete.appendChild(entry);
    parent.remove();
    TaskPercentage();
    
}



function TaskPercentage(){
    var cmp=0;
    for(var i=0;i<TaskList.length;i++){
        if(TaskList[i].status=="Completed"){
         cmp++;
         }
    }
    var percentage=(cmp/TaskList.length)*100;
    document.getElementById("TaskPercentage").innerHTML="Completed Task = "+percentage+"%";
}