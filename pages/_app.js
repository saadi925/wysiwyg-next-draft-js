import React from "react";
import App from "next/app";
import Layout from "../components/app";
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    return (
      <div className="">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </div>
    );
  }
}

export default MyApp;
