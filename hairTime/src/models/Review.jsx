import React from 'react';
import { Image } from 'react-bootstrap';

export default function Review(text, user, stars){
    this.text = text;
    this.user = user;
    this.stars = stars;

    this.renderStars = function(){
        const starsArray = []
        for(let i=0; i < 5; i++){
            if(i < this.stars){
                starsArray.push(<Image key={i} src="/icons/star-filled.png" alt="star" className="star" />);
            } else {
                starsArray.push(<Image key={i} src="/icons/star-empty.png" alt="star" className="star" />);
            }
        }
        return starsArray;
    }
}