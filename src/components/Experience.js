import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import LiIcon from './LiIcon';
import { useLanguage } from '@/context/LanguageContext';

const Details = ({ position, company, companyLink, time, address, work }) => {
  const first = useRef(null);
  return (
    <li
      ref={first}
      className='my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]'
    >
      <LiIcon reference={first} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: 'spring' }}
      >
        <h3 className='capitalize font-bold text-2xl sm:text-xl xs:text-lg'>
          {position}&nbsp;
          <a
            href={companyLink}
            target='_blank'
            className='text-primary capitalize dark:text-primaryDark'
          >
            @{company}
          </a>
        </h3>
        <span className='capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm'>
          {time} | {address}
        </span>
        <ul className='font-medium w-full md:text-sm list-disc pl-5 mt-2 space-y-1'>
          {work.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';
  const experienceEntries = isFrench
    ? [
        {
          position: 'Développeur Frontend',
          company: 'Apprentus',
          companyLink: 'https://www.apprentus.com',
          time: 'Jan 2021 - Present',
          address: 'Tunis, Tunisie',
          work: [
            "Pilotage du développement de fonctionnalités orientées utilisateur qui ont amélioré l'engagement et la satisfaction.",
            'Création de bibliothèques de code réutilisables pour accélérer le workflow et augmenter la qualité.',
            'Validation de la faisabilité et de la cohérence des maquettes UI/UX.',
            'Optimisation de la vitesse et de la scalabilité pour de meilleures performances produit.',
            'Résolution des problèmes cross-browser pour garantir une expérience cohérente sur toutes les plateformes.',
            'Application des bonnes pratiques SEO pour renforcer la visibilité et le trafic.',
          ],
        },
        {
          position: 'Développeur Fullstack',
          company: 'Freelance Indépendant',
          companyLink: 'https://www.linkedin.com/in/seifeslimene',
          time: 'Dec 2019 - Jan 2021',
          address: 'Tunis, Tunisie',
          work: [
            'Livraison de plusieurs projets clients de bout en bout en tant que freelance indépendant.',
            "Conception d'un système de plugin de réservation Stencil.js intégrable via une balise script Javascript.",
            'Implémentation de la sélection de services, de la planification calendrier et du chargement dynamique des créneaux via Ajax.',
            'Dépannage et optimisations majeures de performance sur des sites WordPress en HTML, CSS et PHP.',
          ],
        },
        {
          position: 'Administrateur ERP Fonctionnel',
          company: 'LE SOIE S.A.R.L.',
          companyLink: 'https://www.linkedin.com/in/seifeslimene',
          time: 'Jun 2017 - Nov 2019',
          address: 'Monastir, Tunisie',
          work: [
            "Intégration de nouvelles fonctionnalités ERP via des évolutions basées sur l'API.",
            "Amélioration des capacités système et de l'expérience utilisateur globale.",
            "Création d'une documentation complète pour accélérer l'adoption des nouvelles fonctionnalités.",
          ],
        },
      ]
    : [
        {
          position: 'Frontend Developer',
          company: 'Apprentus',
          companyLink: 'https://www.apprentus.com',
          time: 'Jan 2021 - Present',
          address: 'Tunis, Tunisia',
          work: [
            'Led development of user-focused features that improved engagement and satisfaction.',
            'Built reusable code libraries to streamline workflow and improve quality.',
            'Validated UI/UX designs for feasibility, quality, and consistency.',
            'Optimized speed and scalability for better product performance.',
            'Resolved cross-browser issues to keep experience consistent across platforms.',
            'Applied SEO best practices to improve visibility and traffic.',
          ],
        },
        {
          position: 'Fullstack Developer',
          company: 'Independent Freelancer',
          companyLink: 'https://www.linkedin.com/in/seifeslimene',
          time: 'Dec 2019 - Jan 2021',
          address: 'Tunis, Tunisia',
          work: [
            'Delivered multiple client projects end-to-end as an independent freelancer.',
            'Built a Stencil.js booking plugin system embeddable via a Javascript script tag.',
            'Implemented service selection, calendar scheduling, and dynamic slot loading with Ajax.',
            'Handled troubleshooting and major performance enhancements for WordPress sites using HTML, CSS, and PHP.',
          ],
        },
        {
          position: 'Functional ERP Administrator',
          company: 'LE SOIE S.A.R.L.',
          companyLink: 'https://www.linkedin.com/in/seifeslimene',
          time: 'Jun 2017 - Nov 2019',
          address: 'Monastir, Tunisia',
          work: [
            'Integrated new ERP features through API-driven enhancements.',
            'Improved system capabilities and overall user experience.',
            'Created comprehensive documentation for new functionalities to speed user adoption.',
          ],
        },
      ];

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'center start'],
  });
  return (
    <div className='my-64'>
      <h2 className='font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16'>
        {isFrench ? 'Experience' : 'Experience'}
      </h2>
      <div ref={ref} className='w-[75%] mx-auto relative lg:w-[90%] md:w-full'>
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className='absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]'
        />
        <ul className='w-full flex flex-col items-start justify-between ml-4 xs:ml-2'>
          {experienceEntries.map((entry) => (
            <Details key={`${entry.company}-${entry.time}`} {...entry} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
