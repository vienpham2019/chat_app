import { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

firebase.initializeApp({
  apiKey: "AIzaSyCBOKpdTXk2qNkNPEQHni_K8iGFrwfNHJ4",
  authDomain: "chat-app-demo-8fd5c.firebaseapp.com",
  projectId: "chat-app-demo-8fd5c",
  storageBucket: "chat-app-demo-8fd5c.appspot.com",
  messagingSenderId: "793916497282",
  appId: "1:793916497282:web:30eb9e8136735c4e59039b",
  measurementId: "G-MYL2JL4RV9",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

export default function App() {
  return (
    <div>
      <ChatRoom />
    </div>
  );
}

function ChatRoom() {
  const [formValue, setFormValue] = useState("");
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt");
  const [messages] = useCollectionData(query);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setFormValue("");
  };
  return (
    <div>
      {messages && messages.map((smg, id) => <div key={id}>{smg.text}</div>)}
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={formValue}
            onChange={(e) => setFormValue(e.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}
