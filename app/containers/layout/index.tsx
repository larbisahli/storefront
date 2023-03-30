import React, { Fragment, memo } from 'react';
import cn from 'clsx'

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Layout = ({ children, className }: Props) => {
  return (
    <>
    {/* <Header/> */}
    <main
      className={cn(
        'max-w-[1300px] 2xxl:max-w-[1500px] mx-auto',
        'relative flex-grow h-full w-full',
        className
        )}
    >
      <div className="flex flex-col flex-grow">
        <div className="pt-80px flex-auto">{children}</div>
      </div>
    </main>
    </>
  );
};

export default memo(Layout);
