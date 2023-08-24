import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Features from '@/components/Features';
import Head from 'next/head';


export default function landingPage()   {
    return (
        <div>
          <Head>
            <title>Design with Intent: Easy TLA+</title>
            <meta property="og:title" content="Design with Intent: Easy TLA+" />
            <meta property="og:description" content="Define your system's intent and this product will generate easy-to-understand TLA+ specification for you and your team to explore." />
            <meta property="og:image" content="/images/share.png" />
            {/* other meta tags */}
          </Head>
          <Hero></Hero>
          {/* <Features></Features> */}
          <FAQ></FAQ>
        </div>
    )
}
