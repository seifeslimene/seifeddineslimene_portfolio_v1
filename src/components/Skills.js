import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const Skill = ({ name, x, y }) => {
  return (
    <motion.div
      className='flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold'
      whileHover={{ scale: 1.05 }}
      initial={{ x: 0, y: 0 }}
      whileInView={{ x: x, y: y, transition: { duration: 1.5 } }}
      viewport={{ once: true }}
    >
      {name}
    </motion.div>
  );
};

const Skills = () => {
  const { language } = useLanguage();
  const isFrench = language === 'fr';

  return (
    <>
      <h2 className='font-bold text-8xl mt-64 w-full text-center md:text-6xl md:mt-32'>
        {isFrench ? 'Compétences' : 'Skills'}
      </h2>
      <div
        className='w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark lg:h-[80vh] sm:h-[60vh] xs:h-[40vh] lg:bg-circularLightLg lg:dark:bg-circularDarkLg md:bg-circularLightMd md:dark:bg-circularDarkMd sm:bg-circularLightSm sm:dark:bg-circularDarkSm'
      >
        <motion.div
          className='flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light lg:p-6 md:p-4 xs:text-xs xs:p-2'
          whileHover={{ scale: 1.05 }}
        >
          {isFrench ? 'Fullstack' : 'Fullstack'}
        </motion.div>
        <Skill name='React' x='-23vw' y='2vw' />
        <Skill name='Kea.js' x='-10vw' y='-12vw' />
        <Skill name='Material UI' x='18vw' y='-11vw' />
        <Skill name='Node.js' x='22vw' y='7vw' />
        <Skill name='SQL' x='-3vw' y='13vw' />
        <Skill name='Linux Administration' x='-30vw' y='-5vw' />
        <Skill name='DevOps' x='31vw' y='-2vw' />
        <Skill name='Next.js' x='-22vw' y='-16vw' />
        <Skill name='Tailwind CSS' x='14vw' y='14vw' />
        <Skill name='Redux Toolkit' x='-26vw' y='13vw' />
        <Skill name='Nest.js' x='7vw' y='-10vw' />
        <Skill name='Bash' x='27vw' y='12vw' />
        <Skill name='AWS / GCP' x='0vw' y='-19vw' />
      </div>
    </>
  );
};

export default Skills;
