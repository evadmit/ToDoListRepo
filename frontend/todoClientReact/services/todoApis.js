export {GET_TODOS_URL} from './config';


const getTodos = async page => {
    const response = await fetch(GET_TODOS_URL);
    const data = await response.json();
    if (response.status >= 400) {
        throw new Error(data.errors);
    }
    return data;
};

// const fetchImageStats = async id => {
//     const response = await fetch(`${URL}/${id}/statistics${KEY}`);
//     const data = await response.json();
//     if (response.status >= 400) {
//         throw new Error(data.errors);
//     }
//     return data;
// };

export { getTodos};