let name=document.querySelector("#name");
let Position=document.querySelector("#Position");
let inputSalary=document.querySelectorAll("#inputSalary input");
let department=document.querySelector("#department");
let count=document.querySelector("#count");
let btnCreate=document.querySelector("#btnCreate");
let tbody=document.querySelector("#tbody");
let deleteAllBtn=document.getElementById("deleteAllBtn");
let spanCounterTask=document.getElementById("spanCounterTask");
let body=document.querySelector("body");
let titleModal=document.getElementsByClassName("titleModal");
let globalId;
// let realModel=``
let mood='create';
let col_department=document.getElementById("col_department");
// localStorage.clear(
let btnIcon=document.getElementById("btnIcon");
let This=document.getElementById("This");
// console.log(This.textContent);
let iconClick=()=>{
    if(body.classList.contains("dark")){
        body.classList.remove("dark");
        // body.classList.add("text-white");
        btnIcon.classList.remove("iconWhite");
        btnIcon.classList.remove("text-white");
        btnIcon.classList.add("iconBlack");
        btnIcon.classList.add("text-dark");
        // document.querySelector("#bodyModal").style.backgroundColor="#0000004b";
    }
    else{
        btnIcon.classList.add("iconWhite");
        btnIcon.classList.add("text-white");
        body.classList.add("dark");
        body.classList.add("text-dark");
        // document.querySelector("#bodyModal").style.backgroundColor="#0000004b";
        // body.classList.remove("text-white");
        // This.classList.add("text-warning");

    }
}
btnIcon.addEventListener("click",iconClick);
let employee;
if(localStorage.employee==null)
employee=[];
else employee=JSON.parse(localStorage.employee);

// check if your employee array is empty ?
let checkIfEmpty=()=>{
    if(localStorage.length==0  || employee.length==0)deleteAllBtn.classList.add("none");
    else deleteAllBtn.classList.remove("none");
}
// get span counter

let spanCounterTaskLength=()=>{
    spanCounterTask.innerHTML=employee.length;
}
spanCounterTaskLength();
// get Salary
let getSalary=()=>{
    let TAX=inputSalary[0].value;
    let GROSS=inputSalary[1].value;
    let tranCost=inputSalary[2].value;
    let Bouns=+inputSalary[3].value;
    let Total=+inputSalary[4].value;
    inputSalary[4].value=-GROSS*(+TAX/100)-+tranCost+Bouns+ +GROSS;
}

for(let i=0;i<inputSalary.length;i++)
{
    inputSalary[i].addEventListener("keyup",getSalary);
}

// resetfunction 

let resetFunction=()=>{
    name.value='';
        Position.value='';
        department.value='';
         inputSalary[1].value='';
        inputSalary[0].value='';
         inputSalary[2].value='';
         inputSalary[3].value='';
         inputSalary[4].value='';
         count.value='';
 }
// create an object
spanCounterTaskLength();
let createNewObject=()=>{

    let newObject1={
        name:name.value,
        Position:Position.value,
        department:department.value,
        GROSS:inputSalary[1].value,
        TAX:inputSalary[0].value,
        tranCost:inputSalary[2].value,
        Bouns:inputSalary[3].value,
        Total:inputSalary[4].value,
        count:count.value,
    }
    if(newObject1.name=="" ||newObject1.Position==""  ||newObject1.GROSS==""
      ||newObject1.department=="" ||newObject1.TAX=="" ||newObject1.tranCost==""
      ||newObject1.Bouns=="")
      {
        window.alert("Please Complete Your Data!!");
      }
      else {
          if(mood=="create"){
        for(let _=0;_<newObject1.count;_++)
        employee.push(newObject1);
    }
    else {
        employee[globalId]=newObject1;
        mood='create';
        count.classList.remove("none");
        btnCreate.innerHTML=`Create a new Employee`;
        btnCreate.classList.replace("btn-warning","btn-info");
        col_department.classList.replace("col-md-12","col-md-6");
    }
      }
  
    spanCounterTaskLength(); 
    // for(let i=0;i<newObject1.count;i++)
    
    // localStorage.clear();
    // localStorage.setItem("myArray",employee);
    // console.log(employee);
    // localStorage.setItem(JSON.stringify("myDrop",employee));
    localStorage.setItem("employee",JSON.stringify(employee));
    showData();
    resetFunction();
    checkIfEmpty();
}
// after click on btnCreate
 /*
            <td>
                ${employee[i].GROSS}
            </td>
            <td>
                ${employee[i].TAX}
            </td>
            <td>
                ${employee[i].tranCost}
            </td>
            
            <td>
                ${employee[i].Bouns}
            </td>
            <td>
                ${employee[i].Total}
            </td>
            */
