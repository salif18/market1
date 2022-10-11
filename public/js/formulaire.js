//rediriger a la page d'acceuil si user se connect
window.onload = () =>{
    if(sessionStorage.user){
        user = JSON.parse(sessionStorage.user);
        if(compareToken(user.authToken, user.email)){
            location.replace('/home');
        }
    }
}

const loader = document.querySelector('.loader');
//selection des inputs
const submitBtn = document.querySelector('.submit-btn');
const nom = document.querySelector('#nom') || null;
const prenom = document.querySelector('#prenom');
const address = document.querySelector('#address');
const email = document.querySelector('#email');
const password =document.querySelector('#password');
const numero = document.querySelector('#number') || null;
const tac = document.querySelector('#terms-and-cond') || null;
const notification = document.querySelector('#notification') || null;

submitBtn.addEventListener('click',()=>{
  if(nom != null){//overture de la page
    if(nom.value.length < 3){
        showAlert('Le nom doit etre compose de plus de  3 lettres ');
    }else if(!prenom.value.length){
        showAlert('Entrer votre prenom');
    }else if(!address.value.length){
        showAlert('entrer votre address');
     } else if(!numero.value.length == 8){
        showAlert('entrer votre numero de telephone');
    }else if(!email.value.length){
        showAlert('Entre votre email')
    }else if(!password.value.length >= 8){
        showAlert('Le mot de passe doit etre compose de plus de 8 carracteres');
    }else if(!tac.checked){
        showAlert('Tu dois accepter notre condition')
    }else{
        //submit form
        loader.style.display = 'block';
        sendData('/auth',{
            nom:nom.value,
            prenom:prenom.value,
            address:address.value,
            numero:numero.value,
            email:email.value,
            password:password.value,
           
           // tac:tac.checked,
           // notification:notification.checked,
           // seller:false
          

        })
        
       
     }
    }else{
        //ouvrir page
        if(!email.value.length || !password.value.length){
            showAlert('fill all the inputs');
        }else{
             //submit form
        loader.style.display = 'block';
       sendData('/auth',{

            email:email.value,
            password:password.value,
          
        })
        }
   }
})

