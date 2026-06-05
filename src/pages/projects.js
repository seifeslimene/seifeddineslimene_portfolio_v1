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
import { useLanguage } from '@/context/LanguageContext';

const FramerImage = motion(Image);
const GITHUB_ICON_COLORS = [
  'text-emerald-500',
  'text-blue-500',
  'text-violet-500',
  'text-rose-500',
  'text-amber-500',
  'text-cyan-500',
];

const PROJECT_SUMMARIES_FR = {
  blogify:
    "Blogify est un systeme de gestion de contenu open source concu pour permettre aux particuliers de publier des articles, creer des pages personnalisees, gerer les commentaires, organiser des livrets de connaissances et maintenir facilement leur presence en ligne. La plateforme fournit un environnement de publication complet avec un site de blog public, un tableau de bord d'administration pour controler le contenu et des fonctions de gestion e-mail pour informer les lecteurs. Les utilisateurs peuvent administrer les articles et les pages, suivre les statistiques, configurer les parametres systeme, gerer les televersements de fichiers et moderer les commentaires depuis une interface intuitive.",
  mosaic:
    "Mosaic est une plateforme de reseau social qui permet aux utilisateurs de partager, decouvrir et interagir avec leur communaute via des publications, des commentaires et des likes. Les utilisateurs peuvent creer un compte, construire leur profil, suivre d'autres membres et consulter un fil dedie au contenu des personnes suivies, avec notifications en temps reel pour les interactions comme les likes et les follows. Grace aux fonctions de creation, modification et suppression de publications, de mentions d'utilisateurs et de reactions, Mosaic offre une experience sociale complete avec une interface responsive mobile-first.",
  webshop:
    "WebShop est une plateforme e-commerce complete qui combine une vitrine client et un systeme d'administration avance. Cote utilisateur, les clients peuvent parcourir les produits par niveaux de categories, rechercher des articles, consulter les details produits, gerer leur panier, finaliser la commande, creer un compte, suivre leurs commandes, publier des avis et gerer leurs adresses de livraison. Cote administration, les gestionnaires pilotent les utilisateurs, les produits, les categories, les commandes, la moderation des avis et les contenus promotionnels (sliders et bannieres), le tout dans une interface responsive desktop et mobile.",
  webshop_mobile:
    "WebShop Mobile est une application e-commerce mobile qui permet aux clients de parcourir les produits, explorer les categories, consulter les fiches detaillees et les avis, gerer leur panier et finaliser leurs achats directement depuis leur smartphone. L'application permet egalement de suivre les commandes, gerer les informations de compte et les adresses, puis laisser des avis sur les produits achetes. Son interface elegante et responsive garantit une experience d'achat fluide avec les fonctions essentielles d'une plateforme e-commerce complete.",
  booking_plugin_system:
    "Booking Plugin System est un composant web reutilisable construit avec Stencil qui permet aux entreprises d'integrer la prise de rendez-vous et de reservations sur leurs sites web. Le plugin est framework-agnostic et peut etre integre facilement via balise script ou installation NPM, afin que les clients consultent les disponibilites et reservent sans friction. Le composant fonctionne de maniere autonome ou integree dans des applications existantes, avec une experience de reservation professionnelle personnalisable et deployable sur differentes plateformes.",
  chattorro:
    "Chattorro est une plateforme securisee et conviviale de creation de compte et de connexion. Les utilisateurs peuvent s'inscrire avec leurs informations personnelles, se connecter avec leurs identifiants et acceder a leur espace via une interface intuitive. Construite avec Next.js et MySQL, l'application propose un design responsive qui fonctionne sur desktop, tablette et mobile, avec des pages dediees de login et d'inscription axeese simplicite et securite.",
  dev_finder:
    "Dev Finder est une plateforme collaborative de communication video qui connecte developpeurs et professionnels via des salles virtuelles pour des echanges et collaborations en temps reel. Les utilisateurs peuvent parcourir les salles disponibles, creer leurs propres espaces, se connecter de facon securisee et rejoindre des salles specifiques pour interagir en live. Construite avec Next.js et PostgreSQL, la plateforme offre une interface intuitive de decouverte et de gestion des salles sur desktop, tablette et mobile.",
  'e_-_commerce_favourites':
    "E-Commerce Favourites est une plateforme e-commerce moderne qui combine une vitrine web responsive et une API backend robuste pour offrir une experience d'achat de qualite. Le frontend affiche les produits dans une grille organisee avec pagination, adaptee a tous les ecrans. Le backend fournit une API complete avec documentation Swagger UI pour gerer les donnees produits et les servir dynamiquement au frontend, garantissant efficacite, scalabilite et fiabilite.",
  'e_-_commerce_informatique':
    "E-Commerce Informatique est une marketplace complete de produits informatiques et technologiques qui relie clients et vendeurs dans une experience d'achat fluide. Les utilisateurs peuvent parcourir un catalogue riche organise par categories, consulter les details produits, rechercher et filtrer selon leurs besoins, gerer le panier puis finaliser leurs achats via un checkout securise. Le backend Node.js/Express/MongoDB expose des API robustes pour l'authentification, la gestion des produits/categories et le traitement des commandes, avec une interface responsive sur tous les appareils.",
  flex_farm:
    "Flex Farm est une plateforme AgriTech concue pour soutenir les operations agricoles modernes via une application web complete. Le frontend fournit aux agriculteurs et professionnels une interface intuitive pour gerer les activites, suivre les operations de culture et acceder aux ressources metier. Le backend Node.js/JavaScript livre les API et services necessaires a la gestion des donnees agricoles, au suivi des cultures et aux workflows operationnels.",
  fusion_smart:
    "Fusion Smart est un tableau de bord complet de monitoring et d'analyse energetique permettant de suivre, analyser et optimiser les consommations et les couts. La plateforme fournit des insights detailles par departement, le suivi en temps reel des appareils et compteurs, le tracking des emissions carbone et l'analyse des depenses pour identifier des economies. Avec un frontend React et un backend Express/MongoDB, la solution responsive aide les organisations a ameliorer leur efficacite operationnelle et environnementale.",
  'herbal_e_-_commerce_tunisia':
    "Herbal E-Commerce Tunisia est une marketplace durable moderne qui combine une experience d'achat ecoresponsable et des outils de gestion metier complets. Cote client, les utilisateurs peuvent parcourir les produits, s'inscrire/se connecter, gerer leur panier, consulter les fiches detaillees avec pagination, payer via Stripe, reinitialiser leur mot de passe et suivre l'historique de commandes. Cote administration, Sanity Studio permet de piloter le catalogue et le contenu; le backend NestJS/PostgreSQL/Redis gere authentification JWT, e-mails, paiements et persistance des donnees.",
  influen_x:
    "Influen X est une plateforme de gestion d'influenceurs et d'evenements qui connecte createurs et audiences dans un hub centralise de decouverte et de participation. Les utilisateurs peuvent parcourir les evenements a venir, gerer les informations evenementielles et interagir avec la communaute via une interface responsive desktop/tablette/mobile. La solution combine un backend Node.js/Express/MongoDB et un frontend JavaScript moderne avec SCSS pour une experience soignee.",
  ingiz:
    "Ingiz est une application mobile fintech/bancaire professionnelle qui permet aux utilisateurs adultes d'emettre et gerer des cartes de paiement, d'effectuer des transactions financieres (virements, recharges, paiements) et d'acceder a des fonctions completes de gestion de compte reliees a un systeme bancaire externe. La plateforme combine des services backend robustes et une application React Native avec authentification biometrique, support multi-devise et gestion agent/operateur pour l'assistance client. Elle suit des standards de securite enterprise-grade et exige une identification officielle.",
  react_phone_store:
    "React Phone Store est une plateforme e-commerce specialisee dans la vente de smartphones et accessoires mobiles. Construite avec React, elle propose une interface intuitive pour explorer les categories, consulter les details produits, comparer les modeles et gerer le panier avant achat. L'application offre une experience responsive et interactive pour decouvrir et acheter des telephones via une vitrine web moderne.",
  sales_app:
    "Sales App est une plateforme moderne de gestion et de suivi commercial qui aide les equipes de vente a monitorer la performance, gerer les opportunites et suivre les revenus. Le frontend Next.js/TypeScript fournit une interface claire pour visualiser metriques, transactions et interactions clients. Le backend Java expose des services robustes pour le traitement des donnees et le reporting, afin de soutenir des decisions basees sur les donnees.",
  seif_shop:
    "Seif Shop est une plateforme e-commerce fullstack de vetements qui combine une experience d'achat elegante cote client et des capacites de gestion de contenu cote admin. Le frontend Next.js permet de parcourir les produits, naviguer par categories, gerer le panier et payer de facon securisee avec Stripe, avec notifications et effets de celebration apres achat. Le studio Sanity permet d'organiser le catalogue, gerer l'inventaire et publier le contenu en temps reel.",
  seif_store:
    "Seif Store est une plateforme e-commerce moderne specialisee en materiel informatique et peripheriques, avec authentification Google securisee. Les clients peuvent parcourir les categories (souris, claviers, etc.), rechercher, filtrer par prix, gerer le panier (ajout/suppression/quantite), consulter les fiches detaillees, payer via Stripe et suivre leur historique de commandes. Construite avec Next.js 13, React Query, Tailwind CSS, PostgreSQL et Prisma, la solution est fiable et conviviale.",
  seo_blog:
    "SEO Blog est une plateforme de blogging complete concue pour les createurs de contenu et les editeurs souhaitant publier, engager leur audience et gerer leur presence en ligne avec un focus SEO. Le frontend Next.js offre une lecture rapide et optimisee, avec authentification et fonctions admin de gestion de contenu. Le backend Express/MongoDB avec JWT gere posts, utilisateurs et persistance, permettant publication, edition et administration efficaces.",
  tunisia_gadgets:
    "Tunisia Gadgets est un tableau de bord d'administration web concu pour les gestionnaires de boutique en ligne de gadgets. Il permet de gerer les fiches produits, surveiller les commandes clients, suivre les niveaux de stock et maintenir la sante globale de l'activite e-commerce. Construit en Next.js, il fournit une interface simple pour piloter les operations backend de la boutique mobile.",
  'tunisia_green_e_-_commerce':
    "Tunisia Green E-Commerce est une application mobile e-commerce ecoresponsable permettant aux clients de s'authentifier, parcourir les produits, gerer panier et wishlist, puis payer via plusieurs options (especes ou carte). L'app inclut connexion biometrique, suivi de commandes en temps reel avec notifications push, edition du profil et partage social des produits. Soutenue par une infrastructure backend robuste, elle gere e-mails de reset, mises a jour de commande, paiements et inventaire.",
  tunisia_movies:
    "Tunisia Movies est une application mobile qui permet de decouvrir, parcourir et explorer les films disponibles dans le paysage cinematographique tunisien. Elle offre une experience mobile-first pour rechercher des films, consulter les details et rester informe des sorties et contenus locaux. Construite en JavaScript et optimisee mobile, elle propose une interface intuitive adaptee au public tunisien.",
  tunisia_social_media:
    "Tunisia Social Media (Tounsi Social Media) est une plateforme sociale moderne orientee Tunisie qui relie les utilisateurs pour partager des actualites et creer des liens. Les utilisateurs se connectent via GitHub OAuth, consultent un fil personnalise et interagissent dans une interface responsive desktop/tablette/mobile. Basee sur Next.js 14, TypeScript, Turso (LibSQL) et Drizzle ORM, la plateforme privilegie performance, simplicite et interactions rapides.",
  tunmart_store:
    "Tunmart Store est une vitrine e-commerce moderne construite avec Next.js pour apporter une experience d'achat en ligne fluide aux consommateurs tunisiens. La plateforme propose une navigation responsive sur tous les appareils, avec une interface claire pour parcourir les produits, gerer le panier et finaliser les achats. Orientee mobile-first, elle garantit une experience rapide et fiable sur desktop, tablette et smartphone.",
  vanilla_online_store:
    "Vanilla Online Store est une application e-commerce legere en JavaScript natif (sans framework lourd) qui fournit une experience d'achat simplifiee. Les clients peuvent parcourir les produits, consulter les details, gerer le panier et finaliser leurs achats dans une interface intuitive. L'integration EmailJS et Firebase Realtime Database, plus un catalogue gaming via RAWG API, permet une solution performante, responsive et facile a maintenir.",
};

