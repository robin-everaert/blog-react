import React, { useRef } from 'react';
import { addDoc, collection } from "firebase/firestore";
import { db } from '../utils/firebase.config';

const CreatePost = ({ uId, displayName }) => {

    const message = useRef();

    const handlePost = async (e) => { // Post;
        e.preventDefault();

        const data = { // Obj à envoyer en Bdd;
            author: displayName,
            authorId : uId,
            message : message.current.value,
            comments: null,
            date: Date.now(),
        };
        await addDoc(collection(db, "posts"), data ); // Fonction Firebase;
        message.current.value = "";
    }

    return (
        <div>

            <div className="new-post-modal">
                <form onSubmit={ (e) => handlePost(e) }>
                    <textarea placeholder="Votre Message..." ref={ message }></textarea>
                    <input type="submit" value="Envoyer" />
                </form>
            </div>
            
        </div>
    );
};

export default CreatePost;