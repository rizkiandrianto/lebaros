import Head from "../components/layout/Head";
import Header from "../components/layout/Header";

export default function Home() {
  return (
    <>
      <Head />
      <Header />
      <div className="container main-container">
        <p>Hello World</p>
      </div>
    </>
  )
}
