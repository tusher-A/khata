import React, { useState } from 'react';
import { createEditor, BaseEditor, Descendant } from 'slate';
import styled from '@emotion/styled';
import { ReactEditor, Slate, Editable, withReact } from 'slate-react';

type CustomText = { text: string };

type CustomElement = { type: 'paragraph'; children: CustomText[] };

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const SlateWrapper = styled('div')`
  width: 50vw;
  height: 90vh;
  border-radius: 10px;
  background: #e0e0e0;
  box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  padding: 20px;
`;

const RootWrapper = styled('div')`
  display: flex;
  align-item: center;
  justify-content: center;
`;

const App = () => {
  const [editor] = useState(() => withReact(createEditor()));

  const initialValue: CustomElement[] = [
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ];

  const [value, setValue] = useState<Descendant[]>(initialValue);

  return (
    <RootWrapper>
      <SlateWrapper>
        <Slate
          editor={editor}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        >
          <Editable />
        </Slate>
      </SlateWrapper>
    </RootWrapper>
  );
};

export default App;
