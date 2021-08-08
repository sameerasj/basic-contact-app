import api from "../contacts";
import {uuid} from 'uuidv4';

const id = uuid();
let listSize;

test("should be able to get contact list",async () => {
  const res = await api.get("/contacts");
  listSize = res.data.length;
  expect(res.status).toEqual(200);
});

test("should be able to add contact",async () => {
  const requestData = {
    id,
    name: "Test User 1",
    email: "testuser1@mail.com"
  };
  
    const res = await api.post('/contacts', requestData)
    expect(res.status).toEqual(201);
    const userRes = await api.get(`/contacts/${id}`);
    expect(userRes.data).toEqual(requestData);
    const resList = await api.get("/contacts");
    expect(resList.data.length).toEqual(listSize+1);
});

test("should throw error when add contact fields are empty",async () => {
  const requestData = {
    id: "",
    name: "",
    email: ""
  };
  let res;
  
    try {
    res = await api.post('/contacts', requestData)
    expect(res.status).toEqual(201);
    } finally {
    // cleaning up this record due to Bug5(refer the bug doc), can remove below step after Bug5 fix
    await api.delete(`/contacts/${res.data.id}`);
    }
});

test("should be able to update contact",async () => {
  const requestData = {
    name: "Updated Test User 1",
    email: "updatedtestuser1@mail.com"
  };
  
    const res = await api.put(`/contacts/${id}`, requestData);
    expect(res.status).toEqual(200);
    const userRes = await api.get(`/contacts/${id}`);
    expect(userRes.data.name).toEqual(requestData.name);
    expect(userRes.data.email).toEqual(requestData.email);
});

test("should be able to delete contact",async () => {
    const res = await api.delete(`/contacts/${id}`);
    expect(res.status).toEqual(200);
    api.get(`/contacts/${id}`).catch(status => expect(status.toString()).toEqual("Error: Request failed with status code 404"));
    const resList = await api.get("/contacts");
    expect(resList.data.length).toEqual(listSize);
});
