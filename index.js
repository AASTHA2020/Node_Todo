const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const tasksFilePath = path.join(__dirname, 'tasks.txt');


function addTask(task){
    fs.appendFile(tasksFilePath, task + '\n', (err) => {
        if (err) throw err;
        console.log('Task added successfully!');
        rl.close();
    });
}

function viewTasks(){
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        console.log('Tasks:');
        console.log(data);
        rl.close();
    });
}   


function markTaskComplete(taskNumber){
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n').filter(task => task.trim() !== '');
        if (taskNumber >0 && taskNumber <= tasks.length) {
            tasks[taskNumber -1] += '(completed)';
            fs.writeFile(tasksFilePath, tasks.join('\n'), (err) => {
                if (err) throw err;
                console.log('Task marked as complete!');
                rl.close();
            });
       }else{
        console.log('Invalid task number.');
        rl.close();
       }
    });
}


// Function to remove a task
function removeTask(taskNumber) {
    fs.readFile(tasksFilePath, 'utf8', (err, data) => {
        if (err) throw err;
        const tasks = data.split('\n').filter(task => task);
        if (taskNumber > 0 && taskNumber <= tasks.length) {
            tasks.splice(taskNumber - 1, 1);
            fs.writeFile(tasksFilePath, tasks.join('\n') + '\n', (err) => {
                if (err) throw err;
                console.log('Task removed!');
                rl.close();
            });
        } else {
            console.log('Invalid task number');
            rl.close();
        }
    });
}

// Menu to interact with the user
console.log('Choose an option:');
console.log('1. Add a new task');
console.log('2. View tasks');
console.log('3. Mark a task as complete');
console.log('4. Remove a task');

rl.question('Enter your choice: ', (choice) => {
    if (choice === '1') {
        rl.question('Enter task: ', (task) => {
            addTask(task);
        });
    } else if (choice === '2') {
        viewTasks();
    } else if (choice === '3') {
        rl.question('Enter task number to mark complete: ', (num) => {
            markTaskComplete(parseInt(num));
        });
    } else if (choice === '4') {
        rl.question('Enter task number to remove: ', (num) => {
            removeTask(parseInt(num));
        });
    } else {
        console.log('Invalid choice');
        rl.close();
    }
});
