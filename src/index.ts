import Root from "./Root/Root";
import FirebaseComponent from "./components/firebaseComponent";
import { LogInComp } from "./components/login";
import { SignUpComp } from "./components/signUp";


customElements.define('root-element', Root);
customElements.define("signup-comp", SignUpComp)
customElements.define("login-comp", LogInComp)
customElements.define("firebase-element", FirebaseComponent)

