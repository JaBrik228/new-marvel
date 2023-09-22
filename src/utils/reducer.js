const initialValue = {scrollPos: 0, comics: [], offset: 0};

export const reducer = (state = initialValue, action) => {
    switch (action.type) {
        case 'SCROLL':
            return {...state, scrollPos: action.payload};
        case 'COMICS':
            return {...state, comics: [...state.comics, ...action.payload]};
        case 'COMICSOFFSET':
            return {...state, offset: state.offset + action.payload};
        default:
            return state;
    }
};