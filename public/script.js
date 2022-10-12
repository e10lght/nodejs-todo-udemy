const tasklist = document.querySelector(".task-list");
const formDOM = document.querySelector(".task-form");
const formInput = document.querySelector(".task-input");
const formAlert = document.querySelector(".form-alert");

const showTasks = async () => {
    try {
        const { data: tasks } = await axios.get("/api/v1/tasks");

        if (tasks.length < 1) {
            tasklist.innerHTML = `<h5 class="empty-list">タスクがありません</h5>`;
            // innerHTMLは上書きされるため、ここでのreturnは必須
            return;
        }


        const allTasks = tasks.map((task) => {
            const { completed, name, _id } = task;
            return `
            <div class="single-task ${completed && "task-completed"}">
                <h5><span><i class="far fa-check-circle"></i></span>${name}</h5>
                <div class="task-links">
                    <a href="edit.html?id=${_id}" class="edit-link">
                        <i class="fas fa-edit"></i>
                    </a>
                    <button type="button" class="delete-btn" data-id="${_id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            `
        }).join("");
        tasklist.innerHTML = allTasks;
    } catch (err) {
        console.log(err);
    }
}

showTasks();

formDOM.addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = formInput.value;
    try {
        await axios.post("/api/v1/tasks", { name: name });
        showTasks();
        formInput.value = "";

        formAlert.style.display = "block";
        formAlert.classList.add("text-success");
        formAlert.textContent = "追加に成功しました";
    } catch (err) {
        formAlert.style.display = "block";
        formAlert.classList.remove("text-success")
        formAlert.textContent = "無効です。やり直してください";
        console.log(err);
    }
    setTimeout(() => {
        Object.assign(formAlert.style, {
            transform: "translateY(-30px)",
            transition: "0.5s",
            opacity: "0",
        });
        setTimeout(() => {
            formAlert.style.display = "none";
            formAlert.style.opacity = "1";
            formAlert.style.transform = "translateY(0)";
        }, 1000)
    }, 2000)

})

tasklist.addEventListener("click", async (event) => {
    const element = event.target;
    const id = element.parentNode.dataset.id;
    if (element.parentNode.classList.contains("delete-btn")) {
        try {
            await axios.delete(`/api/v1/tasks/${id}`);
            showTasks();
        } catch (error) {
            console.log(error);
        }
    }
})