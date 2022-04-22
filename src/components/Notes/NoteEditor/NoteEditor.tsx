import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../../hooks/redux-hooks';

import { selectNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';
import { selectNotes } from '../../../store/notes-slice/notes-slice';
import { editNote } from '../../../store/notes-slice/notes-slice';
import { fillNoteEditor } from '../../../store/noteEditor-slice/noteEditor-slice';

import NoteEditorHeader from './NoteEditorHeader/NoteEditorHeader';
import AutoGrowingTextArea from '../../UI/AutoGrowingTextArea/AutoGrowingTextArea';

const NoteEditor: React.FC = (props) => {
  const dispatch = useAppDispatch();
  const { activeNoteIndex, defaultActive } = useAppSelector(selectNoteEditor);
  const notes = useAppSelector(selectNotes);
  const params = useParams();

  let activeId = params.noteId;
  // console.log('editor param id', params.noteId);

  const activeNote = notes.find((note) => note.id === activeId);
  // console.log('editor activeNote', activeNote);

  let titleText = activeNote!.title;
  let bodyText = activeNote!.text;

  // if (defaultActive) {
  //   titleText = notes[0].title;
  //   bodyText = notes[0].text;
  // }

  const titleChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const titleValue = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(
      fillNoteEditor({
        id: activeId!,
      })
    );
    dispatch(
      editNote({
        title: titleValue,
        text: bodyText,
        id: activeId!,
        updatedTimestamp,
      })
    );
  };

  const textChangeHandler = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const enteredText = e.currentTarget.value;
    const updatedTimestamp = new Date().toISOString();

    // update store states
    dispatch(
      fillNoteEditor({
        id: activeId!,
      })
    );
    dispatch(
      editNote({
        title: titleText,
        text: enteredText,
        id: activeId!,
        updatedTimestamp,
      })
    );
  };

  return (
    <div className='grow'>
      <NoteEditorHeader />

      <div className='px-10 py-5'>
        <div className='mb-4'>
          <AutoGrowingTextArea
            value={titleText}
            placeholder='Title'
            onChange={titleChangeHandler}
            className={{
              inputClasses:
                'text-neutral-700 text-3xl font-semibold placeholder:font-semibold placeholder:text-3xl',
              fallbackClasses: 'text-3xl',
            }}
          />
        </div>

        <AutoGrowingTextArea
          value={bodyText}
          placeholder='Start writing'
          onChange={textChangeHandler}
          className={{
            inputClasses: 'text-neutral-800 ',
            fallbackClasses: '',
          }}
        />
      </div>
    </div>
  );
};

export default NoteEditor;
