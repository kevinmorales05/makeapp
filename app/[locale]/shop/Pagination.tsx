'use client'
import React from 'react'
// import { styled } from '@mui/material/styles';
// import PaginationUI from '@mui/material/Pagination';
import { Products } from '../types/products';


export default function Pagination() {
  const defaultVars = {
    '--color': '#1976d2',
    '--box-shadow': 'rgb(25, 118, 210, .16)',
  } as React.CSSProperties;
  // const PaginationMUI = styled(PaginationUI)({
  //   color: '#c1272d',
  // });

  return (
    <div>
      {/* <PaginationMUI style={defaultVars} count={10} shape="rounded" size="large" /> */}
    </div>
  )
}
