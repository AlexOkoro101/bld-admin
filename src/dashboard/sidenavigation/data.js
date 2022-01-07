import HomeIcon from './icons/home';
import SearchIcon from './icons/search';
import CreditsIcon from './icons/credits';
import ArchivesIcon from './icons/archives';
import SettingsIcon from './icons/settings';
import DocumentationIcon from './icons/documentation';
import UsersIcon from './icons/users';

const data = [
  {
    title: 'Dashboard',
    icon: <HomeIcon />,
    link: '/',
  },
  {
    title: 'Search',
    icon: <SearchIcon />,
    link: '/admin/search',
  },
  {
    title: 'Auctions',
    icon: <ArchivesIcon />,
    link: '/admin/auctions',
  },
  {
    title: 'Vehicles',
    icon: <UsersIcon />,
    link: '/admin/vehicles',
  },
  {
    title: 'Settings',
    icon: <SettingsIcon />,
    link: '/admin/settings',
  },
  {
    title: 'Contracts',
    icon: <DocumentationIcon />,
    link: '/admin/documentation',
  },
  {
    title: 'Users',
    icon: <CreditsIcon />,
    link: '/admin/users',
  },
];

export default data;
