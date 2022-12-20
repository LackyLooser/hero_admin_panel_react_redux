export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const creactHeroesFetched = (hero) => {
    return {
        type: 'CREAT_HEROES_FETCHED',
        payload: hero
    }
}

export const filtersFetched = (filters) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: filters
    }
}

export const filtersActive = (active) => {
    return {
        type: 'FILTERS_ACTIVE',
        payload: active
    }
}

