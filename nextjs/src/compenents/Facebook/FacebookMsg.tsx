import React, { Component } from "react";
import { FacebookProvider, CustomChat } from "react-facebook";

export default class Example extends Component {
  render() {
    return (
      <FacebookProvider appId="1554314198429977" chatSupport>
        <CustomChat pageId="105236832662653" minimized={false} />
      </FacebookProvider>
    );
  }
}
