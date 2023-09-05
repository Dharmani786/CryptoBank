import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { CMS } from '../../redux/features/cmsSlice';

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const [terms, setTerms] = useState('')


    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
  
      useEffect(() => {
        dispatch(CMS())
        .then(result => {
          if (result?.payload?.statusCode === 200) {
            console.log(result,'cms');
            setTerms(result?.payload?.data)
          }
        })
       .catch(error => {
          console.log(error);
        });
      }, [dispatch])
    
      console.log(terms,'sdfksdf');
  return (
    <div className='wrapcls'>   
    <div className='container'>
      <div className='cms'>
      <h3>Privacy Policy </h3>
      {terms?.length? terms?.map((item) => {
        return(
          <p
          dangerouslySetInnerHTML={{
            __html: item
              ? item?.privacyPolicy
              : "Privacy policy not found",
          }}
        ></p>
        )
      }): <div className='faq-main'>
      <p>No Data Found</p>
      </div>}
       <div className='space'></div>
      </div>
    </div>
  </div>
  )
}

export default PrivacyPolicy;
