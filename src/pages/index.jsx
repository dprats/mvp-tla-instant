import Hero from '@/components/Hero';
import FAQ from '@/components/FAQ';
import Head from 'next/head';


export default function landingPage()   {
    return (
        <div>
          <Head>
            <title>Design with Intent: Easy TLA+</title>
            <meta property="og:title" content="Design with Intent: Easy TLA+" />
            <meta property="og:description" content="Inspired by typical engineer's workflow, this tool allows you write TLA+ and watch the impact of your changes in near realtime." />
            <meta property="og:image" content="/images/share.png" />
          </Head>
          <Hero></Hero>
          <FAQ></FAQ>
        </div>
    )
}
