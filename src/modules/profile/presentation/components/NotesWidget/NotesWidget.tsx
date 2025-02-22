import { EDITORPAGE, NOTESPAGE } from 'constants/routes';
import type {
  ACTION_ITEM_INTERFACE,
  FUNCTION_ITEM_INTERFACE,
} from 'interfaces';
import AddNoteWrapper from 'modules/notes/presentation/components/AddNoteWrapper/AddNoteWrapper';
import { NoteItem } from 'modules/notes/presentation/components/NoteItem/NoteItem';
import { selectNotes, sendNewNoteData } from 'store';
import { v4 as uuid } from 'uuid';

import { Link, useNavigate } from 'react-router-dom';

import { useAppSelector } from 'hooks/redux-hooks';

import { IoIosArrowForward, IoIosMore, MdPostAdd } from 'assets';

import Card from 'components/Cards/Card';
import DropdownMenu from 'components/DropdownMenu';

type Props = { className?: string };

export const NotesWidget = (props: Props): React.ReactElement => {
  const notes = useAppSelector(selectNotes);
  const navigate = useNavigate();

  const firstNote = notes.length > 0 ? notes[0].id : 'empty';

  const dropdownData: (FUNCTION_ITEM_INTERFACE | ACTION_ITEM_INTERFACE)[] = [
    {
      id: uuid(),
      content: 'Go to notes',
      onClick: () => navigate(`${NOTESPAGE}/${firstNote}`),
    },
    {
      id: uuid(),
      content: 'Create new note',
      asyncAction: sendNewNoteData,
      operation: 'add',
    },
  ];

  const notesWidgetClasses = props.className ? props.className : '';

  return (
    <Card className={` ${notesWidgetClasses} overflow-hidden`}>
      <header className="flex items-center p-2">
        <Link
          to={`${NOTESPAGE}/${firstNote}`}
          className="flex items-center rounded p-1 uppercase text-neutral-800 hover:bg-neutral-100"
        >
          Notes
          <IoIosArrowForward
            size="14"
            className="mx-2 my-auto shrink-0 text-green-500"
          />
        </Link>

        <AddNoteWrapper className="ml-auto rounded p-1 hover:bg-neutral-100">
          <MdPostAdd size="20" className="shrink-0 text-neutral-600" />
        </AddNoteWrapper>

        <DropdownMenu
          menuHeader={{
            content: <IoIosMore />,
            className: 'text-neutral-500 hover:bg-neutral-100 rounded p-1',
          }}
          className="ml-2"
          submenuItemsData={dropdownData}
          placeSubmenu={{ x: 'end', y: 'bottom' }}
        />
      </header>

      {/* notes list */}
      <div className="scrollbar-box overflow-hidden overflow-x-scroll p-3">
        <ul className="flex gap-3">
          {notes.map((note, index) => (
            <li
              key={note.id}
              className="min-w-[11rem] rounded-md shadow-even-1"
            >
              <NoteItem
                note={note}
                index={index}
                className="p2"
                route={EDITORPAGE}
              />
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default NotesWidget;
