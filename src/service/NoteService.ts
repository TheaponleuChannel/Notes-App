import axios from 'axios';

const API_URL = 'http://localhost:5275/api/Notes';

// Define the Note interface
interface Note {
    id?: number; // Optional for new notes
    title: string;
    content: string;
    updatedDate?: Date;
    createdDate?: string;
}

export default {
    async getNotes(): Promise<Note[]> {
        const response = await axios.get<Note[]>(API_URL);
        return response.data;
    },
    async getNote(id: number): Promise<Note> {
        const response = await axios.get<Note>(`${API_URL}/${id}`);
        return response.data;
    },
    async createNote(note: Omit<Note, 'id'>): Promise<Note> {
        const response = await axios.post<Note>(API_URL, note);
        return response.data;
    },
    async updateNote(id: number, note: Note): Promise<Note> {
        const response = await axios.put<Note>(`${API_URL}/${id}`, note);
        return response.data;
    },
    async deleteNote(id: number): Promise<void> {
        await axios.delete(`${API_URL}/${id}`);
    }
};
