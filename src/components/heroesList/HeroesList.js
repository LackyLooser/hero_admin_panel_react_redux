import {useHttp} from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { heroesFetching, heroesFetched, heroesFetchingError, deleteHeroesFetched } from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';



const HeroesList = () => {
    const dispatch = useDispatch();
    const {request} = useHttp();
    const {activeFilter} = useSelector(state => state.filters);
    
    const {heroes, heroesLoadingStatus} = useSelector(state => {
        if(activeFilter === 'all'){
            return  state.heroes
        } else {
            return ({
                ...state.heroes,
                heroes: state.heroes.heroes.filter(hero=> hero.element === activeFilter)
            })
        }
});
    
    console.log('render')
    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        // eslint-disable-next-line
    }, []);

    const deleteHero = (id) =>{
        
        request(`http://localhost:3001/heroes/${id}`,"DELETE")
            .then(data => dispatch(deleteHeroesFetched(id)))
    }
    
    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map((props) => {
            return <HeroesListItem key={props.id} {...props} deleteHero={deleteHero}/>
        })
    }

    const elements = renderHeroesList(heroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;