import axiosInstance from "./client"
export interface CreatePersonDto {
    code: string;
    fullName: string;
    birth?: string;
    passportNumber?: string;
    socialSecurity?: string;
    phoneNumber?: string;
    address?: string;
    result?: string;
  }
  
export const login = (userName: string, password: string) => {
    return axiosInstance.post('/users/login', {
        userName,
        password
    });
}

export const createPerson = (data: CreatePersonDto) => {
    return axiosInstance.post('/persons', data);
  };
  
  export const getPersons = (page = 1, limit = 10) => {
    return axiosInstance.get('/persons', {
      params: { page, limit },
    });
  };
  
  export const getPersonById = (id: string) => {
    return axiosInstance.get(`/persons/${id}`);
  };
  
  export const updatePerson = (id: string, data: Partial<CreatePersonDto>) => {
    return axiosInstance.put(`/persons/${id}`, data);
  };
  
  export const updatePersonResult = (result: string) => {
    return axiosInstance.put(`/persons/update-result`, { result });
  };
  
  export const getResultByCode = (code: string) => {
    return axiosInstance.get(`/persons/result/find/${code}`);
  };
  
  export const deletePerson = (id: string) => {
    return axiosInstance.delete(`/persons/${id}`);
  };