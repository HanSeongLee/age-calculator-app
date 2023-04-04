import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  weight: ['400', '700', '800'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
      <>
        <style jsx global>{`
          html {
            font-family: ${poppins.style.fontFamily};
          }
        `}</style>
        <Component {...pageProps} />
      </>
  );
}

export default MyApp
