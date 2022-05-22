import React from "react";
import { useSelector } from 'react-redux';

export default function Announce() {
    const announce = useSelector((state) => state.announce.data)
    return (
        <>
            <div className="container" >

                <div id="carouselExampleSlidesOnly" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        {
                            Object.keys(announce).map((key, index) => (
                                index === 0
                                    ? <div key={key} className="carousel-item active">
                                        <img src={announce[key].imageUrl} style={{ height: '300px' }} className="d-block " alt="..." />
                                    </div>
                                    : <div key={key} className="carousel-item ">
                                        <img src={announce[key].imageUrl} style={{ height: '300px' }} className="d-block " alt="..." />
                                    </div>

                            ))
                        }
                    </div>
                </div>

            </div>
        </>

    )


}