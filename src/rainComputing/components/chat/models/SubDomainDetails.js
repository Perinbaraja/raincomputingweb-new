import React from 'react';
import PropTypes from 'prop-types';
import { useUser } from 'rainComputing/contextProviders/UserProvider';

const SubDomainDetails = () => {
  const { currentUser } = useUser();


  const handleDomainClick = (domainName) => {
    const url = `https://${domainName}`;
    window.open(url, '_blank');
  };

  return (
    <div className="border border">
      {currentUser?.domains ? (
        currentUser.domains.map((user, i) => (
          <div className="border-bottom border-black px-3 py-3 domain-item" 
          key={i} 
             onClick={() => handleDomainClick(user?.name)}
             style={{ cursor: 'pointer' }}
             >
            {user?.name}
          </div>
        ))
      ) : (
        <p>No domains available</p>
      )}

      
    </div>
  );
};

export default SubDomainDetails;
