import { addPost, getPostByUserId } from "../services/firebase/postService";
import { fetchUsers, addUser, deleteUser } from "../services/firebase/userService";
import { postType, userType } from "../utils/types";

class FirebaseComponent extends HTMLElement {
    private users: userType[] = [];
    private posts: postType[] = [];
    
    constructor(){
        super()
        this.attachShadow({mode : "open"})
    }

    async connectedCallback(){
        this.users = await fetchUsers();
        this.render();
    }

    async handleDeleteUser(userId : string) {
        await deleteUser(userId);
        this.users = this.users.filter(user => user.id !== userId);
        this.render();
    }

    async handleViewPost(userId : string) {
        this.posts = await getPostByUserId(userId);
        this.render()
    }

    render(){
        if(!this.shadowRoot) return ;

        this.shadowRoot.innerHTML = `
        <div>
        <h1> componente firebase </h1>
        <p> lista de usuaruos </p>
        <ul>
        ${this.users.map( user => `
            <li>
                Nombre de usuario: ${user.username}
            </li>
            <button data-user-id="${user.id}">ver posts</button>
            <button data-delete-user="${user.id}">eliminar usuario</button>
            ${
                this.posts.length > 0 && this.posts.some(post => post.userId === user.id)
                ? `<ul>
                    ${this.posts.filter(post => post.userId === user.id).map(post => `
                    <li>${post.content} (creado en: ${post.createdAt}</li>
                    `).join("")}
                </ul>

                `
                : ""
            }
            `
        ).join("")}
        </ul>

        <H2>Formulario para postear</H2>
        <form id= "postForm">
            <label for= "userSelect">Selecciona el usuario: </label>
            <select id= "userSelect" name= "userSelect" required>
            <option value= "">Seleccione un usario</option>
            ${this.users.map(user => `
                    <option value = "${user.id}">${user.username}<option
                `).join("")}
            </select>
            <label for= "content">escribe contenido:</label>
            <input type= "text" id= "content" name="content" required>
            <button type= "submit"> Emviar </button>
        </form>
        </div>

        <h2>Formulario para agregar usuario</h2>
        <form id= "userForm">
            <label for= "username">Nombre de usuario:</label>
            <input type= "text" id= "username" name= "username" required>
            <button type= "submit">Agregar usuario</button>
        </form>
        `
        this.shadowRoot.querySelectorAll("button[data-user-id]").forEach(button => {
            button.addEventListener("click", (event) => {
                const userId = (event.target as HTMLButtonElement).dataset.userId;
                if (userId) {
                    this.handleViewPost(userId);
                }
            })
        })

        this.shadowRoot.querySelectorAll("button[data-delete-user]").forEach(button => {
            button.addEventListener("click", (event) => {
                const userId = (event.target as HTMLButtonElement).dataset.deleteUser;
                if (userId) {
                    this.handleDeleteUser(userId);
                }
            })
        })

        const userForm = this.shadowRoot.querySelector("#userForm") as HTMLFormElement;
        if (userForm) {
            userForm.addEventListener("submit", async (event) => {
                event.preventDefault();
                
                const formData = new FormData(userForm);
                const formObject : Record<string, string> = {};

                formData.forEach((value, key) => {
                    formObject[key] = value.toString();
                })
                console.log(formObject);

                if (Object.keys(formObject).length > 0) {
                    const userId = await addUser(formObject as userType);
                    if (userId) {
                        console.log("usuario añadido con identificador: ", userId);
                    }
                }

            })
        }

        const postForm = this.shadowRoot.querySelector("#postForm") as HTMLFormElement;
        if (postForm) {
            postForm.addEventListener("submit", async (event) => {
                event.preventDefault();

                const formData = new FormData(postForm);
                const formObject : Record<string, string> = {};

                formData.forEach((value, key) => {
                    formObject[key] = value.toString(); 
                })

                console.log(formObject);

                if (Object.keys(formObject).length > 0) {
                    const postId = await addPost({
                        userId: formObject.userSelect,
                        content: formObject.content
                    } as postType)

                    postForm.reset();
                    if (postId) {
                        console.log("post añadido con identificador: ", postId);
                        
                    } else {
                        console.error("error guardando el post");
                    }
                } else {
                    console.error("el formulario esta vacio");
                }
                
            })
        }
    }
}

export default FirebaseComponent