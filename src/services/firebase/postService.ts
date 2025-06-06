import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { postType } from "../../utils/types";
import {db} from "./firebaseConfig";

export async function getPostByUserId(userId : string): Promise<postType[]> {
    const postRef = collection(db, "posts");
    const q = query(postRef, where("userId", "==", userId))
    const snapshot = await getDocs(q)
    const posts : postType[] = snapshot.docs.map(doc =>{
        const data = doc.data();
        return {
            ...data,
            id : doc.id,
            content: data.content || "No content",
            userId: data.userId || userId,
            createdAt: data.createdAt?.toDate().toISOString() || "No Date"
        }
    })

    return posts 
}


export async function addPost(post: postType): Promise<string | null> {
    try {
        const postRef = collection(db, "posts");
        const docRef = await addDoc (postRef, {
            userId: post.userId,
            content: post.content,
            createdAt: new Date()

        })
        
        return docRef.id
    } catch (error) {
        console.error("error ocasionado en agregar posts", error)
        return null
    }
}  