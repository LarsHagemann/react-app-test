import { shallowEqual } from "react-redux";
import { selectData }  from "./../../../src/app/code-editor.slice";
import { useAppSelector } from "./../../../src/app/hooks";
import { RootState } from "./../../../src/app/store";

interface CodeInputControllerProperties {
  editor_id: number
};

export default function CodeInputController(props: CodeInputControllerProperties) {

  const data = useAppSelector(selectData(props.editor_id));

  return (
    <div>
      <button onClick={ () => { eval(data.text); } }>▶</button>
      { data.is_edited ? <h3>*Document</h3> : <h3>Document</h3> }
    </div>
  )
}