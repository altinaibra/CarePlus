const HeaderStyles = {
  header:
    "bg-slate-700 dark:[background-color:oklch(20.5%_0_0)] text-white px-5 py-4 flex items-center justify-between relative border-b border-gray-300 dark:[border-bottom-color:oklch(47.6%_0.114_61.907)]",

  logoContainer: "flex items-center gap-2 z-10",

  nav: "flex-1 flex justify-center gap-6 text-2xl",

  navLink:
    "relative group flex items-center gap-1 text-white hover:text-gray-200 transition pb-2",

  navLabel: `
    relative text-sm
    before:content-[''] before:absolute before:left-0 before:bottom-0 before:h-[2px] before:w-full
    before:bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.95),transparent)]
    dark:before:bg-[linear-gradient(90deg,transparent,oklch(47.6%_0.114_61.907),transparent)]
    before:bg-[length:200%_100%] before:opacity-0
    group-hover:before:opacity-100 group-hover:before:animate-underlineSlide

    after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:h-[2px] after:w-full
    after:bg-[linear-gradient(90deg,transparent,rgba(148,163,184,0.95),transparent)]
    dark:after:bg-[linear-gradient(90deg,transparent,oklch(47.6%_0.114_61.907),transparent)]
    after:bg-[length:200%_100%] after:opacity-0
    group-hover:after:opacity-100 group-hover:after:animate-underlineSlideReverse
  `,

  rightSection: "flex items-center gap-4 z-10",

  userButton:
    "flex items-center gap-2 p-2 rounded-full bg-gray-200 text-gray-900 hover:bg-gray-300 dark:[background-color:oklch(20.5%_0_0)] dark:text-gray-100 dark:hover:[background-color:oklch(20.5%_0_0)] transition",

  dropdown:
    "absolute right-0 mt-2 w-44 bg-white dark:[background-color:oklch(20.5%_0_0)] text-gray-900 dark:text-gray-100 rounded-md shadow-lg py-2 z-20 flex flex-col border border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)]",

  dropdownItem:
    "block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",

  dropdownButton:
    "w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700",
};

export default HeaderStyles;
