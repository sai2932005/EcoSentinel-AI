const reverseGeocode =async(lat,lng)=>{

    try{
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`,{
            headers: {
                'User-Agent': 'EcoSentinelAI/1.0'
    }})
        const data = await response.json();

        const address =  data.display_name || "Unknown Location";
        return address ;




    }catch(error){
        console.error("Reverse GeoCoding Failed",error);
        return "Location Unavailable" ;
    }
}


module.exports = reverseGeocode ;