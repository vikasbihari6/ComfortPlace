const searchFx=()=>{
    let filter=document.getElementById('myInput').value.toUpperCase();
  
    let myNames=document.getElementById('myUl');
    let cont=myNames.getElementsByClassName("card-container");
    let names=myNames.getElementsByClassName("card-title");
    
    for(var i=0;i<names.length;i++){
      var title=names[i].innerText;
      if(title.toUpperCase().indexOf(filter)!=-1){
        cont[i].style.display="block";
      }
      else{
        cont[i].style.display="none";
      }
    }
  } 