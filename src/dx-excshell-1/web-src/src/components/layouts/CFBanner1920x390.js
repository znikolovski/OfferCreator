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
    <div>
    <div className='banner-1920x390-content'>
      <div className='banner-pic'>
      <img 
          loading="lazy" alt="" type="image/jpeg" 
          src={offerData.activeAudience.selectedImage}  
          width="1920" height="390"></img>
      </div>
      <div className='banner-text'>
        <h3>Sail into your financial future</h3>
        <h1>{offerData.activeAudience.firefallReponse ? offerData.activeAudience.firefallReponse.title : ""}</h1>
        <p>{offerData.activeAudience.firefallReponse ? offerData.activeAudience.firefallReponse.description : ""}</p>
        <p className='button-container'><a href='#' className='button primary'>See more</a></p>
      </div>
    </div>
    <h3 className='cfheading'>{label}</h3>
    </div>
  );

}