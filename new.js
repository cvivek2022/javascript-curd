

"use strict";


// stick mood always use to code make your code strong and good practice for js developers

// display function 
let localObj = "";   

class Display {
    
    // add to UI
    add = () =>{

        let w  = localStorage.getItem('localkey');
        if (w == null){
        
            localObj = [] ; 
        }else{

            localObj = JSON.parse(w);
        }        
        let data = "";
        localObj.forEach((element, index) => {
           
            data += `<tr  id = ${index}>
                    <td>${index +1}</td>
                    <td>${element.lname}</td>
                    <td>${element.lauthor}</td>
                    <td>${element.ltype}</td>
                    <td>
                    <button  id="${index}" Onclick="editTble(this.id)" class="btn btn-success " data-toggle="modal" data-target="#${index}"><i class="fa fa-edit"></i></button> 
                    <button  id="${index}" class="btn  btn-danger" Onclick="deleteIteam(this.id)"><i class="fa fa-trash"></i></button>
                    </td>
                    </tr>`
        });
        
       let tablebody  = document.getElementById('tablebody');

        if (localObj.length > 0 ){
            
            tablebody.innerHTML = data;    

        } else{
            tablebody.innerHTML  = `<tr><td colspan="5">There Is No Book Added Please Add</td></tr>`;
        }


     }

    // clear form
    clear = () => {
        let myform  = document.getElementById('libraryForm');
        myform.reset();
    
    }


}


//------Add Book Function Data ----------------------

let addBook = document.getElementById('addme');


addBook.addEventListener('click', (e) => {

    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value; 
    let type = '';

    if(fiction.checked){
    type = fiction.value;
    }
    else if(programing.checked){
    type = programing.value;
    }
    else if(cooking.checked){
    type = cooking.value;
    }

    let w  = localStorage.getItem('localkey');
        if (w == null){

            localObj = [];
        }else{

            localObj = JSON.parse(w);
        }

    let mylocal = {
        lname:name,
        lauthor:author,
        ltype:type
    }

    if (name.length > 3 && author.length > 3){   

        localObj.push(mylocal)
        localStorage.setItem('localkey' , JSON.stringify(localObj));
        let bookdisplay = new Display();
        bookdisplay.add();
        bookdisplay.clear();
    }else {
        alert ("Please add maximum three word");
    }
   
    // let myBook = new Book(name, author, type);
    // console.log(myBook);

    e.preventDefault();
    
});


//------Delete Function Data ----------------------

 let deleteIteam = (index) => {
        let w  = localStorage.getItem('localkey');
        if (w == null){

            localObj = [];
        }else{

            localObj = JSON.parse(w);
        }
        let confrm = confirm("Are You Sure to Delete this item");
       
        if(confrm == true){
            localObj.splice(index, 1);
            localStorage.setItem('localkey' , JSON.stringify(localObj)); 
        }
        let bookdisplay = new Display();
        bookdisplay.add();

}

//------Edit Function OPEN Model Box ----------------------

let oldval ;
let mymodelObj;
let md = document.getElementsByClassName('editmodel')[0];
let beta = document.getElementsByClassName('beta')[0];
let editTble = (editid) =>{
    
    md.setAttribute('id' , editid);
    md.style.display = "block";
    beta.setAttribute('id', editid);
    //console.log(md);
   // console.log(md); 
    //console.log(beta);

    let w  = localStorage.getItem('localkey');
    if (w == null){

        localObj = [];
    }else{

        localObj = JSON.parse(w);
    }

    oldval = localObj[editid];
  //  console.log(oldval);
    let modelName = document.getElementById('modelBookname');
    let modelAuthor = document.getElementById('modelAuthorname'); 
    let modelType = '';


    if(modelFiction.checked){
        modelType = fiction.value;
    }
    else if(modelPrograming.checked){
        modelType = programing.value;
    }
    else if(modelCooking.checked){
        modelType = cooking.value;
    }

    
    mymodelObj  = {
        editName:modelName,
        editAuthor:modelAuthor,
        edittype:modelType
    };
  
   
    mymodelObj = oldval;
    
    modelName.value = mymodelObj.lname;
    modelAuthor.value =  mymodelObj.lauthor;
    modelType = mymodelObj.ltype;   

};


