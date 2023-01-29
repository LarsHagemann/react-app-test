import { useState } from 'react';
import './code-input.style';
import { 
  useAppSelector,
  useAppDispatch
} from './../../../src/app/hooks';
import { selectData, setContent, setEdited } from './../../../src/app/code-editor.slice';

interface CodeInputProperties {
  editor_id: number
};

interface LineNumberInputProperties {
  linenumber: number;
};

function LineNumber(props: LineNumberInputProperties) {
  return (
    <span className='code-editor-linenumber'>
      { props.linenumber }
    </span>
  )
}

function loadLinenumbers(lines: number) {
  const jsxLines = [];
  for (let i = 0; i < lines; ++i) {
    jsxLines.push(<LineNumber key={i} linenumber={i + 1} />)
  }
  return jsxLines;
}

function findLinebreaks(text: string) : number {
  let count = 0;
  while (true) {
    const ln = text.indexOf('\n');
    if (ln < 0) {
      return count + 1;
    }
    ++count;
    text = text.substring(ln + 1);
  }
}

export default function CodeInput(props: CodeInputProperties) {

  const [numLines, setNumLines] = useState(1);

  const data = useAppSelector(selectData(props.editor_id));
  const dispatch = useAppDispatch();

  function codeEditorInputHandler(event: React.FormEvent<HTMLTextAreaElement>) {
    
    const target = event.target as HTMLInputElement;
    const linenumbers = target.previousElementSibling as HTMLElement;
    const text = target.value;

    const fontSize = window.getComputedStyle(document.documentElement)
      .getPropertyValue('--editor-font-size');

    const lineHeight = window.getComputedStyle(document.documentElement)
      .getPropertyValue('--line-height');

    const nStyle = `calc(${target.clientHeight}px - ${lineHeight} * ${fontSize})`;

    target.style.paddingBottom = nStyle;
    linenumbers.style.paddingBottom = nStyle;
    
    const nbLines = findLinebreaks(text);
    if (nbLines != numLines) {
      setNumLines(nbLines);
    }

    dispatch(setEdited({ id: props.editor_id, edited: text !== data.text }));
  }
  
  function codeEditorScrollhandler(event: React.UIEvent<HTMLTextAreaElement, UIEvent>) {
    const target = event.target as HTMLElement;
    const linenumbers = target.previousElementSibling;
  
    linenumbers.scrollTop = target.scrollTop;
  }

  function handleSaveInput(
    event: React.KeyboardEvent<HTMLTextAreaElement>
   ) {
    
    if (
      'ctrlKey'   in event && event.ctrlKey === true &&
      'key'       in event && event.key     === 's') {
      
      dispatch(setContent({
        id: props.editor_id,
        text: (event.target as HTMLTextAreaElement).value
      }));
    }
  }

  return (
    <div className='code-editor-container'>
      <div className='code-editor-linenumbers'>
        { loadLinenumbers(numLines) }
      </div>
      <textarea  className='code-editor'  
            spellCheck={false}
            autoCapitalize='false'
            autoCorrect='false'
            defaultValue={data.text}
            onScroll={event => codeEditorScrollhandler(event) }
            onInput={event => codeEditorInputHandler(event)}
            onKeyDown={event => handleSaveInput(event)}>
      </textarea>
      <div className='code-editor-overlay'></div>
    </div>
  )
}

