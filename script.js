const inputTask = document.querySelector(".input-task");
const btnTask = document.querySelector(".btn-task");
const taskList = document.querySelector(".task-list");
const task = document.querySelector(".task");

btnTask.addEventListener("click", (e) => {
    e.preventDefault();
    const nameTask = inputTask.value;

    if (nameTask.value == "") {
        alert("kamu belum menambahkan tugas");
        return;
    }

    let newTodo = `<li>
                    <span class="task">${nameTask}</span>
                        <button onclick="done(this.previousElementSibling)">
                            <i class="fa-solid fa-circle-check"></i>
                        </button>
                        <button onclick="hapus(this.parentElement)">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </li>`;

    taskList.insertAdjacentHTML("afterbegin", newTodo);

    inputTask.value = " ";
});

const done = (task) => {
    task.classList.toggle("complete");
    alert("selamat kamu sudah menyelesaikan satu tugas");
};

const hapus = (taskElement) => {
    const tanya = confirm("apakah kamu yakin?");
    if (tanya) taskElement.remove();
};
