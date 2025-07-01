        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
        import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-firestore.js";

        const firebaseConfig = {
            apiKey: "AIzaSyAuNctY2mqUZKvQlP8US7TWpJV5_Aj4Zzs",
            authDomain: "ff-centrofitness.firebaseapp.com",
            projectId: "ff-centrofitness",
            storageBucket: "ff-centrofitness.firebasestorage.app",
            messagingSenderId: "501372129487",
            appId: "1:501372129487:web:8ef9ed0be21d4e2466a7ba",
            measurementId: "G-W8B9L0BWBY"
        };

        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);

        window.guardarPedidoEnFirebase = async function (pedido) {
            try {
                await addDoc(collection(db, "pedidos"), pedido);
            } catch (e) {
                console.error("Error al guardar pedido:", e);
            }
        };