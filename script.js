const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");
const trash = document.querySelector(".trash");
const addTask = document.querySelector(".add-task");

addTask.addEventListener("click", () => {
    if (inputBox.value === "") {
        Swal.fire("Gagal", "kamu belum memasukkan task kamu", "question");
    } else {
        let li = document.createElement("li");
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerText = inputBox.value;
        li.appendChild(span);
        li.innerHTML += `<img src="img/trash.png" class="trash" alt="">`;
    }
    saveData();
    inputBox.value = "";
});

listContainer.addEventListener(
    "click",
    (e) => {
        if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            saveData();
        } else if (e.target.tagName === "IMG") {
            e.target.parentElement.remove();
            deleteTask();
        }
    },
    false
);

const saveData = () => {
    localStorage.setItem("task", listContainer.innerHTML);
};
const showTask = () => {
    listContainer.innerHTML = localStorage.getItem("task");
};

const deleteTask = () => {
    localStorage.removeItem("task");
};

showTask();
