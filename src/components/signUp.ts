import { registerUser } from "../services/firebase/registerUserService"

class SignUpComp extends HTMLElement {

  constructor() {
    super()
    this.attachShadow({ mode: "open" })
  }

  connectedCallback(){
    this.render()
  }
  
  

  render(): void {
    if (!this.shadowRoot) return
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0">
                <link rel="stylesheet" href="styles/signUpComp.css">

                <div id="createPost-container">
                    <div id="createPost-info">
                        <h2 class="login-title">Sign up</h2>
                        <p class="welcome-text">Welcome to MOODJ! please create your account</p>
                        <form id="register-form">
                            <label for="username">Username</label>
                            <input type="text" name="username" id="username" placeholder="Enter username">
                            <label for="email">Email</label>
                            <input type="email" name="email" id="email" placeholder="Enter email">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter password">
                            <label for="password">Confirm Password</label>
                            <input type="password" name="password" id="confirm-password" placeholder="Enter password">
                            <button type="submit" class="login-btn">Sign up</button>
                            <div class="forgot-row">
                                <a href="#" class="forgot-link" id="login-btn">Already have an account? sign in</a>
                            </div>
                        </form>
                    </div>
                     <div class="forgot-row-mobile">
                                <a href="#" class="forgot-link">Already have an account? sign in</a>
                    </div>

                </div>
    
    ` 
        const form = this.shadowRoot!.querySelector<HTMLFormElement>('#register-form')!;

        form.addEventListener("submit", (e)=>{
          e.preventDefault()
          const formData = new FormData(form)
          const data = {
            username: formData.get('username') as string,
            name: formData.get('name') as string,
            email: formData.get('email') as string,
            password: formData.get('password') as string,
          }
          if (data.password.length < 6) {
                alert('La contraseña debe tener al menos 6 caracteres.');
                return;
          }
          registerUser(data.email, data.password, data.username)
            .then((response)=>{
              if (!response.isRegistered) {
                        console.error('Error al registrar el usuario:', response.error);
                        alert('Error al registrar el usuario. Por favor, verifica tus datos.');
                        return;
                    }
                })
                .catch((error) => {
                    console.error('Error al registrar el usuario:', error);
                    alert('Ocurrió un error. Por favor, intenta nuevamente.');
                });
        })

  }
    
}

export {SignUpComp}