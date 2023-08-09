import Image from "next/image";
import { Inter } from "next/font/google";
import { Layout } from "../components/layouts/Layout";
import Head from "next/head";
import HomePage from "./home";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
        <HomePage />
    </Layout>
  );
}
