import { useState } from "react";
import './console.style';

interface CustomConsoleProperties {

};

export default function CustomConsole(props: CustomConsoleProperties) {
  const [log, setLog] = useState('Output:\n');

  var originalConsole = window.console;
  console = {
    ...originalConsole,
    log: function(message) {
        originalConsole.log(message);

        setLog(log + message + '\n');
    }
  }

  return (
    <pre className="editor-console" >{log}</pre>
  );
}
