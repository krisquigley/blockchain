import "./styles.css";
import CryptoJS from "crypto-js";
import React, { useState } from "react";

export default function App() {
  const [input, setInput] = useState("");
  const [nonce, setNonce] = useState(0);
  const [hash, setHash] = useState("");

  const generateHash = (message: string) => {
    return CryptoJS.SHA256(message);
  };

  const calculateHashWithNonce = (nonce: number) => {
    return generateHash(`${input}${nonce}`).toString(CryptoJS.enc.Hex);
  };

  const mine = () => {
    let tryNonce = 0;
    while (calculateHashWithNonce(tryNonce).substr(0, 4) !== "0000") {
      tryNonce++;
    }
    setHash(calculateHashWithNonce(tryNonce));
    setNonce(tryNonce);
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    mine();
  };

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setInput(ev.target.value);
  };

  return (
    <div className="App">
      <h1>generateHash</h1>
      <form onSubmit={handleSubmit}>
        <input onChange={handleChange} value={input} placeholder="message" />
        <button>Generate Hash</button>
      </form>
      <p>Hash: {hash}</p>
      <p>Nonce: {nonce}</p>
    </div>
  );
}
