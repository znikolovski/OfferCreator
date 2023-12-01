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
    <div className='signage-1080x1920-content'>
      <div className='signage-pic'>
      <img 
          loading="lazy" alt="" type="image/jpeg" 
          src={offerData.activeAudience.selectedImage}  
          width="1600" height="634"></img>
      </div>
      <div className='signage-text'>
        <h3>Sail into your financial future</h3>
        <h1>{offerData.activeAudience.firefallResponse ? offerData.activeAudience.firefallResponse.title : ""}</h1>
        <p>{offerData.activeAudience.firefallResponse ? offerData.activeAudience.firefallResponse.description : ""}</p>
      </div>
    </div>
    <h3 className='cfheading'>{label}</h3>
    </div>
  );

}