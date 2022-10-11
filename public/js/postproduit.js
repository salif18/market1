

const button = document.querySelector('#btn');
button.addEventListener('click',()=>{
    const Produits = {
    titre:document.querySelector('#titre').value,
    imageUrl:document.querySelector('#imagefile').value,
    description:document.querySelector('#desc').value,
    prix:document.querySelector('#prix').value
}
    localStorage.setItem('Produits',JSON.stringify(Produits));
    console.log(Produits)

    const env = async () => {
        try{
            const res = await fetch('http://localhost:3800/produits',{
                method:'post',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(Produits)
            })
            if(res.ok){
                const data = await res.json()
            }else{
                console.error('erreur',res.status)
            }
    

        }catch(error){
            console.log(error)
        }
    };
    env();
})