const GithubLinks = ({ links, sizeClass, openRepoLabel }) => (
  <div className='flex items-center gap-3'>
    {links.map((item, index) => (
      <Link
        key={`${item.url}-${index}`}
        href={item.url}
        target='_blank'
        className={sizeClass}
        aria-label={`${openRepoLabel} ${item.label}`}
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
  labels,
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
            aria-label={labels.closeLightbox}
          >
            x
          </button>
          {hasMultipleImages ? (
            <button
              type='button'
              onClick={onPrev}
              className='absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-dark/70 px-3 py-2 text-xl font-bold text-light'
              aria-label={labels.previousImage}
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
              aria-label={labels.nextImage}
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
  labels,
}) => {
  return (
    <article className='w-full flex items-center justify-between relative rounder-br-2xl rounded-3xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]' />
      <button
        type='button'
        onClick={onOpenGallery}
        className='w-1/2 cursor-pointer overflow-hidden rounded-lg text-left lg:w-full'
        aria-label={`${labels.openGallery} ${title} gallery`}
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
          <GithubLinks
            links={githubLinks}
            sizeClass='w-10'
            openRepoLabel={labels.openRepository}
          />
          {showVisitCta ? (
            <Link
              href={link}
              target='_blank'
              className='ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base'
            >
              {labels.visitProject}
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
  labels,
}) => {
  return (
    <article className='w-full h-full flex flex-col items-center justify-start rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light xs:p-4'>
      <div className='absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]' />
      <button
        type='button'
        onClick={onOpenGallery}
        className='relative w-full cursor-pointer overflow-hidden rounded-lg text-left aspect-[16/9]'
        aria-label={`${labels.openGallery} ${title} gallery`}
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
              {labels.visit}
            </Link>
          ) : (
            <span />
          )}
          <GithubLinks
            links={githubLinks}
            sizeClass='w-8 md:w-6'
            openRepoLabel={labels.openRepository}
          />
        </div>
      </div>
    </article>
  );
};

const ProjectsPage = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const labels = {
    closeLightbox: isFrench ? 'Fermer la galerie' : 'Close lightbox',
    previousImage: isFrench ? 'Image précédente' : 'Previous image',
    nextImage: isFrench ? 'Image suivante' : 'Next image',
    openGallery: isFrench ? 'Ouvrir la galerie' : 'Open gallery',
    openRepository: isFrench ? 'Ouvrir le depot' : 'Open repository',
    visitProject: isFrench ? 'Voir le projet' : 'Visit Project',
    visit: isFrench ? 'Voir' : 'Visit',
    pageTitle: isFrench
      ? 'Seif Eddine Slimene | Projets'
      : 'Seif Eddine Slimene | Projects',
    pageDescription: isFrench
      ? 'Projets de Seif Eddine Slimene, développeur Fullstack Javascript : Blogify CMS, plateforme sociale Mosaic et plateforme e-commerce WebShop.'
      : 'Projects by Seif Eddine Slimene, Fullstack Javascript Developer: Blogify CMS, Mosaic social platform, and WebShop e-commerce platform.',
    heroTitle: isFrench
      ? 'Projets Fullstack sélectionnés'
      : 'Selected Fullstack Projects',
  };

  const FEATURE_FLAGS = {
    showVisitCta: false,
  };
  const localizedProjects = projects.map((project) =>
    isFrench
      ? {
          ...project,
          summary: PROJECT_SUMMARIES_FR[project.id] ?? project.summary,
        }
      : project,
  );
  const featuredProjects = localizedProjects.filter((project) => project.featured);
  const standardProjects = localizedProjects.filter((project) => !project.featured);
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
        <title>{labels.pageTitle}</title>
        <meta
          name='description'
          content={labels.pageDescription}
        ></meta>
      </Head>
      <TransitionEffect />
      <main className='w-full mb-16 flex flex-col items-center justify-center dark:text-light'>
        <Layout className='pt-16'>
          <AnimatedText
            text={labels.heroTitle}
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
                  labels={labels}
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
                  labels={labels}
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
        labels={labels}
      />
    </>
  );
};

export default ProjectsPage;
