import {atom} from "recoil";

const modalState = new atom({
    key: 'modalState',
    default: false,
});

export default modalState;