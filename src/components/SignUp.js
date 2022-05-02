import React, { useState, useRef } from 'react';
import { auth } from "../utils/firebase.config";

const SignUp = () => {

    const registerEmail = useRef(); 
    const registerPassword = useRef();
    const [displayName, setDisplayName] = useState("");

    const handleRegister = (e) => {
        e.preventDefault();

        try {
          auth.createUserWithEmailAndPassword(
            registerEmail.current.value, registerPassword.current.value) // Appelle BDD + Création User, Fonction Firebase;
          .then(async (userAuth) => {
            await userAuth.user.updateProfile({ // Ajout Pseudo;
                displayName: displayName,
            });
            window.location.reload(); // Car problème d'async lors de la création d'un user ( user?.displayName[0] dans app.js );
          });
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className="signup-container">

            <div className="signup">
                <h3>S'inscrire</h3>

                <form onSubmit= { (e) => handleRegister(e) }>
                    <input type="text" placeholder="Pseudo" required onChange={ (e) => setDisplayName(e.target.value) }/>
                    <input type="email" placeholder="Email" required ref={ registerEmail } />
                    <input type="password" placeholder="Mot de passe" required ref={ registerPassword } />
                    <input type="submit" value="Valider" />
                </form>

            </div>

        </div>
    );
};

export default SignUp;