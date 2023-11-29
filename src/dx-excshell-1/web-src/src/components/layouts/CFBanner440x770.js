import React from 'react'
import SecurBankLogo from '../../resources/sb-logo.svg';
import SecurBankSquares from '../../resources/sb-squares.svg';

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
    <div className='banner-440x770-content'>
      <div className='banner-pic'>
        <div className='pic'>
            <img 
              loading="lazy" alt="" type="image/jpeg" 
              src={offerData.activeAudience.selectedImage} 
              width="1600" height="634">
            </img>
        </div>
        <div className='logo'>
            <img src={SecurBankLogo} alt="Logo" />
        </div>
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