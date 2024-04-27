import Menu from './Menu';

export const Sidebar = () => {
  return (
    <nav
      className="fixed bottom-0 top-0 z-10 mt-[72px] hidden w-[70px] overflow-y-auto bg-dark-1 px-3 pt-12 sm:block
    xl:w-[264px]"
    >
      <ul className="flex flex-col gap-3">
        <Menu />
      </ul>
    </nav>
  );
};
