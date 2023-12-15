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

let allTasks = [];
let allProject = [];

for (let i = 0; i < dates.children.length; i++) {
  dates.children[i].addEventListener("click",()=>{
    projectName.innerHTML = dates.children[i].innerHTML;
  });
}

addTask.addEventListener("click",()=>{
  prompt.style.display ="flex";
});

addProject.addEventListener("click",()=>{
  projectPrompt.style.display ="flex";
});

promptAdd.addEventListener("click",()=>{
  addHtmlTask(prompt.children[1].value,prompt.children[2].value,false);
  prompt.style.display ="none";
});

projectPromptAdd.addEventListener("click",()=>{
  addHtmlProject(projectPrompt.children[1].value);
  projectPrompt.style.display ="none";
});

function addHtmlTask(name,date,done){

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
  if(done === true){
    checkbox.setAttribute("checked", true);
  }

  firstChild.appendChild(title);
  title.innerHTML = name;

  lastChild.appendChild(taskDate);
  taskDate.innerHTML = date;
  lastChild.appendChild(deleteButton);
  deleteButton.addEventListener("click",()=>{
    task.remove();
  });
}

function addHtmlProject(name){

  const Button = document.createElement("button");
  Button.innerHTML = name;
  Button.addEventListener("click",()=>{
    projectName.innerHTML = Button.innerHTML;
  });
  Button.setAttribute("id","project");
  projectParent.appendChild(Button);
}