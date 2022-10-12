const taskEditId = document.querySelector(".task-edit-id");
const taskEditName = document.querySelector(".task-edit-name");
const singleTaskForm = document.querySelector(".single-task-form");
const formAlert = document.querySelector(".form-alert");
const taskEditCompleted = document.querySelector(".task-edit-completed");

const params = location.search;
const id = new URLSearchParams(params).get("id");



const showTask = async () => {
    try {
        const { data: task } = await axios.get(`/api/v1/tasks/${id}`);
        const { _id, name, completed } = task;
        taskEditId.textContent = _id;
        taskEditName.value = name;
        if (completed) {
            taskEditCompleted.checked = true;
        }

    } catch (err) {
        console.log(err);
    }
}

showTask();

singleTaskForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    try {
        const taskName = taskEditName.value;
        const taskCompleted = taskEditCompleted.checked;
        await axios.patch(`/api/v1/tasks/${id}`, {
            name: taskName,
            completed: taskCompleted,
        });
        formAlert.textContent = "編集に成功しました";
        formAlert.style.display = "block";
        formAlert.classList.add("text-success");
        showTask();
    } catch (err) {
        console.log(err);
    }
    setTimeout(() => {
        formAlert.style.display = "none";
        formAlert.classList.remove("text-success");
    }, 3000)
})