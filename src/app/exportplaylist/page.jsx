"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AES, enc } from "crypto-js";
import Layout from "../Components/Layout";
const Export = () => {
  const [importtext, setImportText] = useState("");
  const secret = "test key";

  const ExportFunction = (e) => {
    if (localStorage.getItem("Playlists") === null) {
      toast.error("no playlists");
    } else {
      const playlist = localStorage.getItem("Playlists");
      const cipherText = AES.encrypt(playlist, secret);
      navigator.clipboard.writeText(cipherText);
      toast.success("Copies!");
    }
  };

  const ImportFunction = (e) => {
    let bytes;
    if (importtext === "") {
      toast.error("Plz Enter Code");
    } else if (
      importtext.includes("{") ||
      importtext.includes(":") ||
      importtext.includes("[")
    ) {
      toast.error("Wrong code");
    } else {
      try {
        bytes = AES.decrypt(importtext, secret);
        const decrypted = bytes.toString(enc.Utf8);
        const dataaa = JSON.parse(decrypted);
        localStorage.setItem("Playlists", JSON.stringify(dataaa));
        setImportText("");
        toast.success("IMPORTED !");
      } catch (err) {
        console.log("UNABLE TO DECIPHER", err);
        toast.error("Wrong Data");
      }
    }
  };

  const ImportOneHandler = (e) => {
    let bytes;
    if (importtext === "") {
      toast.error("Plz Enter Code");
    } else if (
      importtext.includes("{") ||
      importtext.includes(":") ||
      importtext.includes("[")
    ) {
      toast.error("Wrong code");
    } else {
      try {
        bytes = AES.decrypt(importtext, secret);
        const decrypted = bytes.toString(enc.Utf8);
        const dataaa = JSON.parse(decrypted);
        const pname = Object.keys(dataaa)[0];
        localStorage.setItem(
          "Playlists",
          JSON.stringify({
            ...JSON.parse(localStorage.getItem("Playlists")),
            [pname]: dataaa[pname],
          })
        );
        toast.success("Exported");
      } catch (err) {
        console.log("UNABLE TO DECIPHER", err);
        toast.error("Wrong Data");
      }
    }
  };

  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={300}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div
        className="container"
        style={{ background: "cream ", height: "100vh", width: "100vw" }}
      >
        <div
          className="main"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "25px",
          }}
        >
          {/* <h3>EXPORT</h3> */}
          <button className="btn btn-dark" onClick={ExportFunction}>
            EXPORT
          </button>
          <h3>or</h3>
          <button className="btn btn-dark" onClick={ImportFunction}>
            Import
          </button>
          <textarea
            className="form-control"
            placeholder="Code goes here..."
            style={{
              marginTop: "15px",
              width: "500px",
              textAlign: "center",
              backgroundColor: "wheat",
            }}
            value={importtext}
            type="text"
            onChange={(e) => setImportText(e.target.value)}
          />
          <button
            className="btn btn-dark"
            onClick={ImportOneHandler}
            style={{ marginTop: "20px" }}
          >
            Import One
          </button>
          <textarea
            className="form-control"
            placeholder="Code goes here..."
            style={{
              marginTop: "15px",
              width: "500px",
              textAlign: "center",
              backgroundColor: "wheat",
            }}
            value={importtext}
            type="text"
            onChange={(e) => setImportText(e.target.value)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Export;
