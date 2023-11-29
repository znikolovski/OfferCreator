import React, { useEffect } from 'react'


export default function CFBanner({ offerData, items, label}) {

  return (
    <div>
    <div className='app-150x150-content'>
      <div className='banner-text'>
        <h1>{offerData.activeAudience.firefallReponse ? offerData.activeAudience.firefallReponse.description : ""}</h1>
      </div>
    </div>
    <h3 className='cfheading'>{label}</h3>
    </div>
  );

}