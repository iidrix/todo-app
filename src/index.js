import './style.css';
import { projects } from './modules/projects';
import createTask from './modules/tasks';
import isObjEmpty from './modules/utilities';

let defaultProject = []
let storedProjects = []
let displayProject = []

const form = document.getElementById('task-form');

const newTask = createTask('Cooking Fish', 'Dorada', 'Tomorrow', 1);
const oldTask = createTask('Fry Fish', 'Dorada', 'Tomorrow', 1, 'Test Project');
const updatedTask = createTask('Work', 'Start working', 'Today', 2, 'Working');

function assignProject(task) {
    if (task.project === 'default') {
        defaultProject = [...defaultProject, task];
    } else if (!(task.project === 'default')) {
        let selectedProject = storedProjects.find((project) => { return project.title === task.project});

        if (selectedProject === undefined) {
            let newProject = projects().newProject(task.project);
            newProject.assignedTasks = [...newProject.assignedTasks, task];
            storedProjects = [...storedProjects, newProject];
            defaultProject = [...defaultProject, task];
        } else {
            selectedProject.assignedTasks = [...selectedProject.assignedTasks, task];
            defaultProject = [...defaultProject, task];
            console.log(selectedProject);
        }
    }
}

assignProject(newTask);
assignProject(oldTask);
assignProject(updatedTask);

console.log(defaultProject);

function createNewTask() {
    const titleValue = document.getElementById('title').value;
    const descriptionValue = document.getElementById('description').value;
    const dueDateValue = document.getElementById('duedate').value;
    const priorityValue = document.getElementById('priority').value;
    const projectValue = document.getElementById('project').value;

    const taskToCreate = createTask(titleValue, descriptionValue, dueDateValue, priorityValue, projectValue);
    assignProject(taskToCreate);
    renderButtons();
    console.log(taskToCreate);
    console.log(storedProjects);
} 

const submitButton = document.getElementById('submit-task');
submitButton.addEventListener('click', createNewTask);


function outputProject(object) {
    const contentOutput = document.getElementById('content');

    let listOfTasks;

    if (object === defaultProject) {
        listOfTasks = defaultProject;
    } else {
        listOfTasks = object.assignedTasks;
    }

    contentOutput.innerHTML = ""; 

    contentOutput.insertAdjacentHTML('beforeend', listOfTasks.map(task =>
        `<tr>
            <td>Title: ${task.title}</td>
            <td>Description: ${task.description}</td>
            <td>Due date: ${task.dueDate}</td>
            <td>Priority: ${task.priority}</td>
            <td>Project: ${task.project}</td>
        </tr>`
    ).join(''));
}

const allProjects = document.getElementById('all-projects');
allProjects.addEventListener('click', () => {
    displayProject = defaultProject;
    outputProject(displayProject);
    form.reset();
});

function renderButtons() {

    const navbar = document.querySelector('.navigation')
    storedProjects.forEach((project) => {
        let buttonExists = document.querySelector(`[value="${project.title}"]`);
        if (buttonExists === null) {
        const button = document.createElement('button');
        button.value = project.title;
        button.innerText = project.title;
        button.addEventListener('click', function() {
            displayProject = storedProjects.find((project) => {return project.title === this.value});
            outputProject(displayProject);
            form.reset();
            console.log(displayProject);
        });
        navbar.appendChild(button);
    }
    });
}

renderButtons();



function renderTasks() {
    if (isObjEmpty(defaultProject) && isObjEmpty(storedProjects)) {
        console.log("It's empty");
    } else {
        displayProject = defaultProject;
        outputProject(displayProject);
    }
}
renderTasks();

