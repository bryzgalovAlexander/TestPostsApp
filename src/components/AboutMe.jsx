import React from 'react';
import {ListGroupItem} from "react-bootstrap";

export const AboutMe = () => {
  return (
    <>
      <h1>
        Hello, I am Alexander
      </h1>
      Contacts:
      <ListGroupItem><a href={'https://t.me/yahochupitsy'}>Telegram</a></ListGroupItem>
      <ListGroupItem>Mail: bryzgalovnba@gmail.com</ListGroupItem>
      <ListGroupItem>Phone: +7 999 648 5100</ListGroupItem>
    </>
  );
};

