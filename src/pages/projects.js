import AnimatedText from '@/components/AnimatedText';
import { GithubIcon } from '@/components/Icons';
import Layout from '@/components/Layout';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import TransitionEffect from '@/components/TransitionEffect';
import projects from '@/data/projects';

const FramerImage = motion(Image);
const GITHUB_ICON_COLORS = [
  'text-emerald-500',
  'text-blue-500',
  'text-violet-500',
  'text-rose-500',
  'text-amber-500',
  'text-cyan-500',
];

const GithubLinks = ({ links, sizeClass }) => (
  <div className='flex items-center gap-3'>
    {links.map((item, index) => (
      <Link
        key={`${item.url}-${index}`}
        href={item.url}
        target='_blank'
        className={sizeClass}
        aria-label={`Open ${item.label} repository`}
        title={item.label}
      >
        <GithubIcon className={GITHUB_ICON_COLORS[index % GITHUB_ICON_COLORS.length]} />
      </Link>
    ))}
  </div>
);

const Lightbox = ({
  isOpen,
  images,
  title,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}) => {
  const hasMultipleImages = images.length > 1;

  if (!isOpen || images.length === 0) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        className='fixed inset-0 z-50 flex items-center justify-center bg-dark/90 p-4'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className='relative w-full max-w-6xl'
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            type='button'
            onClick={onClose}
            className='absolute right-4 top-4 z-10 rounded-full bg-dark/70 px-3 py-1 text-xl font-bold text-light'
            aria-label='Close lightbox'
          >
            x
          </button>
          {hasMultipleImages ? (
            <button
              type='button'
              onClick={onPrev}
              className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-dark/70 px-3 py-2 text-xl font-bold text-light'
              aria-label='Previous image'
            >
              <span aria-hidden='true'>&larr;</span>
            </button>
          ) : null}
          <div className='relative h-[80vh] w-full overflow-hidden rounded-xl bg-dark/60'>
            <Image
              src={images[currentIndex]}
              alt={`${title} screenshot ${currentIndex + 1}`}
              fill
              className='object-contain'
              sizes='100vw'
              priority
            />
          </div>
          {hasMultipleImages ? (
            <button
              type='button'
              onClick={onNext}
              className='absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-dark/70 px-3 py-2 text-xl font-bold text-light'
              aria-label='Next image'
            >
              <span aria-hidden='true'>&rarr;</span>
            </button>
          ) : null}
          <p className='mt-3 text-center text-light'>
            {title} ({currentIndex + 1}/{images.length})
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const FeaturedProject = ({
  type,
  title,
  summary,
  img,
  link,
  githubLinks,
  showVisitCta,
  onOpenGallery,
}) => {
  return (
    <article className='w-full flex items-center justify-between relative rounder-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]' />
      <button
        type='button'
        onClick={onOpenGallery}
        className='w-1/2 cursor-pointer overflow-hidden rounded-lg text-left lg:w-full'
        aria-label={`Open ${title} gallery`}
      >
        <FramerImage
          src={img}
          alt={title}
          width={1200}
          height={700}
          className='w-full h-auto'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
        />
      </button>
      <div className='w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6'>
        <span className='text-primary font-medium text-xl dark:text-primaryDark xs:text-base'>
          {type}
        </span>
        <Link
          href={link}
          target='_blank'
          className='hover:underline underline-offset-2'
        >
          <h2 className='my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm'>
            {title}
          </h2>
        </Link>
        <p className='my-2 font-medium text-dark dark:text-light sm:text-sm'>
          {summary}
        </p>
        <div className='mt-2 flex items-center'>
          <GithubLinks links={githubLinks} sizeClass='w-10' />
          {showVisitCta ? (
            <Link
              href={link}
              target='_blank'
              className='ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base'
            >
              Visit Project
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  );
};

const Project = ({
  title,
  type,
  summary,
  img,
  link,
  githubLinks,
  showVisitCta,
  onOpenGallery,
}) => {
  return (
    <article className='w-full h-full flex flex-col items-center justify-start rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]' />
      <button
        type='button'
        onClick={onOpenGallery}
        className='relative w-full cursor-pointer overflow-hidden rounded-lg text-left aspect-[16/9]'
        aria-label={`Open ${title} gallery`}
      >
        <FramerImage
          src={img}
          alt={title}
          fill
          className='object-cover'
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
        />
      </button>
      <div className='w-full flex flex-col items-start justify-between mt-4 flex-1'>
        <span className='text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base'>
          {type}
        </span>
        <Link
          href={link}
          target='_blank'
          className='hover:underline underline-offset-2'
        >
          <h2 className='my-2 w-full text-left text-3xl font-bold lg:text-2xl'>
            {title}
          </h2>
        </Link>
        <p className='my-2 font-medium text-dark dark:text-light text-sm'>
          {summary}
        </p>
        <div className='w-full mt-auto pt-2 flex items-center justify-between'>
          {showVisitCta ? (
            <Link
              href={link}
              target='_blank'
              className='text-lg font-semibold underline md:text-base'
            >
              Visit
            </Link>
          ) : (
            <span />
          )}
          <GithubLinks links={githubLinks} sizeClass='w-8 md:w-6' />
        </div>
      </div>
    </article>
  );
};

const ProjectsPage = () => {
  const FEATURE_FLAGS = {
    showVisitCta: false,
  };
  const featuredProjects = projects.filter((project) => project.featured);
  const standardProjects = projects.filter((project) => !project.featured);
  const [lightboxState, setLightboxState] = useState({
    isOpen: false,
    title: '',
    images: [],
    index: 0,
  });

  const openProjectGallery = (project) => {
    const projectImages =
      project.gallery?.images && project.gallery.images.length > 0
        ? project.gallery.images
        : project.gallery?.cover
          ? [project.gallery.cover]
          : [];

    if (projectImages.length === 0) {
      return;
    }

    setLightboxState({
      isOpen: true,
      title: project.title,
      images: projectImages,
      index: 0,
    });
  };

  const closeLightbox = () => {
    setLightboxState((prevState) => ({ ...prevState, isOpen: false }));
  };

  const canNavigate = lightboxState.images.length > 1;
  const imageCount = lightboxState.images.length;

  const goToPrevious = () => {
    if (!canNavigate) {
      return;
    }
    setLightboxState((prevState) => ({
      ...prevState,
      index: (prevState.index - 1 + imageCount) % imageCount,
    }));
  };

  const goToNext = () => {
    if (!canNavigate) {
      return;
    }
    setLightboxState((prevState) => ({
      ...prevState,
      index: (prevState.index + 1) % imageCount,
    }));
  };

  useEffect(() => {
    if (!lightboxState.isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeLightbox();
      }
      if (event.key === 'ArrowLeft') {
        goToPrevious();
      }
      if (event.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxState.isOpen, goToPrevious, goToNext]);

  return (
    <>
      <Head>
        <title>Seif Eddine Slimene | Projects</title>
        <meta
          name='description'
          content='Projects by Seif Eddine Slimene, Fullstack Javascript Developer: Blogify CMS, Mosaic social platform, and WebShop e-commerce platform.'
        ></meta>
      </Head>
      <TransitionEffect />
      <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
        <Layout className='pt-16'>
          <AnimatedText
            text='Selected Fullstack Projects'
            className='mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl'
          />
          <div className='grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0'>
            {featuredProjects.map((project) => (
              <div key={project.id} className='col-span-12'>
                <FeaturedProject
                  img={project.gallery?.cover}
                  title={project.title}
                  summary={project.summary}
                  link={project.link}
                  githubLinks={project.githubLinks}
                  type={project.type}
                  showVisitCta={FEATURE_FLAGS.showVisitCta}
                  onOpenGallery={() => openProjectGallery(project)}
                />
              </div>
            ))}
            {standardProjects.map((project) => (
              <div key={project.id} className='col-span-6 sm:col-span-12 h-full'>
                <Project
                  img={project.gallery?.cover}
                  title={project.title}
                  summary={project.summary}
                  link={project.link}
                  githubLinks={project.githubLinks}
                  type={project.type}
                  showVisitCta={FEATURE_FLAGS.showVisitCta}
                  onOpenGallery={() => openProjectGallery(project)}
                />
              </div>
            ))}
          </div>
        </Layout>
      </main>
      <Lightbox
        isOpen={lightboxState.isOpen}
        images={lightboxState.images}
        title={lightboxState.title}
        currentIndex={lightboxState.index}
        onClose={closeLightbox}
        onPrev={goToPrevious}
        onNext={goToNext}
      />
    </>
  );
};

export default ProjectsPage;
