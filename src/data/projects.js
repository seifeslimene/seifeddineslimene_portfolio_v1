const createGallery = (cover, images = []) => {
  const additionalImages = Array.isArray(images)
    ? images
    : images
      ? [images]
      : [];

  const mergedImages = [cover, ...additionalImages].filter(Boolean);
  const uniqueImages = mergedImages.filter(
    (image, index) => mergedImages.indexOf(image) === index
  );

  return {
    cover,
    images: uniqueImages,
  };
};

const GITHUB_USERNAME = 'seifeslimene';

const toGithubRepoSlug = (value) =>
  value
    .replace(/e_-_/g, 'e-')
    .replace(/_+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const createGithubUrl = (repoSlug) =>
  `https://github.com/${GITHUB_USERNAME}/${repoSlug}`;

const normalizeGithubLinks = ({ github, githubRepo, githubLinks, id }) => {
  if (Array.isArray(githubLinks) && githubLinks.length > 0) {
    return githubLinks.map((item, index) => {
      if (typeof item === 'string') {
        return {
          label: `Repo ${index + 1}`,
          url: item,
        };
      }

      return {
        label: item.label ?? `Repo ${index + 1}`,
        url: item.url,
      };
    });
  }

  return [
    {
      label: 'Repository',
      url: github ?? createGithubUrl(githubRepo ?? toGithubRepoSlug(id)),
    },
  ];
};

const imagePath = (folder, projectFolder, fileName) =>
  `/images/projects/${folder}/${projectFolder}/${fileName}`;

const createGalleryFromFolders = ({
  webFolder,
  mobileFolder,
  coverFolder = 'web',
  coverFile,
  web = [],
  mobile = [],
}) => {
  const coverProjectFolder = coverFolder === 'web' ? webFolder : mobileFolder;
  const cover = imagePath(coverFolder, coverProjectFolder, coverFile);
  const webImages = web.map((fileName) => imagePath('web', webFolder, fileName));
  const mobileImages = mobile.map((fileName) =>
    imagePath('mobile', mobileFolder, fileName)
  );

  return createGallery(cover, [...webImages, ...mobileImages]);
};

const createProject = ({
  id,
  title,
  summary,
  link = '/',
  github,
  githubRepo,
  githubLinks,
  type = 'Project',
  featured = false,
  webFolder = id,
  mobileFolder = id,
  web = [],
  mobile = [],
}) => {
  const hasWebCover = web.length > 0;
  const coverFolder = hasWebCover ? 'web' : 'mobile';
  const coverFile = hasWebCover ? web[0] : mobile[0];

  return {
    id,
    title,
    summary,
    link,
    githubLinks: normalizeGithubLinks({
      github,
      githubRepo,
      githubLinks,
      id,
    }),
    type,
    gallery: createGalleryFromFolders({
      webFolder,
      mobileFolder,
      coverFolder,
      coverFile,
      web,
      mobile,
    }),
    featured,
  };
};

const projects = [
  createProject({
    id: 'blogify',
    title: 'Blogify',
    summary:
      'Blogify is an open-source content management system designed for individuals to publish articles, create custom pages, manage comments, organize knowledge booklets, and maintain their online presence with ease. It provides a complete publishing platform with a public-facing blog website, an admin management dashboard for content control, and email management capabilities to keep readers informed. Users can manage articles and pages, track statistics, configure system settings, handle file uploads, and moderate comments all from an intuitive administrative interface, making it an ideal solution for bloggers and content creators who want full control over their digital publishing needs.',
    githubLinks: [
      { label: 'Fullstack', url: 'https://github.com/seifeslimene/blogify' }
    ],
    type: 'Dec 2022 - Jun 2023',
    web: ['blogify_4.jpg', 'blogify_7.jpg'],
  }),
  createProject({
    id: 'mosaic',
    title: 'Mosaic - Social Media Website',
    summary:
      'Mosaic is a social media platform that allows users to share, discover, and engage with their community through posts, comments, and likes. Users can create accounts, build profiles, follow other users, and discover content from those they follow through a dedicated feed while receiving real-time notifications for interactions like likes and follows. With features for posting, editing, and deleting content, mentioning other users, and adding reactions to posts, Mosaic provides a comprehensive social networking experience with a responsive, mobile-first interface that works seamlessly across all devices.',
    githubLinks: [
      { label: 'fullstack', url: 'https://github.com/seifeslimene/mosaic' },
    ],
    type: 'Jan 2022 - Apr 2022',
    web: ['mosaic-feed-desktop-1920x1080.png'],
  }),
  createProject({
    id: 'webshop',
    title: 'WebShop - E-Commerce Website',
    summary:
      'Webshop is a full-featured e-commerce platform that combines a customer-facing storefront with a comprehensive admin management system. On the user side, customers can browse products across multiple category levels, search for items, view detailed product information, manage their shopping cart, complete checkout, create accounts, track their orders, write reviews, and manage their delivery addresses. The admin platform enables store managers to oversee all operations including user management, product and category organization, order processing, review moderation, and promotional content management through sliders and banners. Built with a responsive design that works seamlessly on both desktop and mobile devices, Webshop provides a complete solution for running a modern online retail business.',
    githubLinks: [
      { label: 'fullstack', url: 'https://github.com/seifeslimene/webshop' },
    ],
    type: 'Mar 2021 - Aug 2021',
    web: [
      'admin-auth-dashboard-1920x1080.png',
      'admin-auth-products-1920x1080.png',
      'admin-auth-users-1920x1080.png',
      'home-desktop-1920x1080.png',
    ],
  }),
  createProject({
    id: 'webshop_mobile',
    title: 'WebShop Mobile App',
    summary: 'Webshop is a mobile e-commerce application that allows customers to browse products, explore different categories, view detailed product information and reviews, manage their shopping cart, and complete purchases directly from their mobile devices. The app also enables users to track their orders, manage their account information and addresses, and leave reviews for products they\'ve purchased. Built with an elegant and responsive interface, it provides a seamless shopping experience with all the essential features of a complete e-commerce platform.',
    githubLinks: [
      { label: 'fullstack', url: 'https://github.com/seifeslimene/webshop_mobile_app' },
    ],
    mobileFolder: 'webshop',
    mobile: [
      'webshop_mobile_app_1.jpg',
      'webshop_mobile_app_2.jpg',
      'webshop_mobile_app_3.jpg',
      'webshop_mobile_app_4.jpg',
      'webshop_mobile_app_5.jpg',
    ],
  }),
  createProject({
    id: 'booking_plugin_system',
    title: 'Booking Plugin System',
    summary: 'The Booking System Plugin is a reusable web component built with Stencil that enables businesses to integrate appointment and reservation functionality into their websites. This plugin provides a standalone, framework-agnostic component that can be easily embedded into any web application through script tags or NPM installation, allowing customers to browse availability and book appointments seamlessly. The component is designed to work independently or within existing web applications, offering a professional booking experience that can be customized and deployed across different platforms and websites.',
    githubLinks: [{ label: 'fullstack', url: 'https://github.com/seifeslimene/booking_system_plugin_clone' }],
    web: ['2026-05-26_16-53.png', '2026-05-26_16-54.png', '2026-05-26_16-55.png'],
  }),
  createProject({
    id: 'chattorro',
    title: 'Chattorro',
    summary: 'Chattorro is a secure and user-friendly platform that enables secure account creation and login functionality. Users can register with their personal information, log in with their credentials, and access their accounts through an intuitive interface. Built with Next.js and MySQL, the application provides a responsive design that works seamlessly across desktop, tablet, and mobile devices, making account management accessible to users regardless of their device. The platform offers a straightforward authentication experience with dedicated login and registration pages designed for ease of use and security.',
    githubLinks: [{ label: 'fullstack', url: 'https://github.com/seifeslimene/chattorro' }],
    web: ['desktop.png', 'login-desktop.png', 'register-desktop.png'],
  }),
  createProject({
    id: 'dev_finder',
    title: 'Dev Finder',
    summary: 'DevFinder is a collaborative video communication platform that connects developers and professionals through virtual rooms for real-time collaboration and discussions. Users can browse available rooms, create their own collaboration spaces, sign in securely, and join specific rooms to interact with other professionals through live video streaming. The platform provides an intuitive interface for discovering and managing rooms, enabling seamless communication and teamwork across desktop, tablet, and mobile devices. Built with Next.js and PostgreSQL, DevFinder facilitates professional networking and remote collaboration for developers seeking to connect and work together on projects.',
    githubLinks: [{ label: 'fullstack', url: 'https://github.com/seifeslimene/dev_finder/' }],
    web: [
      'create-room-desktop.png',
      'create-room-tablet.png',
      'room-detail-desktop.png',
      'screenshot-desktop.png',
      'screenshot-mobile.png',
      'screenshot-tablet.png',
    ],
  }),
  createProject({
    id: 'e_-_commerce_favourites',
    title: 'E-Commerce Favourites',
    summary: 'Tunisia E-Commerce is a modern e-commerce platform that combines a responsive web storefront with a robust backend API to deliver an exceptional shopping experience. The frontend presents products in an organized grid layout with pagination support, adapting seamlessly to desktop, tablet, and mobile devices for convenient browsing across all screen sizes. The backend provides a comprehensive API with complete documentation through Swagger UI, managing product data and serving it dynamically to the frontend. Together, the platform enables customers to discover and explore products through an intuitive interface while the backend infrastructure ensures efficient data management, scalability, and reliable API services to power the entire e-commerce operation.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/you_com_backend' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/you_com_frontend' },
    ],
    web: ['screenshot-desktop.png', 'screenshot-mobile.png', 'screenshot-tablet.png'],
  }),
  createProject({
    id: 'e_-_commerce_informatique',
    title: 'E-Commerce Informatique',
    summary: 'E-Commerce Informatique is a full-featured computer and technology products marketplace that brings together customers and sellers in a seamless digital shopping experience. The platform allows users to browse a comprehensive catalog of tech products organized by categories, view detailed product information, search and filter items based on their needs, manage their shopping carts, and complete purchases through a secure checkout process. Customers can create accounts to maintain order history, manage their profiles, and track their purchases, while the backend infrastructure powered by Node.js, Express, and MongoDB provides robust APIs to handle user authentication, product management, category organization, and order processing. With a responsive design optimized for all devices, E-Commerce Informatique delivers an intuitive shopping interface combined with reliable backend services to facilitate buying and selling of computer hardware and related products.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/e_commerce_informatique_backend' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/e_commerce_informatique_front' },
    ],
    web: ['homepage-preview.jpg'],
  }),
  createProject({
    id: 'flex_farm',
    title: 'Flex Farm',
    summary: 'Flex Farm is an agricultural technology platform designed to support modern farming operations through a comprehensive web application. The frontend provides farmers and agricultural professionals with an intuitive interface to manage their farming activities, monitor crop operations, and access agricultural tools and resources. The backend infrastructure, built with Node.js and JavaScript, delivers the necessary APIs and services to handle farm data management, crop tracking, and operational workflows. Together, Flex Farm creates a complete digital solution for flexible and efficient agricultural management, enabling users to organize and optimize their farming practices through a responsive web-based platform.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/flex_farm_backend' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/flex_farm_frontend' },
    ],
    web: ['flex-farm-desktop.png', 'flex-farm-mobile.png', 'flex-farm-tablet.png'],
  }),
  createProject({
    id: 'fusion_smart',
    title: 'Fusion Smart',
    summary: 'Fusion Smart is a comprehensive energy monitoring and analytics dashboard that enables organizations to track, analyze, and optimize their energy consumption and costs. The platform provides users with detailed insights into energy usage across departments, real-time monitoring of connected appliances and meters, carbon emissions tracking for sustainability goals, and cost analysis to identify savings opportunities. Administrators can manage users, monitor overall energy performance, and generate reports across multiple metrics including department-level usage patterns and equipment efficiency. With a fully responsive design that works seamlessly on desktop, tablet, and mobile devices, Fusion Smart combines a React-based frontend interface with a robust Express REST API and MongoDB backend to deliver a complete solution for businesses seeking to reduce energy costs, track environmental impact, and improve operational efficiency.',
    githubLinks: [
      { label: 'Frontend', url: 'https://github.com/seifeslimene/fusion_smart_frontend' },
      { label: 'Backend', url: 'https://github.com/seifeslimene/fusion_smart_backend' },
    ],
    web: [
      'appliances-desktop.png',
      'compteur-desktop.png',
      'contact-desktop.png',
      'cost-desktop.png',
      'dashboard-desktop.png',
      'dashboard-mobile.png',
      'dashboard-tablet.png',
      'emissions-desktop.png',
      'landing-desktop.png',
      'usage-desktop.png',
      'users-desktop.png',
    ],
  }),
  createProject({
    id: 'herbal_e_-_commerce_tunisia',
    title: 'Herbal E-Commerce Tunisia',
    summary: 'E-Commerce Tunisia Green is a modern sustainable products marketplace that brings together an eco-conscious shopping experience with comprehensive business management tools. The customer-facing storefront enables shoppers to browse and discover green products, register and log in securely, manage their shopping cart with add, remove, and quantity adjustment features, view detailed product information with pagination support, and complete purchases through secure Stripe payment processing. Customers can reset passwords, receive email confirmations, and track their complete order history. The admin platform, powered by Sanity Studio, provides content creators and business managers with an intuitive interface to manage product catalogs and storefront content across all devices. The robust backend infrastructure built with NestJS, PostgreSQL, and Redis handles user authentication with JWT tokens, secure password management, email notifications, payment processing, and data persistence. Together, the platform delivers a complete e-commerce solution that prioritizes both user experience and sustainable shopping practices.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/ecommerce_green_back' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/ecommerce_green_front' },
      { label: 'Admin', url: 'https://github.com/seifeslimene/ecommerce_green_admin' },
    ],
    web: ['home-desktop.png', 'home-mobile.png', 'home-tablet.png'],
  }),
  createProject({
    id: 'influen_x',
    title: 'Influen X',
    summary: 'influenX is an influencer and event management platform that connects creators and audiences through a centralized hub for discovering, managing, and participating in events. The platform enables users to browse upcoming events, manage event information, and engage with the influencer community through a responsive web interface that works seamlessly across desktop, tablet, and mobile devices. Built with a Node.js and Express backend powered by MongoDB for data management, combined with a modern JavaScript frontend featuring SCSS styling for a polished visual experience, influenX provides a complete solution for event discovery and influencer networking in the digital creator economy.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/influen_x_backend' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/influen_x_frontend' },
    ],
    web: ['influenx-home-desktop.png', 'influenx-home-mobile.png', 'influenx-home-tablet.png'],
  }),
  createProject({
    id: 'ingiz',
    title: 'Ingiz',
    summary: 'Ingiz is a professional fintech/banking mobile application that enables adult users to issue and manage payment cards, conduct financial transactions (transfers, top-ups, payments), and access comprehensive account management features integrated with an external banking system. The platform combines robust backend services with a React Native mobile app, featuring biometric authentication, multi-currency support, and agent/operator management for customer support. It is strictly designed for adult users requiring government-issued identification and follows enterprise-grade security standards, with no provisions for minors or child users.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/ingiz_mobile_app_back' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/ingiz_mobile_app_front' },
    ],
    mobile: [
      'ingiz_mobile_app_1.jpg',
      'ingiz_mobile_app_10.jpg',
      'ingiz_mobile_app_2.jpg',
      'ingiz_mobile_app_3.jpg',
      'ingiz_mobile_app_5.jpg',
      'ingiz_mobile_app_6.jpg',
      'ingiz_mobile_app_9.jpg',
    ],
  }),
  createProject({
    id: 'react_phone_store',
    title: 'React Phone Store',
    summary: 'React Phone Ecommerce is a mobile phone retail platform that enables customers to browse, search, and purchase smartphones and related devices online. Built with React, the application provides an intuitive shopping interface where users can explore phone categories, view detailed product information, compare models, and manage their shopping cart before completing purchases. The platform delivers a responsive and interactive experience for discovering and buying mobile phones through a modern web-based storefront.',
    githubLinks: [{ label: 'Fullstack', url: 'https://github.com/seifeslimene/react_phone_ecommerce' }],
    web: [
      'react_phone_ecommerce_1.jpg',
      'react_phone_ecommerce_2.jpg',
      'react_phone_ecommerce_3.jpg',
    ],
  }),
  createProject({
    id: 'sales_app',
    title: 'Sales App',
    summary: 'Sales App is a modern sales management and tracking platform that helps sales teams monitor their performance, manage deals, and track revenue opportunities. The frontend built with Next.js and TypeScript provides a user-friendly interface for sales representatives and managers to view sales metrics, track transactions, and manage customer interactions. The backend API developed in Java delivers robust services for handling sales data, transaction processing, and reporting functionalities. Together, the Sales App creates a complete solution for businesses to streamline their sales operations, monitor performance metrics, and make data-driven decisions through an intuitive web-based dashboard combined with a reliable backend infrastructure.',
    githubLinks: [
      { label: 'Frontend', url: 'https://github.com/seifeslimene/sales_app_frontend_only' },
      { label: 'Backend', url: 'https://github.com/seifeslimene/sales_api' },
    ],
    web: ['sales_app_1.jpg', 'sales_app_2.jpg'],
  }),
  createProject({
    id: 'seif_shop',
    title: 'Seif Shop',
    summary: 'Seif Shop is a comprehensive full-stack e-commerce clothing platform that combines a stylish customer shopping experience with powerful content management capabilities. The customer-facing application built with Next.js enables shoppers to browse clothing products, explore categories with interactive sliders, manage their shopping cart, and complete secure purchases through integrated Stripe payment processing. The shopping experience includes beautiful notifications, celebration effects upon successful purchases, and product imagery sourced from a centralized content database. Behind the scenes, the admin platform powered by Sanity provides store managers with a content management studio to organize and publish clothing products, manage inventory, and maintain the product catalog in real-time. Together, Seif Shop delivers a modern e-commerce solution for fashion retailers to sell clothing online while maintaining full control over product content and inventory through an intuitive admin interface.',
    githubLinks: [
      { label: 'Frontend', url: 'https://github.com/seifeslimene/seif_shop_app' },
      { label: 'Admin', url: 'https://github.com/seifeslimene/seif_shop_admin' },
    ],
    web: ['localhost-3002-desktop.png'],
  }),
  createProject({
    id: 'seif_store',
    title: 'Seif Store',
    summary: 'Seif Store is a modern e-commerce platform specializing in computer hardware and peripherals that delivers a seamless shopping experience with secure Google authentication. Customers can explore products organized by categories such as mice and keyboards, search for specific items, filter products by price in ascending or descending order, and manage their shopping cart with full add, remove, and quantity adjustment capabilities. The platform features detailed product pages with comprehensive information, secure payment processing through Stripe API integration, and a complete order history for tracking previous purchases. Built with Next.js 13, React Query, and Tailwind CSS, Seif Store combines a responsive frontend interface with a PostgreSQL database and Prisma ORM backend to provide a reliable and user-friendly solution for purchasing computer peripherals online.',
    githubLinks: [
      { label: 'Fullstack', url: 'https://github.com/seifeslimene/seif_store' },
    ],
    featured: true,
    web: [
      'screenshot-home.png',
      'screenshot-keyboards.png',
      'screenshot-mouses.png',
      'screenshot-product.png',
      'screenshot-search.png',
    ],
  }),
  createProject({
    id: 'seo_blog',
    title: 'SEO Blog',
    summary: 'SEO Blog is a comprehensive blogging platform designed for content creators and publishers to share articles, engage with readers, and manage their online presence with search engine optimization in mind. The frontend built with Next.js provides an intuitive interface for readers to discover and read blog posts, with support for user authentication and admin capabilities for content management. The backend REST API developed with Express and MongoDB powers the platform`\'s core functionality, handling user authentication with JWT tokens, blog post management, and data persistence. Administrators with appropriate role permissions can create, edit, and publish content through the platform, while readers enjoy optimized, fast-loading pages designed for search visibility. Together, SEO Blog creates a complete solution for publishing quality content with built-in SEO best practices and a user-friendly interface for both readers and content creators.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/seo_blog_back' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/seo_blog_front' },
    ],
    web: [
      'seo_blog_1.jpg',
      'seo_blog_2.jpg',
      'seo_blog_3.jpg',
      'seo_blog_4.jpg',
      'seo_blog_5.jpg',
      'seo_blog_6.jpg',
    ],
  }),
  createProject({
    id: 'tunisia_gadgets',
    title: 'Tunisia Gadgets',
    summary: 'The Tunisia Gadgets Admin Dashboard is a web-based management platform designed for store administrators to oversee and control all operations of the online gadgets store. It enables administrators to manage product listings, monitor customer orders, track inventory levels, and maintain the overall health of the e-commerce business. Built as a Next.js application, it provides a user-friendly interface for handling the backend operations that keep the Tunisia Gadgets mobile store running smoothly and efficiently.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/tunisia_gadgets_mobile_app_back' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/tunisia_gadgets_mobile_app_front' },
      { label: 'Admin', url: 'https://github.com/seifeslimene/tunisia_gadgets_mobile_app_admin' },
    ],
    mobile: ['readme-screenshot.png', 'tunisia_gadgets_mobile_app.jpg'],
  }),
  createProject({
    id: 'tunisia_green_e_-_commerce',
    title: 'Tunisia Green E-Commerce',
    summary: 'Tunisia Green is an eco-conscious mobile e-commerce platform that enables customers to authenticate securely, browse and discover products, manage their shopping cart and wishlist, and complete purchases with multiple payment options including cash and credit card. The app offers personalized user experiences with biometric login support, real-time order tracking with push notifications, the ability to upload and edit profile information, and features for sharing products on social media. Supported by a robust backend infrastructure, it provides email notifications for password resets and order updates, along with seamless product payment processing and inventory management for a complete sustainable shopping experience.',
    githubLinks: [
      { label: 'Backend', url: 'https://github.com/seifeslimene/tunisia_green_ecommerce_mobile_app_backend' },
      { label: 'Frontend', url: 'https://github.com/seifeslimene/tunisia_green_ecommerce_mobile_app_frontend' },
    ],
    mobile: [
      'screenshot_1.jpg',
      'screenshot_2.jpg',
      'screenshot_3.jpg',
      'screenshot_4.jpg',
      'screenshot_5.jpg',
      'screenshot_6.jpg',
    ],
  }),
  createProject({
    id: 'tunisia_movies',
    title: 'Tunisia Movies',
    summary: 'Tunisia Movies is a mobile application that enables users to discover, browse, and explore movies available in Tunisia\'s entertainment landscape. The app provides a mobile-first experience for movie enthusiasts to search for films, view detailed information, and stay updated on local cinema offerings. Built with JavaScript and optimized for mobile devices, Tunisia Movies delivers an intuitive interface for accessing comprehensive movie information and entertainment content tailored to Tunisian audiences.',
    githubLinks: [{ label: 'fullstack', url: 'https://github.com/seifeslimene/tunisia_movies_mobile_app' }],
    mobile: [
      'tunisia_movies_1.jpg',
      'tunisia_movies_2.jpg',
      'tunisia_movies_3.jpg',
      'tunisia_movies_4.jpg',
      'tunisia_movies_5.jpg',
      'tunisia_movies_6.jpg',
    ],
  }),
  createProject({
    id: 'tunisia_social_media',
    title: 'Tunisia Social Media',
    summary: 'Tounsi Social Media is a modern Tunisian-focused social networking platform that connects users from Tunisia to share updates, engage with their community, and build meaningful connections. The platform enables users to authenticate securely through GitHub OAuth, view a personalized feed of posts from the community, and interact with others through a responsive interface that works seamlessly across desktop, tablet, and mobile devices. Built with Next.js 14, TypeScript, and powered by Turso (LibSQL) with Drizzle ORM for data management, Tounsi Social Media provides a lightweight yet feature-rich social experience. The application delivers fast performance, real-time interactions, and a clean user interface designed with NextUI components, creating an engaging social platform tailored for Tunisian users to stay connected and share their stories.',
    githubLinks: [
      { label: 'Fullstack', url: 'https://github.com/seifeslimene/tunisia_social_media' }
    ],
    web: ['home-desktop.png', 'home-mobile.png', 'home-tablet.png'],
  }),
  createProject({
    id: 'tunmart_store',
    title: 'Tunmart Store',
    summary: 'Tunmart Tunisia is a modern e-commerce storefront built with Next.js that brings online shopping to Tunisian consumers. The platform provides a responsive shopping experience across all devices, featuring a clean and intuitive interface for browsing products, managing shopping carts, and completing purchases. With a focus on mobile-first design, Tunmart Tunisia delivers a seamless shopping experience whether accessed from desktop, tablet, or mobile devices, enabling customers in Tunisia to discover and purchase products conveniently through a fast and reliable online marketplace.',
    githubLinks: [{ label: 'Fullstack', url: 'https://github.com/seifeslimene/tunmart_tunisia' }],
    web: ['desktop.png', 'mobile.png', 'tablet.png'],
  }),
  createProject({
    id: 'vanilla_online_store',
    title: 'Vanilla Online Store',
    summary: 'Vanille Online Store is a lightweight, responsive single-page application built with vanilla JavaScript that provides a streamlined online shopping experience without heavy frameworks. The platform enables customers to browse products, view detailed information, manage their shopping cart, and complete purchases through an intuitive interface. Integrated with EmailJS for customer communication and Firebase Real-time Database for product and order management, Vanille Online Store leverages the RAWG API for gaming products catalog. Built with vanilla JavaScript, jQuery, Bootstrap, HTML, and CSS, the store delivers a fast-loading, responsive design that works seamlessly across desktop, tablet, and mobile devices, offering an alternative e-commerce solution that emphasizes simplicity and performance.',
    githubLinks: [{ label: 'Fullstack', url: 'https://github.com/seifeslimene/vanille_online_store' }],
    web: ['vanille_online_store_1.jpg', 'vanille_online_store_2.jpg'],
  }),
];

export default projects;
