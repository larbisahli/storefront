/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Scrollbar } from '@components/common/scrollbar';
import ActiveLink from '@components/ui/active-link';
import { useAppDispatch } from '@hooks/use-store';
import { siteSettings } from '@settings/site-settings';
import { openMenu } from '@store/drawer/index';
import CloseIcon from 'assets/icons/close';
import Logo from 'assets/icons/logo';
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube
} from 'assets/icons/social-icons';
import Link from 'next/link';
import { memo } from 'react';

const menus = [
  {
    id: 1,
    title: 'About us',
    pathname: '/about-us'
  },
  {
    id: 2,
    title: 'contact us',
    pathname: '/contact-us'
  },
  {
    id: 4,
    pathname: '/faq',
    title: 'FAQs'
  },
  {
    id: 5,
    title: 'Privacy',
    pathname: '/privacy'
  },
  {
    id: 6,
    pathname: '/terms',
    title: 'Terms & Conditions'
  }
];

const social = [
  {
    id: 0,
    link: '/',
    icon: <Facebook />,
    className: 'facebook',
    title: 'facebook'
  },
  {
    id: 1,
    link: '/',
    icon: <Twitter />,
    className: 'twitter',
    title: 'twitter'
  },
  {
    id: 2,
    link: '/',
    icon: <Youtube />,
    className: 'youtube',
    title: 'youtube'
  },
  {
    id: 3,
    link: '/',
    icon: <Github />,
    className: 'github',
    title: 'github'
  },
  {
    id: 4,
    link: '/',
    icon: <Instagram />,
    className: 'instagram',
    title: 'instagram'
  },
  {
    id: 5,
    link: '/',
    icon: <Linkedin />,
    className: 'linkedin',
    title: 'linkedin'
  }
];

function DrawerMenu() {
  const dispatch = useAppDispatch();

  const hideMenu = () => {
    dispatch(openMenu(false));
  };

  return (
    <>
      <div className="flex flex-col w-full h-full">
        <div className="w-full h-90px bg-gray-100 flex justify-start items-center relative px-30px flex-shrink-0">
          <Link href="/">
            <a
              title="dropgala"
              role="button"
              className="flex"
              onClick={hideMenu}
            >
              <Logo width="60px" id="dropgala-menu-logo" />
            </a>
          </Link>

          <div className="flex items-center justify-end ml-auto pl-30px pr-50px text-gray-700 flex-shrink-0 lg:hidden">
            {/* <PhoneIcon /> */}
            <span className="font-semibold text-base ml-3">
              {siteSettings.contact?.phone_number}
            </span>
          </div>

          <button
            className="w-30px h-30px flex items-center justify-center text-gray-500 absolute right-25px focus:outline-none"
            onClick={hideMenu}
            aria-label="close"
          >
            <CloseIcon />
          </button>
        </div>

        <Scrollbar className="menu-scrollbar flex-grow">
          <div className="flex flex-col py-60px pb-40px lg:pb-60px">
            {menus.map((menu, index) => (
              <ActiveLink
                href={menu.pathname}
                activeClassName="font-semibold active"
                key={index}
              >
                <a
                  role="button"
                  className="menu-item relative text-gray-900 pl-30px pr-4 mb-8 transition duration-300 ease-in-out last:mb-0 hover:text-gray-900"
                  onClick={hideMenu}
                >
                  {menu.title}
                </a>
              </ActiveLink>
            ))}
          </div>
        </Scrollbar>

        <div className="flex items-center justify-start border-t border-gray-300 bg-gray-100 h-12 px-30px flex-shrink-0 lg:hidden">
          {social.map((item, index) => (
            <Link href={item.link} key={index}>
              <a className={`social ${item.className}`} target="_blank">
                <span className="sr-only">{item.title}</span>
                {item.icon}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default memo(DrawerMenu);
