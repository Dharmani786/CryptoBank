import React from 'react';

const HomeLoanForm = ({ handleDuration, handleImageFile, imageFile, fileInputRef }) => {
  return (
    <div className="homeloan-wrp">
      <label htmlFor="amount">Amount</label>
      <input placeholder='50000ETH' />
      <label htmlFor="Coleteralamount">Collateral Amount</label>
      <input placeholder='50000USDT' />
      <div className="duration-btn">
        <button type="button" className="loan-btn" onClick={() => handleDuration('03 months')}>
          03 months
        </button>
        <button type="button" className="loan-btn" onClick={() => handleDuration('06 months')}>
          06 months
        </button>
        <button type="button" className="loan-btn" onClick={() => handleDuration('12 months')}>
          12 months
        </button>
        <button type="button" className="loan-btn" onClick={() => handleDuration('24 months')}>
          24 months
        </button>
        <button type="button" className="loan-btn" onClick={() => handleDuration('36 months')}>
          36 months
        </button>
      </div>
      <div className='upload-img'>
        <label htmlFor='upload'>Upload Document (Address & Income proof)</label>
        <input
          type='file'
          onChange={(e) => handleImageFile(e.target.files[0])}
          style={{ display: 'none' }}
          id='fileInput'
          ref={fileInputRef}
        />
        <figure className='upload-fig' onClick={() => fileInputRef.current.click()}>
          {imageFile ? (
            <img
              src={URL.createObjectURL(imageFile)}
              alt="preview"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <img
              src='/static/images/plus (1) 1.png'
              alt="preview"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'center',
              }}
            />
          )}
        </figure>
         
      </div>
    </div>
  );
};

export default HomeLoanForm;
