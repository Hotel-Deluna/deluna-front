/* global kakao */
import React, { useState, useEffect } from "react";
import "../css/sideFilter.scss";
import {Map, MapMarker} from "react-kakao-maps-sdk";
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
                }}
                level={3}
                onCreate={setMap}
                >
                {markers.map((marker) => (
                    <MapMarker
                    key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
                    position={marker.position}
                    onClick={() => setInfo(marker)}
                    >
                    {info &&info.content === marker.content && (
                        <div style={{color:"#000"}}>{marker.content}</div>
                    )}
                    </MapMarker>
                ))}
                </Map>
            </div>
    )
}

export default SideFilter;