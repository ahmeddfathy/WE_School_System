import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import loadingSvg from './loading.svg';
const LoadingPage = () => {

  const [loading, setLoading] = useState(true);



  return (
    <div className="text-center" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
  <div>
    {loading ? (
      <div>
        <img src={loadingSvg} alt="Loading" />
      </div>
    ) : ""}
  </div>
</div>

  );
};

export default LoadingPage;