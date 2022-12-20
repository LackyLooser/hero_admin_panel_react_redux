import { v4 as uuidv4 } from 'uuid';
import { useEffect,useState } from 'react';
import {useHttp} from '../../hooks/http.hook';

import { useDispatch, useSelector } from 'react-redux';
import { heroesFetchingError, creactHeroesFetched, filtersFetched } from '../../actions';


const HeroesAddForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [element, setElement] = useState('')
    const {request} = useHttp();
    const dispatch = useDispatch();
    const {filters} = useSelector(state => state.filters);
    useEffect(()=>{
        request("http://localhost:3001/filters")
            .then(data => dispatch(filtersFetched(data)))
    },[])
    const clearForm = () =>{
        setName('')
        setDescription('')
        setElement('')
    }
    const addHeroes = (e) =>{
        e.preventDefault()
            let body = {
                "id": uuidv4(),
                "name": name,
                "description": description,
                "element": element
            }

        request("http://localhost:3001/heroes","POST",  JSON.stringify(body))
            .then(data => {
                dispatch(creactHeroesFetched(data))
                clearForm()
            })
            .catch(() => dispatch(heroesFetchingError()))
    }
    return (
        <form onSubmit={e=>addHeroes(e)} className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={e=>setName(e.target.value)}
                    value={name}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={e=>setDescription(e.target.value)}
                    value={description}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={element}
                    onChange={(e)=>setElement(e.target.value)}>
                    <option >Я владею элементом...</option>
                    {filters.map(filter=>{
                        if(filter.value === 'all') return
                        return <option key={filter.value} value={filter.value}>{filter.label}</option>
                    })}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;