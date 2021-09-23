import Link from 'next/link';
import { useRouter } from 'next/router';

import data from './data';
import { useToggle } from '../provider/context';

const style = {
  title: `mx-4 text-sm`,
  active: `border-r-2 bg-custom border-red-600`,
  link: `flex items-center justify-start my-1 p-3 w-full hover:bg-custom`,
  close: `lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all`,
  open: `lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto`,
};

export default function SidenavItems() {
  const { asPath } = useRouter();
  const { open } = useToggle();
  return (
    <ul className="md:pl-3">
      <li>
        {data.map((item) => (
          <Link href={item.link} key={item.title}>
            <a
              className={`p-3 ${style.link} ${
                item.link === asPath ? style.active : ''
              }`}
            >
              <div className="p-3">
                <span>{item.icon}</span>
              </div>
              <span
                className={`${style.title} ${open ? style.open : style.close}`}
              >
                {item.title}
              </span>
            </a>
          </Link>
        ))}
      </li>
    </ul>
  );
}
