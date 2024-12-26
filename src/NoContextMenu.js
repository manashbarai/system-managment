

import { useEffect } from 'react';

const NoContextMenu = () => {
  const handleContextMenu = (event) => {
    event.preventDefault();
    alert('Not allowed');
    window.location.reload();
  };

  const handleKeyDown = (event) => {
    // Check if the user is pressing a keyboard shortcut to open developer tools
    if ((event.ctrlKey || event.metaKey) && event.key === 'i') {
      event.preventDefault();
      alert('Not allowed');
      window.location.reload();
    }
  };

  useEffect(() => {
    // Attach event listeners
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('keydown', handleKeyDown);

    // Cleanup the event listeners when the component is unmounted
    return () => {
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null; // This component doesn't render anything in the DOM
};

export default NoContextMenu;
