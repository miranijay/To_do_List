const inputbox = document.querySelector("#input-box");
const addbtn = document.querySelector("#addbtn");
const todolist = document.querySelector(".todolist");


let edittodo = null


const addtodo = () => {
    const val = inputbox.value.trim();

    if (val.length <= 0) {
        alert("Please enter a task");
        return false;
    }

    if (addbtn.value === "Edit") {
        // Passing the original text to editLocalTodos function before edit it in the todoList
        editlocaltodo(edittodo.target.previousElementSibling.innerHTML);
        
        edittodo.target.previousElementSibling.innerHTML = val
        addbtn.value = "Add"
        addbtn.innerHTML = "Add"
        inputbox.value = ""

        

    } 
    else
    {
        //Creating li and p element for storing input-value
        const li = document.createElement("li");
        const p = document.createElement("p");
    
        p.innerHTML = val;
        li.appendChild(p);
        todolist.appendChild(li);
        inputbox.value = "";
    
        //Creating Edit button
        const editbtn = document.createElement("button")
        editbtn.innerHTML = "Edit"
        editbtn.classList.add("editbtn")
        li.appendChild(editbtn)
    
        //Creating delete button
        const delbtn = document.createElement("button")
        delbtn.innerHTML = "Delete"
        delbtn.classList.add("delbtn")
        li.appendChild(delbtn)

        savelocaltodo(val)
    }



}


//Update function for edit and delete button actions
const updateTodo = (e) => {

    //for Delete Button
    if (e.target.innerHTML === "Delete") {
        todolist.removeChild(e.target.parentElement)
        dellocaltodo(e.target.parentElement)
    }

    //For Edit Button
    if (e.target.innerHTML === "Edit") {
        inputbox.value = e.target.previousElementSibling.innerHTML
        inputbox.focus()
        addbtn.value = "Edit";
        addbtn.innerHTML = "Edit"
        edittodo = e;

    }

}

//Save todo list to Local Storage
const savelocaltodo = (todo) => {
    let todos 
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo)
    localStorage.setItem("todos", JSON.stringify(todos))

}

//Get todo list from localStorage 
const getlocaltodo = () => {
    let todos 
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
        todos.forEach(todo => {

            //Creating li and p element for storing input-value
            const li = document.createElement("li");
            const p = document.createElement("p");
        
            p.innerHTML = todo;
            li.appendChild(p);
            todolist.appendChild(li);
            
        
            //Creating Edit button
            const editbtn = document.createElement("button")
            editbtn.innerHTML = "Edit"
            editbtn.classList.add("editbtn")
            li.appendChild(editbtn)
        
            //Creating delete button
            const delbtn = document.createElement("button")
            delbtn.innerHTML = "Delete"
            delbtn.classList.add("delbtn")
            li.appendChild(delbtn)

        });
    }
}

//Delete todo list from local Storage
const dellocaltodo = (todo) => {
    let todos 
    if(localStorage.getItem("todos") === null) {
        todos = []
    } else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }

    let todotext = todo.children[0].innerHTML;
    let todoindex = todos.indexOf(todotext)
    todos.splice(todoindex, 1)
    localStorage.setItem("todos", JSON.stringify(todos))

}

// Edit todo list in local storage
const editlocaltodo = (todo) => {
    let todos = JSON.parse(localStorage.getItem("todos"))
    let todoindex = todos.indexOf(todo)
    todos[todoindex] = inputbox.value
    localStorage.setItem("todos", JSON.stringify(todos))
}

window.addEventListener("load", getlocaltodo)
addbtn.addEventListener("click", addtodo)
todolist.addEventListener("click", updateTodo)