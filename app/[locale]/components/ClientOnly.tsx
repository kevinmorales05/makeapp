'use client';

import React, { useState, useEffect } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
  exotic?: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({
  children, exotic
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, [])

  if (!hasMounted) return exotic;

  return (
    <>
      {children}
    </>
  );
};

export default ClientOnly;
