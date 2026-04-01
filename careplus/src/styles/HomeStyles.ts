// HomeStyles.ts
export const HomeStyles = {
  container: "px-4 py-6 md:p-10 text-center pb-24 md:pb-20",
  subtitle:
    "text-base md:text-lg text-gray-600 dark:text-gray-300 mb-6 md:mb-10",

  sectionHeaderContainer:
    "flex items-center justify-center md:justify-center mb-4 md:mb-6",
  sectionHeaderIcon: "mr-2 text-gray-700 dark:text-white text-2xl",
  sectionHeaderTitle: "text-xl md:text-2xl font-bold",

  card: `
    w-[calc(50%-0.75rem)] sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)]
    rounded-lg p-4 md:p-5 shadow-md
    bg-white dark:[background-color:oklch(20.5%_0_0)]
    text-gray-900 dark:text-gray-100
    relative border-animated
    `,
  cardTitle: "text-base md:text-lg font-semibold mb-2 cursor-pointer",

  roomCard: `
  border border-gray-300 dark:[border-color:oklch(47.6%_0.114_61.907)]
  w-[calc(50%-0.75rem)] sm:w-[calc(50%-1.25rem)] lg:w-[calc(33.333%-1.25rem)]
  rounded-lg p-4 md:p-5 shadow-md
  bg-white dark:[background-color:oklch(20.5%_0_0)]
  text-gray-900 dark:text-gray-100
`,
  roomInfo: "text-sm text-gray-600 dark:text-gray-300 space-y-1",

  noRooms: "text-gray-500 dark:text-gray-400",

  bottomBar: `
  fixed bottom-0 left-0 w-full text-center 
  py-3 md:py-4 
  bg-white/80 dark:bg-black/20 
  backdrop-blur-sm 
  text-gray-700 dark:text-gray-300 
  border-t border-gray-200 dark:[border-color:oklch(47.6%_0.114_61.907)]
  z-50
`,
  bottomBarName: "text-sm font-semibold truncate",
  bottomBarEmail: "text-xs md:text-sm truncate",
  cardsContainer:
    "flex flex-wrap justify-center gap-3 md:gap-5 max-w-4xl mx-auto",
};
