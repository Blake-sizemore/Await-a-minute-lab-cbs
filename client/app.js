getChirps();

function getChirps() {
    fetch("/api/chirps")
        .then(res => res.json())
        .then(data => {
            const chirps = data.result;
            $("#chirps").empty();
            chirps.forEach(chirp => {

                const editBtn = $(`<div class="btn btn-warning me-2">edit</div>`)
                editBtn.on("click", async function () {
                    $("#user").val(chirp.user);
                    $("#text").val(chirp.text);
                    $("#editSaveButton").show();
                    $("#submitButton").hide();
                    editID = chirp.id
                })

                const deleteBtn = $(`<div class="btn btn-danger">X</div>`)
                deleteBtn.on('click', async function () {
                    const res = await fetch(`/api/chirps/${chirp.id}`, { method: "DELETE" });
                    const data = await res.json();

                    if (res.ok) {
                        getChirps();
                    } else {
                        alert(data.message)
                    }
                });

                const card = $(`<div class="col-12 mt-3">
                                    <div class="card shadow my-2 p-2">
                                    <span class="card-header d-flex flex-row-reverse">Chirp #${chirp.id}</span>
                                        
                                        <h1>${chirp.user}</h1>    
                                        
                                        <p>${chirp.text}</p>

                                        <div id="${chirp.id}-buttons" class="card-footer d-flex flex-row-reverse">
                                        </div>
                                    </div>
                                </div>`);

                $("#chirps").append(card);
                $(`#${chirp.id}-buttons`).append(deleteBtn);
                $(`#${chirp.id}-buttons`).append(editBtn);
            });
        });
}

const submitButton = $("#submitButton");
submitButton.on('click', async function () {
    const user = $("#user").val();
    const text = $("#text").val();

    if (!user || !text) {
        return alert("Input both fields");
    }
    // alert(JSON.stringify({user,text}));
    const res = await fetch('/api/chirps', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, text })
    })
    const data = await res.json();

    if (res.ok) {
        getChirps();
        $("#user").val("");
        $("#text").val("");
    } else {
        alert(data.message)
    }
})

let editID = null;

const saveEditButton = $("#editSaveButton");
saveEditButton.hide();
saveEditButton.on('click', async function () {
    if (!editID) return;

    const user = $("#user").val();
    const text = $("#text").val();

    if (!user || !text) {
        return alert("Input both fields");
    }

    const res = await fetch(`/api/chirps/${editID}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ user, text })
    });

    const data = await res.json();

    if (res.ok) {
        getChirps();
        $("#user").val("");
        $("#text").val("");
        editID = null;
        $("#editSaveButton").hide();
        $("#submitButton").show();
    } else {
        alert(data.message)
    }
});