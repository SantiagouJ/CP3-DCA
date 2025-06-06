class LogInComp extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {

        if (this.shadowRoot) {

            this.shadowRoot.innerHTML = `


            <link rel="stylesheet" href="./styles/logIn.css">
            
            <div class="container">
                <div class="card">
                    <div class="text-elements">
                        <h2 class="login-title">Login</h2>
                        <p class="welcome-text">Welcome back! Please log in to<br>your MOODJ account</p>
                    </div>
                    <div class="form-elements">
                        <form id="login-form">
                            <label for="username">Email</label>
                            <input type="text" id="email" name="email" placeholder="Enter email">
                            <label for="password">Password</label>
                            <input type="password" name="password" id="password" placeholder="Enter password">
                            <button type="submit" class="login-btn">Log in</button>
                        </form>
                        <div class="signup-row">
                            <span>New user? </span><a href="#" class="signup-link">sign up</a>
                        </div>
                    </div>
                </div>

                <div class="bottom-container"> 

                    <div class="circle-container-mobile">
                            <img class="yellow-circle-mobile" src="/images/moods2/happy-yellow-circle.svg" alt="">
                            <img class="red-circle-mobile" src="/images/moods2/happy-red-circle.svg" alt="">
                        </div>

                </div>

  </div>
                        
            `;

        }
    }
}

export {LogInComp};


