const taskInput=document.querySelector(".task-input input"),
filters=document.querySelectorAll(".filters span"),
clearAll=document.querySelector(".btn"),
taskbox=document.querySelector(".task-box");

let editId;
let isEditTask=false;

let todos=JSON.parse(localStorage.getItem("todo-list"));

filters.forEach(btn=>{
    btn.addEventListener("click",()=>{
        document.querySelector("span.active").classList.remove("active");
        btn.classList.add("active");
        showTodo(btn.id);
    });
})

function showTodo(filters){
    let li="";
    if(todos){
    todos.forEach((todo, id)=>{
        let isCompleted=todo.status=="completed"?"checked":"";
        if(filters==todo.status||filters=="all"){
            li+=`<li class="task">
                <label for="${id}">
                    <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${isCompleted}>
                    <p class="${isCompleted}">${todo.name}</p>
                </label>
                <div class="setting">
                    <i onclick="showMenu(this)" class="fa-solid fa-ellipsis-vertical"></i>
                    <ul class="task-menu">
                        <li onclick="editTask(${id},'${todo.name}')"><i class="fa-solid fa-pen"></i>Edit</li>
                        <li onclick="deleteTask(${id})"><i class="fa-solid fa-trash"></i>Delet</li>
                    </ul>
                </div>
            </li>`
        }
        
    });
}
taskbox.innerHTML=li || `<span>You don't have any task here</span>`;
}
showTodo("all");

function showMenu(selectedTask){
    let taskMenu=selectedTask.parentElement.lastElementChild;
    taskMenu.classList.add("show");
    document.addEventListener("click",e=>{
        if(e.target.tagName != "I" || e.target!=selectedTask){
            taskMenu.classList.remove("show");
        }
    });
}
function editTask(taskId,taskName){

    editId=taskId;
    isEditTask=true;
    taskInput.value=taskName;
}

function deleteTask(deleteId){
    todos.splice(deleteId,1);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all"); 
}

clearAll.addEventListener("click",()=>{
    todos.splice(0,todos.length);
    localStorage.setItem("todo-list",JSON.stringify(todos));
    showTodo("all"); 
})

function updateStatus(selectedTask){
    let taskName=selectedTask.parentElement.lastElementChild;
    if(selectedTask.checked){
        taskName.classList.add("checked");
        todos[selectedTask.id].status="completed"
    }else{
        taskName.classList.remove("checked");
        todos[selectedTask.id].status="pending";
    }
    localStorage.setItem("todo-list",JSON.stringify(todos));

}
taskInput.addEventListener("keyup",e=>{
    let userTask=taskInput.value.trim();
    if(e.key=="Enter" && userTask){
        //getting localstorage todo-list
        // let todos=JSON.parse(localStorage.getItem("todo-list"));
        if(!isEditTask){
            if(!todos){
                todos=[];
                let taskInfo={name:userTask,status:"pending"};
                todos.push(taskInfo);
            }else{
                isEditTask=false;
                todos[editId].name=userTask;
            }
        }
        
        taskInput.value="";
        localStorage.setItem("todo-list",JSON.stringify(todos));
        showTodo("all");
    }
    
})