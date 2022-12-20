import { useDispatch, useSelector } from 'react-redux';
import { filtersActive } from '../../actions';


const HeroesFilters = () => {
    const {filters, activeFilter} = useSelector(state => state.filters);
    const dispatch = useDispatch();
    const filterHeroes = (value) =>{
        dispatch(filtersActive(value))
    }
    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filters.map(filter=>{
                        const activeClass = activeFilter == filter.value ? ' active': ""

                        return <button className={`btn btn-${filter.clazz}${activeClass}`} 
                                        key={filter.value}
                                        onClick={()=>filterHeroes(filter.value)}>
                                            {filter.label}
                                </button>
                    })}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;