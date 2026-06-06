import React, { useEffect, useState } from 'react';
import { CircularText } from './Icons';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

const HireMe = () => {
  const [hideWidget, setHideWidget] = useState(false);
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHideWidget(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      },
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={`fixed left-4 bottom-4 flex items-center justify-center overflow-hidden md:right-8 md:left-auto md:top-0 md:bottom-auto md:absolute sm:right-0 transition-opacity duration-300 ${
        hideWidget ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className='w-48 h-auto flex items-center justify-center relative md:w-24'>
        <CircularText
          text={
            isFrench
              ? ' • DEVELOPPEUR FULLSTACK JS • '
              : ' • FULLSTACK JS DEVELOPER • '
          }
          className={'fill-dark animate-spin-slow dark:fill-light'}
        />
        <Link
          href='mailto:s.slimene19@gmail.com'
          className={`flex items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark text-light shadow-md border border-solid border-dark rounded-full font-sans font-semibold tracking-wide hover:bg-light hover:text-dark
          dark:bg-dark dark:text-light hover:dark:bg-light hover:dark:text-dark hover:dark:border-dark ${
            isFrench
              ? 'w-32 h-32 px-3 text-[13px] leading-tight text-center md:w-24 md:h-24 md:text-[11px]'
              : 'w-32 h-32 px-3 text-[13px] leading-tight text-center md:w-24 md:h-24 md:text-[11px]'
          }`}
        >
          {isFrench ? 'Embauchez-moi' : 'Hire Me'}
        </Link>
      </div>
    </div>
  );
};

export default HireMe;