btnCreate.addEventListener("click",createNewObject);
let clickEye=(i)=>{
    // document.querySelector(".ourModal").classList.remove("d-none");
    // document.querySelector(".ourModal").classList.add("d-none");
    titleModal.innerHTML=employee[i].name;
}

let changeModalData=(i)=>{
    document.querySelector("#exampleModalLabel").innerHTML=`<h1 class="modal-title fs-5 titleModal" id="exampleModalLabel">${employee[i].name}</h1>`;
    document.querySelector("#bodyModal").innerHTML=`
    <h3 class="modal-title fs-5 titleModal" id="exampleModalLabel2 text-info">Department : ${employee[i].department}</h3>
    <hr>
    <h3 class="modal-title fs-5 titleModal" id="exampleModalLabel2">Gross : ${employee[i].GROSS}$</h3>
    <hr>
    <h3 class="modal-title fs-5 titleModal" id="exampleModalLabel2">Taxes : ${employee[i].TAX}%</h3>
    <hr>
    <h3 class="modal-title fs-5 titleModal" id="exampleModalLabel2">Cost of trans : ${employee[i].tranCost}$</h3>
    <hr>
    <h3 class="modal-title fs-5 titleModal" id="exampleModalLabel2">Bouns : ${employee[i].Bouns}$</h3>
    <hr>
    <h3 class="modal-title fs-5 titleModal" id="exampleModalLabel2">Total : ${employee[i].Total}$</h3>`;
    showData();
}
let showData=()=>{
    let allRows='';
    for(let i=0;i<employee.length;i++)
    {
        allRows+=`
        <tr>
            <td class="text-center">
                ${i+1}
            </td>
            <td class="text-center">
                ${employee[i].name}
            </td>
            <td class="text-center">
                ${employee[i].Position}
            </td>
            
            <td class="text-center hiddenTh">
                ${employee[i].GROSS}
            </td>
            <td class="text-center hiddenTh">
                ${employee[i].TAX}
            </td>
            <td class="text-center hiddenTh">
                ${employee[i].tranCost}
            </td>
            <td class="text-center hiddenTh">
                ${employee[i].Bouns}
            </td>
            <td class="text-center hiddenTh">
                ${employee[i].Total}
            </td>
            
            <td class="text-center viewTh">
            <i onclick="changeModalData(${i})" class="fa-solid fa-eye" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>
            </td>
           
            <td class="text-center">
             <i class="fa-solid fa-trash text-danger" onclick="removeOneItem(${i})" ></i>
            </td>
            <td class="text-center">
            <i  class=" fa-solid fa-pen-to-square text-warning" onclick="updateOneItem(${i})" ></i>
            </td>
        </tr>`;
    }
    tbody.innerHTML=allRows;
    checkIfEmpty();
}
let ourTable=document.getElementById("ourTable");
let _first=document.getElementById("_first");
showData();
// delete this data
let removeAllData = ()=>{

    localStorage.clear();

    employee.splice(0);

    console.log(employee);

    showData();

    spanCounterTaskLength(); 
//     document.getElementById("ourTable").innerHTML='';
//     ourTable.innerHTML=` <table class="table table-dark" id="ourTable">
//     <tr id="_first">
//         <th>Id</th>
//         <th>Name</th>
//         <th>Position</th>
//         <th>GROSS</th>
//         <th>Tax</th>
//         <th>TransCost</th>
//         <th>Bouns</th>
//         <th>Total</th>

//     </tr>
//     <tbody id="tbody">
            
//     </tbody>
// </table>`;
checkIfEmpty();

}
// remove one element
let removeOneItem=(i)=>{
    if(confirm("Are You Sure ?")){
        employee.splice(i,1);
        localStorage.employee=JSON.stringify(employee);
        showData();
    }
}

/// update your data item
let updateOneItem=(i)=>{
        mood="update";
        globalId=i;
        name.value=employee[i].name;
        Position.value=employee[i].Position;
        department.value=employee[i].department;
         inputSalary[0].value=employee[i].TAX;
        inputSalary[1].value=employee[i].GROSS;
         inputSalary[2].value=employee[i].tranCost;
         inputSalary[3].value=employee[i].Bouns;
         inputSalary[4].value=employee[i].Total;
         count.classList.add("none");
         btnCreate.innerHTML=`Update employee number : ${i+1}`;
         btnCreate.classList.replace("btn-info","btn-warning");
         col_department.classList.replace("col-md-6","col-md-12");
        //  mood='create';
}


deleteAllBtn.addEventListener("click",removeAllData);
// titleModal.innerHTML=
// console.log(titleModal.innerHTML);
// let document.querySelector("#exampleModalLabel").innerHTML=`<p>hello world</p>`;
// console.log(document.querySelector("#exampleModalLabel").innerHTM);