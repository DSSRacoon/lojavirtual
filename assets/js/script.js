console.log('Hello World!');

let validator = {
    handleSubmit: (evento)=>{
        evento.preventDefault();

        let send = true;
        validator.clearError();
        
        let inputs = document.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++){
            let input = inputs[i];
            let check = validator.checkInput(input);
            
            if(check !== true){
                send = false;
                console.log(check);
                validator.showError(input, check);
            }
            
        }
        
        if(send){
            console.log('Formulario enviado');
            form.submit();
        }
    },
    checkInput:(input)=>{
        let regras = input.getAttribute('data-regras');
        if(regras !== null){
            regras = regras.split('|');
            console.log('Atencao ',regras);
            for(let k in regras){
                let regraDetails = regras[k].split('=');
                switch(regraDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Preenchimento Obrigatorio!!';
                        }
                    break;
                    case 'min':
                        if(input.value.length < regraDetails[1]){
                            return 'Minimo de caracteres: ' + regraDetails[1];
                        }
                        
                    break;
                    case 'email':
                        if(input.value != ''){
                            let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                            if(!regex.test(input.value)){
                                return 'Email invalido!!';
                                }
                        }
                    break;
                    case 'senha':
                        if(input.value != ''){
                            let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
                            if(!regex.test(input.value)){
                                return 'Senha invalida!!';
                            }          
                         }
                    break;
                }
            }
        }
        return true;
    },
    showError: (input, error)=>{
        input.style.borderColor = '#FF0000';
        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;
        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearError: ()=>{
        let inputs = form.querySelectorAll('input');

     /*   Meu Metodo, deu certo tambem.
     inputs.forEach((inputs)=>{
            inputs.style.borderColor = '';
        })*/

         //  Metodo Professor Abaixo:
        for(let i = 0;i < inputs.length; i++){
            inputs[i].style.borderColor = '';
        }

        let errorElement = document.querySelectorAll('.error');
        for(let i = 0; i < errorElement.length; i++){
            errorElement[i].remove();
            
        }
    }

};

let form = document.querySelector('.b7Validator');
form.addEventListener('submit', validator.handleSubmit);