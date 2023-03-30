import Layout from '@containers/layout';
import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ButtonHTMLAttributes, ComponentType, useEffect, useState } from 'react';
import dynamicComponents from '@lib/packages'

interface Props {}

export default function Home(props: Props) {

  console.log({dynamicComponents})

  const [Com, setCom] = useState<ComponentType<ButtonHTMLAttributes<HTMLParagraphElement>>>()

  const cc = ()=>{
    const {Header} = dynamicComponents['@dropgala/luma']
    setCom(Header)
  }

  return (
    <Layout>
      <Head>
        <meta name="Description" content="Put your description here." />
        <title>Dropgala</title>
      </Head>
      <button className='bg-red-500' onClick={cc}>HELLO</button>
      {Com && <Com/>}
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const {locale} = context
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        'common',
        'forms',
        'menu',
        'footer'
      ]))
    }
  };
};