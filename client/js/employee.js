fetch("/employee",{
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({companyId: 1, ssn: null})
}).then(data => data?.json())
    .then(dat => {
        let mainDiv = document.getElementsByClassName("employee-main-table")[0];
        let mainHeaderDiv = document.getElementsByClassName("table-header")[0];
        let headerDiv = document.createElement("div");
        mainHeaderDiv.appendChild(headerDiv);
        for (let j = 0; j < dat.rows.length; j++){
            let rowDiv = document.createElement("div");
            rowDiv.className = "row-div";
            mainDiv.appendChild(rowDiv);
            let div = document.createElement("div");
            rowDiv.appendChild(div);
            let fieldNames = Object.keys(dat.rows[j]);
            for(let i = 0; i < fieldNames.length; i++){
                if(j === 0) {
                    let el = document.createElement("input");
                    el.value = fieldNames[i];
                    el.className = "employee-table-header"
                    el.disabled = true;
                    headerDiv.appendChild(el);
                    if(el.value === "id") el.style.display = "none";
                }
                let elem = document.createElement("input");
                elem.name = fieldNames[i];
                elem.className = fieldNames[i];
                elem.value = dat.rows[j][fieldNames[i]];
                // elem.innerText = dat.rows[fieldNames[i]];
                div.appendChild(elem)
                if(elem.name === "id") elem.style.display = "none";
            }
            let buttonDiv = document.createElement("div");
            let buttonSave = document.createElement("button");
            buttonSave.innerText = "Save";
            buttonSave.onclick = function (){
                addNewEmployee(this);
            }
            let buttonDelete = document.createElement("button");
            buttonDelete.innerText = "Delete";
            buttonDelete.onclick = function (){
                deleteEmployee(this);
            }
            rowDiv.appendChild(buttonDiv);
            buttonDiv.appendChild(buttonSave);
            buttonDiv.appendChild(buttonDelete);
        }
        let addIcon = document.createElement("span");
        addIcon.innerText = "+";
        addIcon.className = "add-new-employee";
        addIcon.style.cursor = "pointer";
        addIcon.onclick = function (){addRow(addIcon,mainDiv, dat)};
        mainDiv.appendChild(addIcon);
    });

function addRow(element,mainDiv, dat){
    let rowDiv = document.createElement("div");
    rowDiv.className = "row-div";
    mainDiv.appendChild(rowDiv);
    let div = document.createElement("div");
    rowDiv.appendChild(div);
    let fieldNames = Object.keys(dat.rows[0]);
    for(let i = 0; i < fieldNames.length; i++) {
        let elem = document.createElement("input");
        elem.name = fieldNames[i];
        elem.className = fieldNames[i];
        elem.value = "";
        div.appendChild(elem);
        if(elem.name === "id") elem.style.display = "none";
    }
    mainDiv.removeChild(element);
    let addIcon = document.createElement("span");
    addIcon.innerText = "+";
    addIcon.className = "add-new-employee";
    addIcon.style.cursor = "pointer";
    addIcon.onclick = function (){addRow(addIcon,mainDiv, dat)};
    mainDiv.appendChild(addIcon);

    let buttonDiv = document.createElement("div");

    let buttonSave = document.createElement("button");
    buttonSave.innerText = "Save";
    buttonSave.onclick = function (){
        addNewEmployee(this);
    }
    let buttonDelete = document.createElement("button");
    buttonDelete.innerText = "Delete";
    buttonDelete.onclick = function (){
        deleteEmployee(this);
    }
    rowDiv.appendChild(buttonDiv);
    buttonDiv.appendChild(buttonSave);
    buttonDiv.appendChild(buttonDelete);
}



function addNewEmployee(element){
    let elems = element.parentNode.previousSibling.getElementsByTagName("input");
    let reqBody = {};
    for(let k = 0; k < elems.length; k++){
        reqBody[elems[k].name] = elems[k].value;
    }
    fetch("/employee/add",{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(reqBody)
    }).then(data => console.log(data?.json()));
}

function deleteEmployee(element){
    let elems = element.parentNode.previousSibling.getElementsByTagName("input");
    let reqBody = {};
    for(let k = 0; k < elems.length; k++){
        if(elems[k].name === "id"){
            reqBody[elems[k].name] = elems[k].value;
        }
    }
    // fetch("/employee/delete",{
    //     method: "POST",
    //     headers: {"Content-Type": "application/json"},
    //     body: JSON.stringify(reqBody)
    // }).then(data => console.log(data?.json()));
    console.log(reqBody);
}








