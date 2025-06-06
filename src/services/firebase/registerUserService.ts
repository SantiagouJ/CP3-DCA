import {createUserWithEmailAndPassword,} from "firebase/auth";
import { doc, setDoc} from "firebase/firestore";
import { db, auth } from "./firebaseConfig";


const registerUser = async (email: string, password: string, username: string) => {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

		// Save extra user info in Firestore
		await setDoc(doc(db, "users", user.uid), {
			email: user.email,
			username: username,
            name: username,
			createdAt: new Date()
		});

        return { isRegistered: true, user: userCredential };
	} catch (error) {
		console.error(error);
		return { isRegistered: false, error: error };
	}
};

export {registerUser}
