"use client";
import React, { useEffect, useReducer, useRef, useState } from "react";
import Head from "next/head";
import Field from "../../components/molecules/field";
import FormLinker from "form-linker";
import styles from "../../pages/app.module.css";
import Selectable from "../../components/Selectable";
import { useRouter } from "next/router";
import { redirect } from "next/dist/server/api-utils";
import { HOST } from "../../Hosts";
export default function App() {
  return <Home />;
}
const Home = () => {
  const nextRouter = useRouter();
  let message = "Login first";
  let token;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const auth = !!token;
  const [categories, setCategories] = useState([]); // [1]
  if (auth) {
    message = "Loggged In";
  }
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    thumbnail: "",
    categoryId: 0,
    content: "Write something here",
  });
  const [_, forceUpdate] = useReducer((x) => x + 1, 0);
  const formLinker = useRef(
    new FormLinker({
      data: {
        content: "Write something here",
      },
      schema: {
        content: "string",
      },
    })
  );
  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`${HOST}/categories`);
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);
  const handleCategoryChange = (categoryId) => {
    setFormData({ ...formData, categoryId });
  };
  const onHandleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateData = (data) => {
    if (
      !data.title ||
      !data.description ||
      !data.thumbnail ||
      !data.categoryId
    ) {
      return false;
    }
    return true;
  };
  const handleSave = async (data) => {
    try {
      const ok = validateData(data);
      if (!ok) {
        setError("All fields are required");
        return;
      }
      const token = localStorage.getItem("token");
      const response = await fetch(`${HOST}/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (res.ok) {
        nextRouter.isReady && nextRouter.push(process.env.redirect || redirect);
      }
    } catch (error) {}
  };
  const [thumbnailPreview, setThumbnailPreview] = useState("");

  const onThumbnailChange = (e) => {
    const url = e.target.value;
    setFormData({ ...formData, thumbnail: url });
    setThumbnailPreview(url);
  };
  useEffect(() => {
    if (
      formLinker.current &&
      formLinker.current.data.content !== formData.content
    ) {
      setFormData({ ...formData, content: formLinker.current.data.content });
    }
  }, [formLinker.current.data.content]);
  return (
    <div className={styles.app}>
      <Head>
        <title>DgSpark - Create a Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section
        css={{
          width: "100%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <h1 className="">{message}</h1>
        <div
          css={{
            width: 1000,
            padding: 20,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <label className={styles.label} htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={formData.title}
            name="title"
            placeholder="title"
            onChange={onHandleChange}
            className={styles.text_input}
          />
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            type="text"
            id="description"
            name="description"
            placeholder="description"
            onChange={onHandleChange}
            value={formData.description}
            className={styles.text_input}
          />
          <label className={styles.label} htmlhtmlFor="thumbnail">
            Thumbnail
          </label>
          <input
            type="text"
            value={formData.thumbnail}
            onChange={onThumbnailChange}
            id="thumbnail"
            name="thumbnail"
            placeholder="Image URL"
            className={styles.text_input}
          />
          {thumbnailPreview && (
            <div>
              <h3>Thumbnail Preview:</h3>
              <img
                src={thumbnailPreview}
                alt="Thumbnail Preview"
                className={styles.thumbnail_preview}
              />
            </div>
          )}
          <div className={styles.categoryBox}>
            <Selectable
              value={formData.categoryId}
              setValue={handleCategoryChange}
              onChange={onHandleChange}
              categories={categories}
            />
          </div>
          {error && <p style={{ fontSize: "24px", color: "red" }}>{error}</p>}
          <label htmlFor="content">Content</label>
          <div className={styles.editor}>
            <Field
              formLinker={formLinker.current}
              name="content"
              type="editor"
              minHeight={300}
              height={450}
              maxHeight={800}
              placeholder="Enter your content here"
              toolbar={["withImages"]}
              onChange={forceUpdate}
            />
            <button
              className={styles.saveBtn}
              onClick={() => handleSave(formData)}
            >
              Save
            </button>
            <h4 css={{ marginTop: 30, marginBottom: 0 }}>Preview</h4>
            <div
              css={{
                width: "100%",
                padding: 12,
                border: "1px solid #000",
                minHeight: 350,
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: formLinker.current.data.content,
                }}
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
