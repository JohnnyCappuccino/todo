const projectName = document.querySelector("#name");
const dates = document.querySelector(".dates");
const addProject = document.querySelector("#addProject");
const addTask = document.querySelector("#addTask");
const prompt = document.querySelector("#prompt");
const tasksParent = document.querySelector(".tasks");
const promptAdd = document.querySelector("#newAddTesk");
const projectParent = document.querySelector(".projects");
const projectPrompt = document.querySelector("#Projectprompt");
const projectPromptAdd = document.querySelector("#newAddProject");

const currentDate = new Date();

let allProjects = [];

//date stuff
for (let i = 0; i < dates.children.length; i++) {
  dates.children[i].addEventListener("click",()=>{
    clearAllTasks();
    projectName.innerHTML = dates.children[i].innerHTML;
    for(let i = 0; i < allProjects.length; i++) {
      for(let j = 0; j < allProjects[i].tasks.length;j++){
       let taskDate = allProjects[i].tasks[j].date;
        if(projectName.innerHTML == "Today"){
          if(taskDate.getDate() == currentDate.getDate() && taskDate.getYear() == currentDate.getYear()){
            addHtmlTask(allProjects[i].tasks[j].taskName,
                        allProjects[i].tasks[j].date,
                        allProjects[i].tasks[j].done,
                        true);
          }
        }
        else if(projectName.innerHTML == "This Year"){
          if(taskDate.getYear() == currentDate.getYear()){
            addHtmlTask(allProjects[i].tasks[j].taskName,
              allProjects[i].tasks[j].date,
              allProjects[i].tasks[j].done,
              true);
          }
        }
        else if(projectName.innerHTML == "This Month"){
          if(taskDate.getMonth() == currentDate.getMonth() && taskDate.getYear() ==currentDate.getYear()){
            addHtmlTask(allProjects[i].tasks[j].taskName,
              allProjects[i].tasks[j].date,
              allProjects[i].tasks[j].done,
              true);
          }
        }
      }
    }
    addTask.style.display ="none";
  });
}

addTask.addEventListener("click",()=>{
  prompt.style.display ="flex";
});

addProject.addEventListener("click",()=>{
  projectPrompt.style.display ="flex";
});

promptAdd.addEventListener("click",()=>{
  addHtmlTask(prompt.children[1].value,prompt.children[2].valueAsDate,false,false);
  prompt.style.display ="none";
});

projectPromptAdd.addEventListener("click",()=>{
  addHtmlProject(projectPrompt.children[1].value);
  projectPrompt.style.display ="none";
});

function addHtmlTask(name,date,done,oldTask){


  const task = document.createElement("div");
  const firstChild = document.createElement("div");
  const lastChild = document.createElement("div");
  const checkbox = document.createElement("input");
  const title = document.createElement("p");
  const taskDate = document.createElement("p");
  const deleteButton = document.createElement("button");

  tasksParent.appendChild(task);
  task.setAttribute("class", "task");
  task.appendChild(firstChild);
  task.appendChild(lastChild);
  firstChild.appendChild(checkbox);
  checkbox.setAttribute("type", "checkbox");
  checkbox.addEventListener('change', ()=> {
    if (checkbox.checked) {
      task.style.textDecoration ="line-through";
    } else {
      task.style.textDecoration ="none";
    }
  });
  if(done === true){
    checkbox.setAttribute("checked", true);
  }

  firstChild.appendChild(title);
  title.innerHTML = name;

  lastChild.appendChild(taskDate);
  taskDate.innerHTML = date.toLocaleDateString('de-DE');
  lastChild.appendChild(deleteButton);
  deleteButton.addEventListener("click",()=>{
    if(oldTask === true){
      for(let i=0; i<allProjects.length;i++){
        if(allProjects[i].name === projectName.innerHTML){
          removeTask(allProjects[i].tasks,name);
        }
      }
    }
    task.remove();
  });
  if(oldTask === false){
    let newTask = new Task(name,date,done);
    for(let i=0; i<allProjects.length;i++){
      if(allProjects[i].name === projectName.innerHTML){
        allProjects[i].tasks.push(newTask);
      }
    }
    console.log(allProjects);
    oldTask = true;
  }
}

function addHtmlProject(name){

  const Button = document.createElement("button");
  Button.innerHTML = name;
  Button.addEventListener("click",()=>{
    clearAllTasks();
    addTasks(findProject(name).tasks);
    projectName.innerHTML = Button.innerHTML;
    addTask.style.display ="inline";
  });
  Button.setAttribute("id","project");
  projectParent.appendChild(Button);
  let newProject = new Project(name);
  allProjects.push(newProject);
}

function clearAllTasks(){
  console.log(tasksParent.children.length);
  while (tasksParent.hasChildNodes()){
    tasksParent.removeChild(tasksParent.firstChild)
  }
  }


function addTasks(array){
  for(let i=0; i<array.length; i++){
    addHtmlTask(array[i].taskName,array[i].date,array[i].done,true);
  }
}

function findProject(name){
  for(let i=0; i<allProjects.length; i++){
    if(allProjects[i].name == name){
      return allProjects[i];
    }
  }
}

function removeTask(tasks,name){
  for(let i=0; i<tasks.length; i++){
    console.log(tasks[i]);
    console.log(tasks[i].taskName);
    if(tasks[i].taskName == name){
      console.log("removed");
      tasks.splice(i,1);
    }
  }
}

function Task(taskName, date, done) {
  this.taskName = taskName;
  this.date = date;
  this.done = done;
}

function Project(name) {
  this.name = name;
  this.tasks = [];
}

