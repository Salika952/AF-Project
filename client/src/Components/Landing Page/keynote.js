import React from 'react';
import './Cards.css';
import CardItem from './CardItem';
import image1 from "url:../../images/face1.jpeg";
import image2 from "url:../../images/face2.jpg";
import image3 from "url:../../images/face3.jpg";
import image4 from "url:../../images/face4.jpg";
import image5 from "url:../../images/face6.jpg";
import Header from "../navbar/guestHeader";

function Cards() {
    return (
        <div>
            <Header/>
        <div className='cards'>
            <h1>Check out these HUGO Destinations!</h1>
            <div className='cards__container'>
                <div className='cards__wrapper'>
                    <ul className='cards__items'>
                        <CardItem
                            src={image1}
                            text='John Martin, Department of Psychological Medicine, University of Auckland'
                            label='Guest Speaker'
                            path='#'
                        />
                        <CardItem
                            src={image2}
                            text='Prof William WongMiddlesex, University London'
                            label='Data Analist'
                            path='#'
                        />
                    </ul>
                    <ul className='cards__items'>
                        <CardItem
                            src={image3}
                            text='Prof. Giuseppe De Giacomo, University of Rome La Sapienza, Italy'
                            label='Software Engineer'
                            path='#'
                        />
                        <CardItem
                            src={image4}
                            text='Prof. Daniele Nardi, Experience Football on Top of the Himilayan Mountains'
                            label='Speaker'
                            path='#'
                        />
                        <CardItem
                            src={image5}
                            text='Prof. Maja Pantic, mperial College London, Computing Dept., England'
                            label='Speaker'
                            path='#'
                        />
                    </ul>
                </div>
            </div>
        </div>
        </div>
    );
}

export default Cards;
