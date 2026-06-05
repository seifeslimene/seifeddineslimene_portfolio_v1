import React from 'react';
import Layout from '@/components/Layout';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const Footer = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  return (
    <footer
      id='site-footer'
      className='w-full border-t-2 border-solid border-dark font-medium text-lg dark:text-light dark:border-light sm:text-base'
    >
      <Layout className='py-8 flex items-center justify-between lg:flex-col lg:py-6'>
        <span>
          {new Date().getFullYear()} &copy;{' '}
          {isFrench ? 'Tous droits réservés.' : 'All Rights Reserved.'}
        </span>
        <div className='flex items-center lg:py-2'>
          {isFrench ? 'Créé avec' : 'Built With'}{' '}
          <span className='text-primary dark:text-primaryDark text-2xl px-1'>&#9825;</span>
          {isFrench ? 'par' : 'by'}&nbsp;
          <Link
            href='/'
            className='underline underline-offset-2'
            target={'_blank'}
          >
            Seif Eddine Slimene
          </Link>
        </div>
        <Link
          href='mailto:s.slimene19@gmail.com'
          target={'_blank'}
          className='underline underline-offset-2'
        >
          {isFrench ? 'Dire Bonjour' : 'Say Hello'}
        </Link>
      </Layout>
    </footer>
  );
};

export default Footer;
