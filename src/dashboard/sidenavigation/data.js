import HomeIcon from './icons/home';
import StatusIcon from './icons/status';
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
    title: 'Estimator',
    icon: <StatusIcon />,
    link: '/admin/status',
  },
  {
    title: 'Auctions',
    icon: <ArchivesIcon />,
    link: '/admin/auctions',
  },
  {
    title: 'Members',
    icon: <CreditsIcon />,
    link: '/admin/credits',
  },
  {
    title: 'Media',
    icon: <SettingsIcon />,
    link: '/admin/settings',
  },
  {
    title: 'Contracts',
    icon: <DocumentationIcon />,
    link: '/admin/documentation',
  },
  {
    title: 'Admin Users',
    icon: <UsersIcon />,
    link: '/admin/users',
  },
];

export default data;
