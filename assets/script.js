let tick=document.querySelectorAll('.tick')
let addBtn=document.querySelector('#addBtn')
const Description=document.querySelector('#Description')
const categorySelect = document.getElementById('categorySelect');
const date=document.querySelector('#Date')
const deleteBtns=document.querySelectorAll('.deletebtn')
const container4=document.querySelector('#container4')

let postTask=()=>{
    const selectedValue = categorySelect.value;
    let data={
        Description:Description.value,
        selectedOpt:selectedValue,
        date:date.value
    }

    if( Object.values(data).some(value => value === null || value === '')){
        let errormsgg={
            type:'error',
            text:'Enter complete details'
        }
        ShowError(errormsgg)
        return 
    }
    let then=new Date(data.date)
    let now=new Date()
    if(then<now){
        let errormsgg={
            type:'error',
            text:'The date has already gone'
        }
        ShowError(errormsgg)
        return
    }
    
    fetch('/create/task',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(data)
    }).then(result=>{
        return result.json()
    }).then(returned=>{
        dynamicAddition(returned)
    }).catch(err=>{
        console.log(err)
    })
}

tick.forEach(checkbox=>{
    checkbox.addEventListener('change',()=>{
        checkBox(checkbox.getAttribute('id'))
    })
})
deleteBtns.forEach(deletebtnEach=>{
    deletebtnEach.addEventListener('click',()=>{
        deletepost(deletebtnEach.getAttribute('id'))
    })
})

let checkBox=(id)=>{
    fetch('/change/tick',{
        method:'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({id:id})
    }).then(result=>{
        return result.json()
    }).then(returned=>{
        
    }).catch(err=>{
        console.log(err)
    })
}

let deletepost=(id)=>{
    let specificElement=document.querySelector(`div[element="${id}"]`)
    specificElement.parentNode.removeChild(specificElement)
    fetch(`/delete/task/?id=${id}`,{
        method:'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(result=>{
        return result.json()
    }).then(returned=>{
    }).catch(err=>{
        console.log(err)
    })
}


let dynamicAddition=(task=>{
    let works=document.createElement('div')
    works.setAttribute('class','works')
    works.setAttribute('element',task._id)
    works.innerHTML=
        `
            <div class="mainpart">
                <input id="${task._id}" class="tick" type="checkbox"></input>
                <div class="taskstodo">
                    <p class="DescriptionD">${task.Description}</p>
                    <h3 class="dateD">${task.Date}</h3>
                </div>
            </div>
            <div class="categoryDiv">
                <div class="${task.Category} categorySelect">${task.Category}</div>
                <button id="${task._id}" class="deletebtn fa fa-trash-o" style="background-color: rgb(148, 49, 49);"></button>
            </div>
        `
    
        let newBtn=works.querySelector('.deletebtn')
        newBtn.addEventListener('click',()=>{
            deletepost(task._id)
        })
    container4.prepend(works)
})

let ShowError=(error)=>{
    let errorMsg=document.getElementById('errorMsg')
    errorMsg.innerHTML=error.text
    errorMsg.style.display='inline-block'
    errorMsg.setAttribute('class',error.type)
    setTimeout(()=>{
        errorMsg.style.display='none'
        errorMsg.setAttribute('class','noError')
    },1500)
}