//------Close Function Model Box ----------------------

let cremove = document.getElementsByClassName('mdClose')[0];
cremove.addEventListener('click', ()=>{
   // console.log(cremove);
    md.style.display = "none";

})


//------Save Function Data ----------------------
    let saveData = (id) =>{
        let modelName = document.getElementById('modelBookname').value;
        let modelAuthor = document.getElementById('modelAuthorname').value; 
        let modelType = '';

        if(modelFiction.checked){
            modelType = fiction.value;
        }
        else if(modelPrograming.checked){
            modelType = programing.value;
        }
        else if(modelCooking.checked){
            modelType = cooking.value;
        }
        
        mymodelObj  = {
            lname:modelName,
            lauthor:modelAuthor,
            ltype:modelType
        };

      

        let w  = localStorage.getItem('localkey');
        if (w == null){
    
            localObj = [];
        }else{
    
            localObj = JSON.parse(w);
        }
        
    

        localObj[id] = (mymodelObj);

      
        localStorage.setItem('localkey' , JSON.stringify(localObj));
       // console.log(localObj);

        let bookdisplay = new Display();
        bookdisplay.add();
        
    }



//------Search Function Filter Data ----------------------

    let search = document.getElementById('searchText');
    search.addEventListener('input', ()  => {
       let inputVal = search.value.toUpperCase();
      //  console.log('input event fired', inputVal);
       
      let searchtbody = document.getElementById('tablebody');
      
      let searchtr = searchtbody.getElementsByTagName('tr');

     // console.log(searchtr);

    //----Use Array for Each metod 
       Array.from(searchtr).forEach((element, index)=> {
            let i = index;
           // console.log(i);
             let td = searchtr[i].getElementsByTagName('td')[1];
             let td1 = searchtr[i].getElementsByTagName('td')[2];
             let td2 = searchtr[i].getElementsByTagName('td')[3];
            // console.log(td, td1, td2);

             if(td || td1 || td2){
                //console.log(td, td1, td2);
  
                let textValue  =  td.textContent || td.innerHTML;
                let textValue1 = td1.textContent || td1.innerHTML;
                let textValue2 = td2.textContent || td2.innerHTML;
                if(textValue.toUpperCase().indexOf(inputVal) > -1 || textValue1.toUpperCase().indexOf(inputVal) > -1 || textValue2.toUpperCase().indexOf(inputVal) > -1){
                  searchtr[i].style.display = "";
                  
                  }else{
                      searchtr[i].style.display = "none";
                      
                }  
  
            }

       });


    //----Use normal for lOOP method------BOTh Code working----->
    
    
    //   for(let i=0; i<searchtr.length; i++){
    //      // console.log(i);
    //       let td = searchtr[i].getElementsByTagName('td')[1];
    //       let td1 = searchtr[i].getElementsByTagName('td')[2];
    //       let td2 = searchtr[i].getElementsByTagName('td')[3];
    //       console.log(td , td1, td2 );

    //       if(td || td1 || td2){
    //           //console.log(td, td1, td2);

    //           let textValue  =  td.textContent || td.innerHTML;
    //           let textValue1 = td1.textContent || td1.innerHTML;
    //           let textValue2 = td2.textContent || td2.innerHTML;
    //           if(textValue.toUpperCase().indexOf(inputVal) > -1 || textValue1.toUpperCase().indexOf(inputVal) > -1 || textValue2.toUpperCase().indexOf(inputVal) > -1){
    //             searchtr[i].style.display = "";
                
    //             }else{
    //                 searchtr[i].style.display = "none";
                    
    //           }  

    //       }
    //   }


    });




 //=Page Reload call funtion --

let bookdisplay = new Display();

window.onload = bookdisplay.add();





