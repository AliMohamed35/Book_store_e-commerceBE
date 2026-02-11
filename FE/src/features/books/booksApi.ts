import api from "../../services/api";

export const bookApi ={
    // GET /book/:id
    getBookById: async(id: number) =>{
        const response = await api.get(`book/${id}`);
        return response.data;
    },

    // GET /book/
    getAllBooks: async()=>{
        const response = await api.get("book/");
        return response.data;
    }

    // POST /book/:id
}