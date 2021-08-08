import api from "../../src/endpoints/contacts";

export const getContacts = async () => {
    return (await api.get('/contacts')).data;
}