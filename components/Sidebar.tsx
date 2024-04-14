import Menu from './Menu';

export const Sidebar = () => {
  return (
    <nav
      className="hidden sm:block fixed w-[70px] bottom-0 top-0 overflow-y-auto bg-dark-1 z-10 mt-[72px] pt-12 px-3
    xl:w-[264px]"
    >
      <ul className="flex flex-col gap-3">
        <Menu />
      </ul>
    </nav>
  );
};
