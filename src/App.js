import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

function App() {
  const [items, setItems] = useState([]);
  const [newText, setNewText] = useState('');

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'items'), snapshot => {
      setItems(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return unsub;
  }, []);

  const addItem = async () => {
    if (!newText.trim()) return;
    await addDoc(collection(db, 'items'), { text: newText.trim() });
    setNewText('');
  };

  const updateItem = async (id, text) => {
    const ref = doc(db, 'items', id);
    await updateDoc(ref, { text });
  };

  const deleteItem = async id => {
    await deleteDoc(doc(db, 'items', id));
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Firebase CRUD Demo</h1>
      <div>
        <input
          value={newText}
          onChange={e => setNewText(e.target.value)}
          placeholder="Enter new item"
          style={{ padding: 8, width: '60%' }}
        />
        <button onClick={addItem} style={{ marginLeft: 8, padding: '8px 16px' }}>
          Create
        </button>
      </div>
      <ul style={{ padding: 0, marginTop: 20, listStyle: 'none' }}>
        {items.map(item => (
          <li key={item.id} style={{ marginBottom: 12 }}>
            <input
              value={item.text}
              onChange={e => updateItem(item.id, e.target.value)}
              style={{ padding: 6, width: '50%' }}
            />
            <button
              onClick={() => deleteItem(item.id)}
              style={{ marginLeft: 8, padding: '6px 12px' }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
