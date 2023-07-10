import {atom} from "recoil";

const userState = new atom({
    key: 'userState',
    default: null,
});

export default userState;