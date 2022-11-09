/**
 * The logic follows
 * As the window loads, the form listens for any submit
 * Then the content-wrapper and all it's children is created
 * The EDIT button works such that, it needs a condition to check
    whether the edited task has changed or not. 
 */

    
window.addEventListener('load', ()=> {
   
    const form = document.querySelector('form');
    const taskInput = document.getElementById('input-task');
    // const addTask = document.getElementById('add-task-btn');
    const taskWrap = document.querySelector('.task-wrapper');
    const day = document.querySelector('h3');
    const today_time = document.querySelector('span');

    // Trying to display the day of the week of the day() 

    const today = new Date();
    let days_array = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
     
     for (let i = 0; i < days_array.length; i++) {
         if (today.getDay() == i) {
             let day_now = days_array[i];
             day.innerText = day_now;
         }
     } 
   
    
    today_time.innerText = today.getHours() + ':' + today.getMinutes();


    //  form will listen for a submit and will create the necessary divs 

    form.addEventListener('submit', (e)=> {
        e.preventDefault();
        // console.log(taskInput.value);
        let task = taskInput.value;

        if(!task){
            alert('Please make a task first');
            return
        }

        const contentWrap = document.createElement('div');
        contentWrap.classList.add('content-wrap');
        taskWrap.appendChild(contentWrap);
    

        const content = document.createElement('div');
        content.classList.add('content');
        contentWrap.appendChild(content);

        const savedTask = document.createElement('input');
        savedTask.setAttribute('name', 'savedtask');
        savedTask.setAttribute('type', 'text');
        savedTask.setAttribute('readonly', true);
        savedTask.id = 'added-task';

        content.appendChild(savedTask);

        const commandWrap = document.createElement('div');
        commandWrap.classList.add('commands');
        contentWrap.appendChild(commandWrap);

        const editBtn = document.createElement('button');
        const deleteBtn = document.createElement('button');
        editBtn.classList.add('edit-btn');
        deleteBtn.classList.add('delete-btn');
        editBtn.innerText = 'EDIT';
        deleteBtn.innerText = 'DELETE';


        commandWrap.appendChild(editBtn);
        commandWrap.appendChild(deleteBtn);
        
        taskInput.value = '';
        savedTask.value = task;


        editBtn.addEventListener('click', ()=> {
            if (editBtn.innerText.toLowerCase() == 'edit') {
                savedTask.removeAttribute('readonly');
                savedTask.focus();
                editBtn.innerText = 'SAVE';
            }else{
                savedTask.setAttribute('readonly', true);
                editBtn.innerText = 'EDIT';
            }
        })

        deleteBtn.addEventListener('click', ()=> {
            taskWrap.removeChild(contentWrap);
        })       
        store(savedTask.value); 
    })
})


function store(tag) {
    window.localStorage.setItem('item', `${tag}`) 
}

