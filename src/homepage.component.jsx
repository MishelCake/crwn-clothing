import React from 'react';
import '../src/homepage.styles.scss';

const Homepage = () => (
    <div className='homepage'>
        <div className='directory-menu'>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='tittle'>HATS</h1>
                    <span className='subtittle'>ShOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='tittle'>JACKETS</h1>
                    <span className='subtittle'>ShOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='tittle'>SNEAKERS</h1>
                    <span className='subtittle'>ShOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='tittle'>WOMEN</h1>
                    <span className='subtittle'>ShOP NOW</span>
                </div>
            </div>
            <div className='menu-item'>
                <div className='content'>
                    <h1 className='tittle'>MEN</h1>
                    <span className='subtittle'>ShOP NOW</span>
                </div>
            </div>
        </div>

    </div>
);

export default Homepage;