import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { useController } from '@remix/core/hooks';

import './index.css';

export default useController(class extends React.Component {
  state = {
    userInformation: null
  }

  render () {
    const markdown = `This block of Markdown contains <a href="https://en.wikipedia.org/wiki/HTML">HTML</a>, and will require the <code>html-parser</code> AST plugin to be loaded, in addition to setting the <code class="prop">escapeHtml</code> property to false.`;

    return (
      <view className="docs">
        <Markdown source={markdown} />
      </view>
    );
  }
})
