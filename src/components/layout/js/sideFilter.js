/* global kakao */
import React, { useState, useEffect } from "react";
import "../css/sideFilter.scss";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {Button} from 'react-bootstrap';
function SideFilter() {
    const [info, setInfo] = useState();
    const [markers, setMarkers] = useState([]);
    const [map, setMap] = useState();
    useEffect(() => {
        if (!map) return
        const ps = new kakao.maps.services.Places()
    
        
      }, [map])
    return (
            <div className="sideBar">
                <Map // 로드뷰를 표시할 Container
                center={{
                    lat: 37.566826,
                    lng: 126.9786567,
                }}
                style={{
                    width: "100%",
                    height: "100px",
                    pointerEvents:"none"

                }}
                level={3}
                onCreate={setMap}
                >
                <Button variant="primary">Primary</Button>
                </Map>
            </div>
    )
}

export default SideFilter;