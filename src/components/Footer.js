// Footer.js
import React from 'react';

const Footer = ({ likeCount, unlikeCount, all }) => {  
  // const { likeCount, unlikeCount, all } = this.props;
  return(
    <footer className="footer">
      <p>Likes: <span className="likes">{ likeCount }</span></p>
      <p>Unlikes: <span className="unlikes">{ unlikeCount }</span></p>
      <p>Total: <span className="total">{ all }</span></p>
    </footer>
  )
}

export default Footer;