import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import profilePic from '../../public/main_photo.png';
import AnimatedText from '@/components/AnimatedText';
import Link from 'next/link';
import { LinkArrow } from '@/components/Icons';
import HireMe from '@/components/HireMe';
import lightBulb from '../../public/images/svgs/miscellaneous_icons_1.svg';
import TransitionEffect from '@/components/TransitionEffect';

export default function Home() {
  return (
    <>
      <Head>
        <title>Seif Eddine Slimene | Fullstack Javascript Developer</title>
        <meta
          name='description'
          content='Seif Eddine Slimene is a Fullstack Javascript Developer based in Tunis, Tunisia. Specialized in Next.js, React, Node.js, and scalable web applications.'
        />
      </Head>
      <TransitionEffect />
      <main className='flex items-center text-dark w-full min-h-screen dark:text-light'>
        <Layout className='pt-0 md:p-16 sm:pt-8'>
          <div className='relative -left-24 xl:-left-16 lg:left-0 flex items-center justify-between w-full lg:flex-col'>
            <div className='w-1/2 md:w-full'>
              <div className='w-[46%] lg:w-[42%] md:w-[56%] ml-auto mr-20 lg:mx-auto'>
                <Image
                  src={profilePic}
                  alt='seifeslimene'
                  className='w-full h-auto rounded-[1.6rem] object-cover lg:hidden md:inline-block'
                  priority
                  sizes='(max-width: 768px) 85vw, (max-width: 1200px) 45vw, 40vw'
                />
              </div>
            </div>
            <div className='w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center'>
              <AnimatedText
                text='Seif Eddine Slimene - Fullstack Javascript Developer'
                className='!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl'
              />
              <p className='my-4 text-base font-medium md:text-sm sm:text-xs'>
                I build fast, scalable, and user-focused web products with
                modern Javascript technologies. Based in Tunis, Tunisia, I bring
                strong fullstack experience across React, Next.js, Node.js, and
                cloud-ready application architecture.
              </p>
              <div className='flex items-center self-start mt-2 lg:self-center'>
                <Link
                  href='/resume.pdf'
                  target={'_blank'}
                  className='flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base'
                >
                  Resume <LinkArrow className='w-6 ml-1' />
                </Link>
                <Link
                  href='mailto:s.slimene19@gmail.com'
                  target={'_blank'}
                  className='ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base'
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </Layout>
        <HireMe />

        <div className='absolute right-8 bottom-8 inline-block w-24 md:hidden'>
          <Image src={lightBulb} alt='seifeslimene' className='w-full h-auto' />
        </div>
      </main>
    </>
  );
}
