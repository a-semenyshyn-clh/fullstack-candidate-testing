import '../styles/index.css'
import Nav from "../components/nav";
import Footer from "../components/footer";

import SearchProvider from "../contexts/search-provider";

function MyApp({ Component, pageProps }) {
  return (
    <SearchProvider>
      <Nav />
        <Component {...pageProps} />
      <Footer />
    </SearchProvider>
  );
}

export default MyApp
