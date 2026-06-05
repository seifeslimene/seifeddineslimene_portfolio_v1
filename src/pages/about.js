import AnimatedText from '@/components/AnimatedText';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useRef } from 'react';
import profilePic from '../../public/about_photo.jpg';
import { useInView, useMotionValue, useSpring } from 'framer-motion';
import Skills from '@/components/Skills';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import TransitionEffect from '@/components/TransitionEffect';
import { useLanguage } from '@/context/LanguageContext';

const AnimatedNumbers = ({ value }) => {
  const ref = useRef(null);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: 3000,
  });
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    springValue.on('change', (latest) => {
      if (ref.current && latest.toFixed(0) <= value) {
        ref.current.textContent = latest.toFixed(0);
      }
    });
  }, [springValue, value]);
  return <span ref={ref}></span>;
};

const about = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  return (
    <>
      <Head>
        <title>{isFrench ? 'Seif Eddine Slimene | À propos' : 'Seif Eddine Slimene | About'}</title>
        <meta
          name='description'
          content={
            isFrench
              ? "À propos de Seif Eddine Slimene, développeur Fullstack Javascript basé à Meulan-en-Yvelines, France, avec une expérience pratique en développement web frontend et backend."
              : 'About Seif Eddine Slimene, Fullstack Javascript Developer based in Meulan-en-Yvelines, France with hands-on experience in frontend and backend web development.'
          }
        ></meta>
      </Head>
      <TransitionEffect />
      <main className='flex w-full flex-col items-center justify-center dark:text-light'>
        <Layout className='pt-16'>
          <AnimatedText
            text={
              isFrench
                ? 'Construire des produits avec clarté, rapidité et impact.'
                : 'Building products with clarity, speed, and impact.'
            }
            className='mb-16 lg:!text-7xl sm:!text-6xl xs:!text-4xl sm:mb-8'
          />
          <div className='grid w-full grid-cols-8 gap-16 sm:gap-8'>
            <div className='col-span-3 flex flex-col items-start justify-start xl:col-span-4 md:order-2 md:col-span-8'>
              <h2 className='mb-4 text-lg font-bold uppercase text-dark/75 dark:text-light/75'>
                {isFrench ? 'Biographie' : 'Biography'}
              </h2>
              <p className='font-medium'>
                {isFrench
                  ? "Je suis Seif Eddine Slimene, développeur Fullstack Javascript basé à Meulan-en-Yvelines, France. Je me concentre sur la livraison d'applications web de haute qualité avec des technologies modernes comme React, Next.js, Node.js et SQL."
                  : 'I am Seif Eddine Slimene, a Fullstack Javascript Developer based in Meulan-en-Yvelines, France. I focus on delivering high-quality web applications with modern technologies like React, Next.js, Node.js, and SQL.'}
              </p>
              <p className='my-4 font-medium'>
                {isFrench
                  ? "Depuis 2017, j'ai travaillé sur des systèmes ERP, des projets fullstack en freelance et du développement frontend orienté produit à grande échelle. Mon approche combine architecture propre, code maintenable et forte attention au comportement réel des utilisateurs."
                  : 'Since 2017, I have worked across ERP systems, freelance fullstack projects, and product-focused frontend development at scale. My approach combines clean architecture, maintainable code, and strong attention to real user behavior.'}
              </p>

              <p className='font-medium'>
                {isFrench
                  ? "J'aime résoudre des problèmes métier avec le logiciel, optimiser les performances et le SEO, et construire des systèmes réutilisables qui accélèrent la livraison des équipes tout en maintenant la qualité produit."
                  : 'I enjoy solving business problems through software, optimizing performance and SEO, and building reusable systems that speed up team delivery while maintaining product quality.'}
              </p>
              <p className='my-4 font-medium'>
                {isFrench
                  ? 'Contact : s.slimene19@gmail.com | +33 7 59 05 55 02 | 4 All. Saint Pierre, Meulan-en-Yvelines, Yvelines, France | LinkedIn /in/seifeslimene. Langues : arabe, anglais, français et allemand.'
                  : 'Contact: s.slimene19@gmail.com | +33 7 59 05 55 02 | 4 All. Saint Pierre, Meulan-en-Yvelines, Yvelines, France | LinkedIn /in/seifeslimene. Languages: Arabic, English, French, and German.'}
              </p>
              <div className='font-medium'>
                <h3 className='mb-2 font-bold uppercase text-dark/75 dark:text-light/75'>
                  {isFrench ? 'Langues' : 'Languages'}
                </h3>
                <p>{isFrench ? 'Arabe, anglais, français, allemand' : 'Arabic, English, French, German'}</p>
              </div>
            </div>
            <div className='col-span-3 relative h-max rounded-2xl border-2 border-solid border-dark bg-light p-8 dark:bg-dark dark:border-light xl:col-span-4 md:order-1 md:col-span-8'>
              <div className='absolute top-0 -right-3 -z-10 w-[102%] h-[103%] rounded-[2rem] bg-dark dark:bg-light' />
              <Image
                src={profilePic}
                alt='seif eddine slimene'
                className='w-full h-[36rem] xl:h-[32rem] md:h-auto rounded-2xl object-cover object-[42%_center]'
                priority
                sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              />
            </div>
            <div className='col-span-2 flex flex-col items-end justify-between xl:col-span-8 xl:flex-row xl:items-center md:order-3'>
              <div className='flex flex-col items-end justify-center xl:items-center'>
                <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'>
                  <AnimatedNumbers value={3} />+
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>
                  {isFrench ? 'Rôles principaux' : 'Core Roles'}
                </h2>
              </div>
              <div className='flex flex-col items-end justify-center xl:items-center'>
                <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'>
                  <AnimatedNumbers value={3} />
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>
                  {isFrench ? 'Projets marquants' : 'Highlight Projects'}
                </h2>
              </div>
              <div className='flex flex-col items-end justify-center xl:items-center'>
                <span className='inline-block text-7xl font-bold md:text-6xl sm:text-5xl xs:text-4xl'>
                  <AnimatedNumbers value={9} />+
                </span>
                <h2 className='text-xl font-medium capitalize text-dark/75 dark:text-light/75 xl:text-center md:text-lg sm:text-base xs:text-sm'>
                  {isFrench ? "Années d'expérience" : 'Years Of Experience'}
                </h2>
              </div>
            </div>
          </div>
          <Skills />
          <Experience />
          <Education />
        </Layout>
      </main>
    </>
  );
};

export default about;
