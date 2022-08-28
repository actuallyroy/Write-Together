import {useParams} from 'react-router-dom'

function Users() {
    let params = useParams();
    return(

        <><h2>{params.username}</h2></>
    )
}


export default Users