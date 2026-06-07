import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '@/components/Logo';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import {
  TwitterIcon,
  GithubIcon,
  LinkedinIcon,
  DribbbleIcon,
  PinterestIcon,
  SunIcon,
  MoonIcon,
} from '@/components/Icons';
import useThemeSwitcher from './hooks/useThemeSwitcher';
import { useLanguage } from '@/context/LanguageContext';
import Image from 'next/image';

const CustomLink = ({ href, title, className = '' }) => {
  const router = useRouter();
  return (
    <Link href={href} className={`${className} relative group`}>
      {title}
      <span
        className={`
        h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        } dark:bg-light`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const CustomMobileLink = ({ href, title, className = '', toggle }) => {
  const router = useRouter();

  const handleClick = () => {
    toggle();
    router.push(href);
  };

  return (
    <button
      href={href}
      className={`${className} relative group my-2.5 min-h-[42px] px-2 text-base tracking-[0.01em] text-light dark:text-dark`}
      onClick={handleClick}
    >
      {title}
      <span
        className={`
        h-[1px] inline-block bg-light absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 ${
          router.asPath === href ? 'w-full' : 'w-0'
        } dark:bg-dark`}
      >
        &nbsp;
      </span>
    </button>
  );
};

const NavBar = () => {
  const [mode, setMode] = useThemeSwitcher();
  const { language, toggleLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const isFrench = language === 'fr';

  const labels = {
    home: isFrench ? 'Accueil' : 'Home',
    about: isFrench ? 'À propos' : 'About',
    projects: isFrench ? 'Projets' : 'Projects',
    articles: isFrench ? 'Articles' : 'Articles',
  };

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className='w-full px-32 py-8 font-medium flex items-center justify-between dark:text-light relative z-10 lg:px-16 md:px-12 sm:px-8'>
      <button
        className='flex-col justify-center items-center hidden lg:flex'
        onClick={handleClick}
      >
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
            isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm my-0.5 ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        ></span>
        <span
          className={`bg-dark dark:bg-light transition-all duration-300 ease-out block h-0.5 w-6 rounded-sm ${
            isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
          }`}
        ></span>
      </button>
      <div className='w-full flex justify-between items-center lg:hidden'>
        <nav>
          <CustomLink href='/' title={labels.home} className='mr-4' />
          <CustomLink href='/about' title={labels.about} className='mx-4' />
          <CustomLink href='/projects' title={labels.projects} className='mx-4' />
          <CustomLink href='/articles' title={labels.articles} className='ml-4' />
        </nav>
        <nav className='flex items-center justify-center flex-wrap'>
          <motion.a
            href='https://www.twitter.com/seifeslimene'
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className='w-6 mr-3'
          >
            <TwitterIcon />
          </motion.a>
          <motion.a
            href='https://www.github.com/seifeslimene'
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className='w-6 mx-3'
          >
            <GithubIcon />
          </motion.a>
          <motion.a
            href='https://www.linkedin.com/in/seifeslimene'
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className='w-6 mx-3'
          >
            <LinkedinIcon />
          </motion.a>
          <motion.a
            href='https://www.pinterest.com/seifeslimene'
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className='w-6 mx-3 bg-light rounded-full'
          >
            <PinterestIcon />
          </motion.a>
          <motion.a
            href='https://dribbble.com/seifeslimene'
            target={'_blank'}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.9 }}
            className='w-6 ml-3'
          >
            <DribbbleIcon />
          </motion.a>
          <button
            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
            className={`ml-3 flex items-center justify-center rounded-full p-1
          ${mode === 'light' ? 'bg-dark text-light' : 'bg-light text-dark'}`}
          >
            {mode === 'dark' ? (
              <SunIcon className={'fill-dark'} />
            ) : (
              <MoonIcon className={'fill-dark'} />
            )}
          </button>
          <button
            onClick={toggleLanguage}
            className='ml-3 rounded-full border border-solid border-dark px-3 py-1 text-sm font-semibold dark:border-light'
            aria-label='Toggle language'
          >
            {isFrench ? 'EN' : 'FR'}
          </button>
        </nav>
      </div>

      {isOpen ? (
        <>
          <motion.button
            type='button'
            aria-label='Close navigation menu'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='fixed inset-0 z-20 bg-dark/40 backdrop-blur-[2px]'
            onClick={handleClick}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1 }}
            className='min-w-[70vw] flex flex-col justify-between z-30 items-center fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
        bg-dark/90 dark:bg-light/75 rounded-lg backdrop-blur-md py-24 px-8
        '
          >
          <nav className='flex items-center flex-col justify-center gap-3'>
            <CustomMobileLink
              href='/'
              title={labels.home}
              className=''
              toggle={handleClick}
            />
            <CustomMobileLink
              href='/about'
              title={labels.about}
              className=''
              toggle={handleClick}
            />
            <CustomMobileLink
              href='/projects'
              title={labels.projects}
              className=''
              toggle={handleClick}
            />
            <CustomMobileLink
              href='/articles'
              title={labels.articles}
              className=''
              toggle={handleClick}
            />
          </nav>
          <nav className='mt-8 flex max-w-[240px] flex-wrap items-center justify-center gap-3'>
            <motion.a
              href='https://www.twitter.com/seifeslimene'
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-light text-dark shadow-sm'
            >
              <TwitterIcon className='h-6 w-6' />
            </motion.a>
            <motion.a
              href='https://www.github.com/seifeslimene'
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-light text-dark shadow-sm'
            >
              <GithubIcon className='h-6 w-6' />
            </motion.a>
            <motion.a
              href='https://www.linkedin.com/in/seifeslimene'
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-light text-dark shadow-sm'
            >
              <LinkedinIcon className='h-6 w-6' />
            </motion.a>
            <motion.a
              href='https://www.pinterest.com/seifeslimene'
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-light text-dark shadow-sm'
            >
              <PinterestIcon className='h-6 w-6' />
            </motion.a>
            <motion.a
              href='https://dribbble.com/seifeslimene'
              target={'_blank'}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.9 }}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-light text-dark shadow-sm'
            >
              <DribbbleIcon className='h-6 w-6' />
            </motion.a>
            <button
              onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-light p-1 text-dark shadow-sm'
            >
              {mode === 'dark' ? (
                <SunIcon className='h-6 w-6 fill-current' />
              ) : (
                <MoonIcon className='h-6 w-6 fill-current' />
              )}
            </button>
            <button
              onClick={toggleLanguage}
              className='flex h-11 w-11 items-center justify-center rounded-full bg-light text-[11px] font-semibold text-dark shadow-sm'
              aria-label='Toggle language'
            >
              {isFrench ? 'EN' : 'FR'}
            </button>
          </nav>
          </motion.div>
        </>
      ) : null}

      <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
        <Logo />
      </div>
    </header>
  );
};

export default NavBar;
