import React from 'react';


const Github = () => {
  return (<a href={'https://github.com/leoparis89/tetris'}
             target="_blank"
             style={{color: 'inherit', textDecoration: 'none'}}
  >
    <i className="fa fa-github"
       style={
         {
           position: 'absolute',
           right: 0,
           bottom: 0,
           fontSize: '60px',
           margin: 20
         }
       }/>
  </a>);
};

export default Github;
