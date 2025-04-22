import React from 'react';
//import { Carousel } from 'react-bootstrap/Carousel';

/*const reviews = [
    {
      text: "I could probably go into sales for you. Definitely worth the investment. We've used hair salon for the last five years.",
      name: "Jessica Zhang",
      role: "Customer",
    },
    {
      text: "Absolutely wonderful! We can't understand how we've been living without the hair salon. I am completely blown away.",
      name: "Leanna May",
      role: "Customer",
    },
   
];*/
  

function OverlayGeneralReview(){
    return(
        <div className="position-relative" style={{ height: '100vh' }}>

            <div style={{
                backgroundColor: 'rgba(242, 230, 216,1)',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1, 
                }}/>

            {/*<div
                className="position-absolute top-50 start-50 translate-middle"
                style={{
                zIndex: 5,
                display: 'flex',
                justifyContent: 'space-between',
                width: '50%',
                transform: 'translate(-50%, -50%)',
                }}>
                <img src="/icons/quotation-mark.png" alt="Quotation Icon Left" style={{ width: '50px', backgroundColor: 'rgba(199, 178, 153, 0.5)'}} />
                <img src="/icons/quotation-mark.png" alt="Quotation Icon Right" style={{ width: '50px', backgroundColor: 'rgba(199, 178, 153, 0.5)' }} />
            </div>

             <div
                className="position-absolute top-50 start-50 translate-middle text-center text-white"
                style={{ zIndex: 10 }}
            >
                <Carousel>
                    {
                        reviews.map((review, index)=>
                        (
                            <Carousel.Item key={index}>
                                <div className="d-block w-100">
                                    <h1>{review.name}</h1>
                                    <p>{review.text}</p>
                                    <footer>{review.role}</footer>

                                </div>

                            </Carousel.Item>

                        ))
                    }
                </Carousel>
            </div>*/}

        </div>
    );
   
}
export default OverlayGeneralReview;