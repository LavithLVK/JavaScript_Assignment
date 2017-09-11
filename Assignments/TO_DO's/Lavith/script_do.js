
            var tasks = [];
            var activeSection = document.getElementById('activeTasks');
            var completedSection = document.getElementById('completedTasks');
            var taskBox = document.getElementById('task');
            var error = document.getElementById('error');
            var activeButton = document.getElementById('activeButton');
            var completedButton = document.getElementById('completedButton');
            
			window.onload = function(){
				activeSection = document.getElementById('activeTasks');
				completedSection = document.getElementById('completedTasks');
				taskBox = document.getElementById('task');
				error = document.getElementById('error');
				activeButton = document.getElementById('activeButton');
				completedButton = document.getElementById('completedButton');
			}
            function addTask() {
                if(taskBox.value !== ''){
                    tasks.push({
                                content : taskBox.value,
                                isCompleted : false,
                                isChecked : false
                            });
                    taskBox.value='';
                    if(activeSection.style.display === 'none'){
                        activeSection.style.display = 'block';
                        completedSection.style.display = 'none';
                        activeButton.style.backgroundColor = 'orange';
                        completedButton.style.backgroundColor = 'gray';
                    }
                    refreshUI();
                } else {
                    error.style.display = 'inline';
                    setTimeout(function() {
                        error.style.display = 'none';
                    },3000);
                }
            }

            function removeTask(index) {
                tasks.splice(index,1);
                refreshUI();
            }

            function removeTasks() {
			var count=0;
                for(var i = 0; i < tasks.length;){
                    if(tasks[i].isChecked){
                        tasks.splice(i,1);
						count++;
                    } else {
                        i++;
                    }
                }
				if(count==0){
					alert("Please select atleast one field...");
				}
                refreshUI();
            }

            function check(index) {
                tasks[index].isChecked = !tasks[index].isChecked;
            }

            function tasksCompleted(){
                var count=0;
				tasks.forEach(function(task, index){
                    if(!task.isCompleted && task.isChecked){
                        task.isCompleted = true;
						count++;
                        task.isChecked = false;
                    }
                });
				if(count==0){
					alert("Please select atleast one field...");
				}
                refreshUI();
            }

            function toggleSection(section){
                if(section === 'Active') {
                    activeSection.style.display = 'block';
                    completedSection.style.display = 'none';
                    activeButton.style.backgroundColor = 'orange';
                    completedButton.style.backgroundColor = 'gray';
                } else {
                    activeSection.style.display = 'none';
                    completedSection.style.display = 'block';
                    activeButton.style.backgroundColor = 'gray';
                    completedButton.style.backgroundColor = 'orange';
                }
            }

            function refreshUI() {
                var activeTasks = "";
                var completedTasks = "";
                var completedTasksCount = 0;
                tasks.forEach(function(task, index){
                    var tempTask = '<div><input type="checkbox" onclick="check(' + index + ')" '+ (task.isChecked?"checked":"") +'/>'+
                                    '<span>'+ task.content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;") + 
                                    '</span>&nbsp;&nbsp;<button type="button" onclick="removeTask(' + index + ')">X</button></div>';
         
                    if(task.isCompleted){
                        completedTasks = completedTasks + tempTask;
                        completedTasksCount++;
                    } else {
                        activeTasks = activeTasks + tempTask;
                    }
                });

                document.getElementById('completed').style.width = (completedTasksCount / tasks.length * 100) + '%';
                document.getElementById('progress').innerHTML = completedTasksCount + '/' + tasks.length;

                activeSection.innerHTML = activeTasks;
                completedSection.innerHTML = completedTasks;
            }
