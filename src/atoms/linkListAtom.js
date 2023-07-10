import {atom} from "recoil";

const linkListState = new atom({
    key: 'linkListState',
    default: [],
});

export default linkListState;