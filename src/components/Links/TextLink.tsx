import type { IconType } from 'react-icons';
import { Link } from 'react-router-dom';

import { ExternalLink } from '~components/Links';

interface TEXT_LINK_INTERFACE {
  text: string;
  underline?: boolean;
  className?: string;
  icon?: {
    Icon: IconType;
    iconStyle?: string;
  };
  route: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  isExteranl?: boolean; // to define if the link will navigate to internal destination inside our app or exteranl destination
}

export const TextLink = (props: TEXT_LINK_INTERFACE): React.ReactElement => {
  const { text, route, underline = true, className, icon, isExteranl } = props;

  const linkClasses = ` 
      flex items-center gap-1
      ${className ? className : ''} 
      ${underline ? ' underline ' : ''} `;

  return (
    <>
      {!isExteranl && (
        <Link to={route} className={linkClasses} onClick={props.onClick}>
          {text}
          {icon ? (
            <icon.Icon className={icon.iconStyle ? icon.iconStyle : ''} />
          ) : (
            ''
          )}
        </Link>
      )}
      {isExteranl && (
        <ExternalLink
          text={text}
          icon={icon}
          href={route}
          className={linkClasses}
        />
      )}
    </>
  );
};

export default TextLink;
