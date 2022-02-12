import React from 'react';
import { useNavigate } from 'react-router-dom';

import CodyPage from '../../components/dressroom/CodyPage';

// import { css } from "@emotion/react";

export default function CodyContainer() {
  const navigate = useNavigate();

  return (
    <div>
      <CodyPage 
        navigate={navigate}
      />
    </div>
  );
}
