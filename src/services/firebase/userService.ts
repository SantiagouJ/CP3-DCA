import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { userType } from "../../utils/types";
import {db} from "./firebaseConfig";

export async function fetchUsers() : Promise<userType[]> {
    
    const usersRef = collection(db, "users" ); // referencia a la coleccion de usuarios
    const snapshot = await getDocs(usersRef); // obtiene los documentos de la coleccion
    const users: userType[] = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
            ...data,
            id: doc.id,
            username : data.username || "Terry perro malo"
        }
    })

    return users;
}

export async function addUser(user: userType): Promise<string | null> {
    try {
        const usersRef = collection(db, "users");
        const docRef = await addDoc(usersRef, {
            username: user.username
        })
        return docRef.id;
    } catch (error) {
        console.error("error ocasionado en agregar usuarios", error)
        return null;
    }
}

export async function deleteUser(userId: string) : Promise<void> {
    const usersRef = collection(db, "users");
    const docRef = doc(usersRef, userId);
    await deleteDoc(docRef);
}