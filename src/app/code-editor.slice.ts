import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface EditorState {
  text: string,
  is_edited: boolean
}

const initialState = {
  editor_data: [{
    text: "(a => console.log(a))(\"Hallo :)\");",
    is_edited: false
  }, {
    text: "(a => console.log(a))(\"Ciao :)\");",
    is_edited: false
  }, {
    text: "(a => console.log(a))(\"Aloha :)\");",
    is_edited: false
  }, {
    text: "(a => console.log(a))(\"Comment çava? :)\");",
    is_edited: false
  }]
};

interface SetContentInput {
  text: string,
  id  : number
};

interface SetEditedInput {
  edited: boolean,
  id    : number
};

const codeEditorSlice = createSlice({
  name: 'code-editor',
  initialState,
  reducers: {
    setContent: (state, action: { type: string, payload: SetContentInput }) => {
      state.editor_data[action.payload.id].text = action.payload.text;
      state.editor_data[action.payload.id].is_edited = false;
    },
    setEdited: (state, action: { type: string, payload: SetEditedInput }) => {
      state.editor_data[action.payload.id].is_edited = action.payload.edited;
    }
  }
})

export const selectData = (id: number) => (state: RootState) => state.codeEditor.editor_data[id] as EditorState;

export const { setContent, setEdited } = codeEditorSlice.actions;
export const editorContentReducer = codeEditorSlice.reducer;
