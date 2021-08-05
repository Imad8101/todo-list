let todoItemsContainer = document.getElementById('todoItemsContainer');
let saveBtn = document.getElementById("saveBtn");


function getStoredTodolistfromStorage() {
    let stringTodolist = localStorage.getItem("todolist");
    let parsedTodolist = JSON.parse(stringTodolist);
    if (parsedTodolist === null) {
        return [];
    } else {
        return parsedTodolist;
    }
}

let todoList = getStoredTodolistfromStorage();

saveBtn.onclick = function() {
    localStorage.setItem("todolist", JSON.stringify(todoList));
};



let todoCount = todoList.length;

function todoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElem = document.getElementById(checkboxId);
    let labelElem = document.getElementById(labelId);
    labelElem.classList.toggle('selected');

    let todoItemIndex = todoList.findIndex(function(eachItem) {
        let eachItemId = 'todo' + eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    let todoObject = todoList[todoItemIndex];
    if (todoObject.isChecked === true) {
        todoObject.isChecked = false;
    } else {
        todoObject.isChecked = true;
    }
}

function todoElemRemove(todoId) {
    let todoElem = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElem);
    let removedItemIndex = todoList.findIndex(function(eachItem) {
        let eachItemId = 'todo' + eachItem.uniqueNo;
        if (eachItemId === todoId) {
            return true;
        } else {
            return false;
        }
    });
    todoList.splice(removedItemIndex, 1);
}

function createAndAppendTodo(Todo) {
    let checkboxId = 'checkbox' + Todo.uniqueNo;
    let labelId = 'label' + Todo.uniqueNo;
    let todoId = 'todo' + Todo.uniqueNo;

    let listItemElem = document.createElement('li');
    listItemElem.classList.add('todo-item-container', 'd-flex', 'flex-row');
    listItemElem.id = todoId;
    todoItemsContainer.appendChild(listItemElem);

    let inputElement = document.createElement('input');
    inputElement.type = 'checkbox';
    inputElement.id = checkboxId;
    inputElement.checked = Todo.isChecked;
    inputElement.classList.add('checkbox-input');
    inputElement.onclick = function() {
        todoStatusChange(checkboxId, labelId, todoId);
    }
    listItemElem.appendChild(inputElement);

    let labelContainer = document.createElement('div');
    labelContainer.classList.add('label-container', 'd-flex', 'flex-row');
    listItemElem.appendChild(labelContainer);

    let labelElement = document.createElement('label');
    labelElement.setAttribute('for', checkboxId);
    labelElement.id = labelId;
    labelElement.classList.add('checkbox-label');
    labelElement.textContent = Todo.text;
    if (Todo.isChecked === true) {
        labelElement.classList.add('selected');
    }
    labelContainer.appendChild(labelElement);

    let deleteItemContainer = document.createElement('div');
    deleteItemContainer.classList.add('delete-icon-container');
    labelContainer.appendChild(deleteItemContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('far', 'fa-trash-alt', 'delete-icon');
    deleteIcon.onclick = function() {
        todoElemRemove(todoId);
    }
    deleteItemContainer.appendChild(deleteIcon);

}


for (let eachItem of todoList) {
    createAndAppendTodo(eachItem)
}

function addTodo() {
    let userInputElem = document.getElementById('todoUserInput');
    let userInputValue = userInputElem.value;
    if (userInputValue === '') {
        alert('Enter Valid Text Field cannot be empty');
        return;
    }
    todoCount = todoCount + 1;
    let newTodo = {
        text: userInputValue,
        uniqueNo: todoCount,
        isChecked: false

    }
    todoList.push(newTodo);
    createAndAppendTodo(newTodo);
    userInputElem.value = '';

}

let addTodoBtnElem = document.getElementById('addTodoBtn');
addTodoBtnElem.onclick = function() {
    addTodo();

}