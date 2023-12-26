import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getShowById } from "../api/tvmaze";

const Show = () => {
    const { showId } = useParams();
    /*const [showData, setShowData] = useState(null);
    const [showError, setShowError] = useState(null);
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getShowById(showId);  
                setShowData(data);              
            } catch (error) {
                setShowError(error);
            }
        }

        fetchData();

    }, [showId]);*/
  // Queries
  const {data: showData, error: showError} = useQuery(['show', showId], () => getShowById(showId))

    if(showError) {
        return <div>We have an error: {showError.message}</div>
    }
    if(showData) {
        return <div>Got show data: {showData.name}</div>
    }
    
    return <div>Data is Loading {showId}</div>
}

export default Show