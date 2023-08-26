const inputBox = document.querySelector(".input-box");
const listContainer = document.querySelector(".list-container");
const trash = document.querySelector(".trash");
const addTask = document.querySelector(".add-task");

inputBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addTaskFunction();
    }
});

const addTaskFunction = () => {
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
};

addTask.addEventListener("click", addTaskFunction);

listContainer.addEventListener(
    "click",
    (e) => {
        if (e.target.classList.contains("checked")) {
            showAlert("warning", "Task ini sudah kamu kerjakan");
        } else if (e.target.tagName === "LI") {
            e.target.classList.toggle("checked");
            showAlert("success", "Kamu berhasil menyelesaikan tugas ini");
            saveData();
        } else if (e.target.tagName === "IMG") {
            Swal.fire({
                title: "Apakah kamu yakin?",
                text: "Kamu akan menghapus selamanya task ini",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Hapus",
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire(
                        "Terhapus!",
                        "Task kamu berhasil dihapus.",
                        "success"
                    );
                    e.target.parentElement.remove();
                    deleteTask();
                }
            });
        }
    },
    false
);

const showAlert = (icon, title) => {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
    });

    Toast.fire({ icon, title });
};

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
