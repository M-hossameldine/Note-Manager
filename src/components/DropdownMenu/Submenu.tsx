import type {
  ACTION_ITEM_INTERFACE,
  FUNCTION_ITEM_INTERFACE,
} from 'interfaces';

import SubmenuActionItem from './SubmenuActionItem';
import SubmenuFunctionItem from './SubmenuFunctionItem';

interface PropsType {
  submenuItemsData: (FUNCTION_ITEM_INTERFACE | ACTION_ITEM_INTERFACE)[];
  className?: string;
  onClick?: () => void;
}
const Submenu = (props: PropsType): React.ReactElement => {
  return (
    <ul className={props.className ? props.className : ''}>
      {props.submenuItemsData.map(itemData => {
        let item;
        if ('asyncAction' in itemData) {
          const { id, content, asyncAction, asyncActionArgs, operation } =
            itemData;
          item = (
            <SubmenuActionItem
              key={id}
              id={id}
              content={content}
              asyncAction={asyncAction}
              asyncActionArgs={asyncActionArgs}
              operation={operation}
            />
          );
        } else {
          const { id, content, onClick } = itemData;
          item = (
            <SubmenuFunctionItem
              key={id}
              id={id}
              content={content}
              onClick={onClick}
            />
          );
        }

        return item;
      })}
    </ul>
  );
};

export default Submenu;
