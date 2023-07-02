"use client";
import React, { useEffect, useState } from "react";
import ScaleLoader from "react-spinners/ScaleLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShareFromSquare } from "@fortawesome/free-solid-svg-icons";
import { AES } from "crypto-js";
import "../Components/PlaylistComponent.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Layout from "../Components/Layout";
export default function SearchComponent() {
  const [loader, setloader] = useState(true);
  const [availableplaylist, setAvailablePlaylist] = useState(false);
  const [deleteflag, setDeleteFlag] = useState(false);
  const [importtext, setImportText] = useState("");
  const [importflag, setImportFlag] = useState(false);
  const secret = "test key";
  let navigate = useRouter();
  const PlaylistClicker = (e) => {
    if (JSON.parse(localStorage.getItem("Playlists"))[e].length === 0) {
      toast.error("playlist is empty");
    } else {
      navigate.push({
        pathname: "/[playlist]",
        query: { playlist: e },
      });
    }
  };

  const ImportFunction = (e) => {
    if (importtext === "") {
      toast.error("Please Enter Code");
    } else if (
      !importtext.includes("{") ||
      !importtext.includes(":") ||
      !importtext.includes("[")
    ) {
      toast.error("Wrong code");
    } else {
      localStorage.setItem("Playlists", importtext);
      setImportText("");
      toast.success("IMPORTED !");
      setImportFlag(true);
    }
  };

  const DeletePlaylistData = (items, e) => {
    e.preventDefault();
    const response = window.confirm("Are you sure you want to delete?");
    if (response) {
      const a = JSON.parse(localStorage.getItem("Playlists"));
      delete a[items];
      localStorage.setItem("Playlists", JSON.stringify(a));
      setDeleteFlag(!deleteflag);
      toast.success("playlist deleted");
    } else {
      toast.error("not deleted");
    }
  };
  const SharePlaylistHandler = (e, Pname) => {
    // let bytes;

    e.preventDefault();
    const playlist = JSON.parse(localStorage.getItem("Playlists"));
    const cipherText = AES.encrypt(
      JSON.stringify({ [Pname]: playlist[Pname] }),
      secret
    );

    if (navigator.share) {
      navigator.clipboard.writeText(cipherText);
      toast.success("Copies!");
    } else {
      console.log("Sorry! Your browser does not support Web Share API");
    }
  };

  useEffect(() => {
    if (
      JSON.parse(localStorage.getItem("Playlists")) === null ||
      JSON.parse(localStorage.getItem("Playlists").length) === 2
    ) {
      setAvailablePlaylist(false);
      setloader(false);
    } else {
      setAvailablePlaylist(true);
      setloader(false);
    }
  }, [importflag, deleteflag]);

  return (
    <Layout>
      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Simple Loader */}
      {loader && (
        <ScaleLoader
          color="#000000"
          loading={true}
          size={500}
          height={70}
          width={10}
          radius={20}
          style={{ marginTop: "20px" }}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      )}

      {/* Nothing Available than we will do this. */}
      {!availableplaylist && (
        <div className="container">
          <React.Fragment>
            <div
              className="container"
              style={{
                background: "cream ",
                height: "100vh",
                width: "100vw",
              }}
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
                <h2>Nothing to show...</h2>
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
              </div>
            </div>
          </React.Fragment>
        </div>
      )}

      {/* Playlist Available than we will do this. */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        {availableplaylist && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              marginTop: "150px",
            }}
          >
            {Object.keys(JSON.parse(localStorage.getItem("Playlists"))).map(
              (items) => {
                return (
                  <div className="playlistshowcontainer" key={Math.random()}>
                    <img
                      src="/back.png"
                      alt=""
                    />
                    <div className="overlay" key={Math.random()}>
                      <div
                        className="content"
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-evenly",
                          alignContent: "space-evenly",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "right",
                            marginTop: "-10px",
                            marginRight: "10px",
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faShareFromSquare}
                            onClick={(e) => {
                              SharePlaylistHandler(e, items);
                            }}
                          ></FontAwesomeIcon>
                        </div>
                        <h5
                          style={{
                            textTransform: "uppercase",
                            fontWeight: "900",
                          }}
                        >
                          {items}
                        </h5>
                        <div className="buttons" style={{ marginTop: "100px" }}>
                          <Link
                            className="btn btn-primary"
                            style={{ marginTop: "5px", width: "250px" }}
                            // onClick={() =>}
                            href="/playlist/[currentplay]"
                            as={`/playlist/${items}`}
                            // onClick={() => PlaylistClicker(items)}
                          >
                            Play
                          </Link>
                          <button
                            className="btn btn-dark"
                            style={{ marginTop: "5px", width: "250px" }}
                            onClick={(e) => DeletePlaylistData(items, e)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
