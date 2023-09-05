import React, { useEffect } from 'react'
import { useState } from 'react'
import '../applyLoan/apply.css'
import { faq } from '../../redux/features/faqSlice'
import { useDispatch } from 'react-redux';
import KeyboardArrowRightSharpIcon from "@mui/icons-material/KeyboardArrowRightSharp";
import KeyboardArrowDownSharpIcon from "@mui/icons-material/KeyboardArrowDownSharp";

const ApplyLandingPage = () => {
    const dispatch = useDispatch();
    const [faqData, setFaqData] = useState([]);
    const [selected, setSelected] = useState([]);
    useEffect(() => {
        dispatch(faq())
        .then(result => {
          if (result?.payload?.statusCode === 200) {
            setFaqData(result?.payload?.data)
          }
        })
       .catch(error => {
          console.log(error);
        });
      }, [dispatch])

  

   const handleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected((selected) => selected.filter((s) => s !== id));
    } else {
      setSelected((selected) => [...selected, id]);
    }
  };
 
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const faqResData = [
    {
      id: 1,
      question: "Ques:1",
      answer: "Ans:1",
    },
    {
      id: 2,
      question: "Ques:2",
      answer: "Ans:2",
    },
    {
      id: 3,
      question: "Ques:3",
      answer: "Ans:3",
    },
    {
      id: 4,
      question: "Ques:4",
      answer: "Ans:4",
    },
  ];

    return ( 
        <div className='applyldng-container'>
            <div className="applyldng-wrp">
                {/* <h1>Deposit your amount from METAMASK</h1> */}

                {/* <div className="applyldng-sec">
                    <div className="applyldng-lft">
                        <h3>Add your amount</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend,
                            libero nec congue consectetur, massa mauris dictum purus, quis
                            fermentum tortor metus quis nisl.</p>
                            <div className='applyldng-btn'>
                        <input placeholder='Ex : 5, 500, 5000' className='ldng-amount' />
                        <button>Add amount</button>
                            </div>
                    </div>
                    <div className="applyldng-rt">
                        <figure className='ldng-rtimg'>
                            <img src="/static/images/currency.png" alt="" />
                        </figure>
                    </div>
                </div> */}
                <div className="faq-sec">
                    <h1>FAQ's</h1>
                    <div>
                {faqData?.length ? (
                  faqData?.map((item, i) => {
                    return (
                      <div
                        className="main_div"
                        onClick={() => handleSelected(item?._id)}
                        key={i}
                      >
                        <div className="ques_div">
                          <div className="ques_txt">
                            <h5>{item?.question}</h5>
                          </div>
                          <div className="arrow_div">
                            {selected.includes(item?._id) ? (
                              <KeyboardArrowDownSharpIcon />
                            ) : (
                              <KeyboardArrowRightSharpIcon />
                            )}
                          </div>
                        </div>
                        {selected.includes(item?._id) ? (
                          <div className="faq_ans">
                            {item?.answer !== "" && <h5>{item?.answer}</h5>}
                          </div>
                        ) : null}
                      </div>
                    );
                  })
                ) : (
                  <div className='faq-main'>
                    <p>FAQ listing not found</p>
                    </div>
                )}
              </div>
                </div>
            </div>
            <div className='space'></div>
        </div>
    )
}

export default ApplyLandingPage
