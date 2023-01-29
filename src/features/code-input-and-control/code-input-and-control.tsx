import CodeInputController from "../code-input-controller/code-input-controller";
import CodeInput from "../code-input/code-input.module";

interface CodeInputAndControllerProperties {
  editor_id: number
}

export default function CodeInputAndController(props: CodeInputAndControllerProperties) {

  return (
    <div className="code-editor-and-controls">
      <div className="code-editor-controls">
        <CodeInputController editor_id={props.editor_id} />
      </div>
      <div className="code-editor-wrapper">
        <CodeInput editor_id={props.editor_id} />
      </div>
    </div>
  )
}