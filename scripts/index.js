const btnsigIn=document.getElementById("sigIn"), btnsignUp= document.getElementById("sign-up"), formRegister=document.querySelector(".register"),formLogin= document.querySelector(".login");
btnsigIn.addEventListener("click", e =>{
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide")
})
btnsignUp.addEventListener("click", e =>{
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide")
})
