import React from 'react'


export default function CFBanner({ offerData, items, label}) {
  const selectImage = (name) => {
    for (let index = 0; index < offerData.activeAudience.fireflyResponse.length; index++) {
      const image = offerData.activeAudience.fireflyResponse[index];
      if(image.name === name) {
        return image.image
      }
    }
  }

  return (
    <div className="wrapper">
    <div className='email-1920x450-content'>
      <div className='email-pic'>
      <img 
          loading="lazy" alt="" type="image/jpeg" 
          src={offerData.activeAudience.selectedImage}  
          height="450"></img>
      </div>
      <div className='email-text'>
        <h1>Sail into your financial future</h1>
        <h3>{offerData.activeAudience.firefallResponse ? offerData.activeAudience.firefallResponse.title : ""}</h3>
        <p className='button-container'><a href='#' className='button primary'>See more</a></p>
      </div>
    </div>
    <h3 className='cfheading'>{label}</h3>
    </div>
  );

}